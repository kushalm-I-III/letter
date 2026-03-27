/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import db from "@/lib/db";
import { GameSection } from "@/lib/game";
import { id } from "@instantdb/react";
import { useEffect, useMemo, useState } from "react";

type ProgressRow = {
  id: string;
  section: GameSection;
  completed: boolean;
  completedAt?: number;
  startedAt?: number;
  checkpointCount?: number;
  checkpointsDone?: number;
};

const LOCAL_KEY = "kxd_game_progress_v1";
const LOCAL_IDS_KEY = "kxd_game_progress_ids_v1";

function readLocalCompleted(): Set<GameSection> {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as { completed?: unknown };
    const list = Array.isArray(parsed?.completed) ? parsed.completed : [];
    return new Set(
      list.filter(
        (x): x is GameSection =>
          x === "crossword" ||
          x === "chat-analytics" ||
          x === "report-card" ||
          x === "love-letter",
      ),
    );
  } catch {
    return new Set();
  }
}

function writeLocalCompleted(completed: Set<GameSection>) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ completed: [...completed] }));
  } catch {
    // ignore
  }
}

function readLocalIds(): Partial<Record<GameSection, string>> {
  try {
    const raw = localStorage.getItem(LOCAL_IDS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Record<GameSection, string>>;
  } catch {
    return {};
  }
}

function writeLocalIds(ids: Partial<Record<GameSection, string>>) {
  try {
    localStorage.setItem(LOCAL_IDS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const { isLoading, error, data } = db.useQuery({ progress: {} });

  const [localCompleted, setLocalCompleted] = useState<Set<GameSection>>(new Set());
  const [localIds, setLocalIds] = useState<Partial<Record<GameSection, string>>>({});

  useEffect(() => {
    setLocalCompleted(readLocalCompleted());
    setLocalIds(readLocalIds());
  }, []);

  function getProgressId(section: GameSection, existingId?: string): string {
    if (existingId) return existingId;
    if (localIds[section]) return localIds[section] as string;
    const generated = id();
    const next = { ...localIds, [section]: generated };
    setLocalIds(next);
    writeLocalIds(next);
    return generated;
  }

  const rows = ((data?.progress ?? []) as ProgressRow[]).filter(
    (r) => typeof r?.section === "string",
  );

  const bySection = useMemo(() => {
    const map = new Map<GameSection, ProgressRow>();
    for (const row of rows) {
      map.set(row.section, row);
    }
    return map;
  }, [rows]);

  const completedSections = useMemo(() => {
    const s = new Set<GameSection>();
    for (const row of rows) {
      if (row.completed) s.add(row.section);
    }
    for (const section of localCompleted) s.add(section);
    return s;
  }, [rows, localCompleted]);

  async function ensureStarted(section: GameSection) {
    const existing = bySection.get(section);
    if (existing?.startedAt) return;

    try {
      const progressId = getProgressId(section, existing?.id);
      await db.transact(
        db.tx.progress[progressId].update({
          section,
          startedAt: Date.now(),
          completed: existing?.completed ?? false,
        } as any),
      );
    } catch {
      // if Instant is unavailable/misconfigured, we still allow local play
    }
  }

  async function setCheckpoints(section: GameSection, checkpointCount: number) {
    const existing = bySection.get(section);
    try {
      const progressId = getProgressId(section, existing?.id);
      await db.transact(
        db.tx.progress[progressId].update({
          section,
          checkpointCount,
          checkpointsDone: existing?.checkpointsDone ?? 0,
          completed: existing?.completed ?? false,
        } as any),
      );
    } catch {
      // ignore
    }
  }

  async function markCheckpoint(section: GameSection) {
    const existing = bySection.get(section);
    const next = Math.max(0, (existing?.checkpointsDone ?? 0) + 1);
    try {
      const progressId = getProgressId(section, existing?.id);
      await db.transact(
        db.tx.progress[progressId].update({
          section,
          checkpointsDone: next,
          completed: existing?.completed ?? false,
        } as any),
      );
    } catch {
      // ignore
    }
  }

  async function markComplete(section: GameSection) {
    const existing = bySection.get(section);
    // Always unlock locally immediately (so gameplay never blocks).
    setLocalCompleted((prev) => {
      const next = new Set(prev);
      next.add(section);
      writeLocalCompleted(next);
      return next;
    });

    try {
      const progressId = getProgressId(section, existing?.id);
      await db.transact(
        db.tx.progress[progressId].update({
          section,
          completed: true,
          completedAt: Date.now(),
        } as any),
      );
    } catch {
      // ignore
    }
  }

  return {
    isLoading,
    error,
    bySection,
    completedSections,
    ensureStarted,
    setCheckpoints,
    markCheckpoint,
    markComplete,
  };
}

