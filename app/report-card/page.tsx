"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
import { isSectionUnlocked } from "@/lib/game";

type Grade = "A" | "B" | "C" | "F";
type Subject = {
  key: string;
  label: string;
};

const GRADE_RULES: Record<Grade, { percent: number; label: string }> = {
  A: { percent: 100, label: "Very Good" },
  B: { percent: 90, label: "Good" },
  C: { percent: 80, label: "Could work on it more" },
  F: { percent: 60, label: "Needs to work on it more" },
};

const GRADE_ORDER: Grade[] = ["A", "B", "C", "F"];

const SUBJECTS: Subject[] = [
  { key: "communication", label: "Communication" },
  { key: "punctuality", label: "Punctuality (Emotional)" },
  { key: "effort", label: "Effort & Thoughtfulness" },
  { key: "conflict", label: "Handling Conflict" },
  { key: "romantic", label: "Romantic Creativity" },
  { key: "consistency", label: "Consistency" },
  { key: "maturity", label: "Maturity" },
  { key: "forgiveness", label: "Forgiveness / Letting Things Go" },
  { key: "weirdness", label: "Weirdness (positive metric)" },
];

function emptyGradeMap(): Record<string, Grade | null> {
  return Object.fromEntries(SUBJECTS.map((s) => [s.key, null]));
}

function pctToLetter(pct: number): Grade {
  if (pct >= 95) return "A";
  if (pct >= 85) return "B";
  if (pct >= 70) return "C";
  return "F";
}

export default function ReportCardPage() {
  const router = useRouter();
  const { ensureStarted, completedSections, markComplete } = useProgress();
  const unlocked = isSectionUnlocked(completedSections, "report-card");

  const [kushalGrades, setKushalGrades] = useState<
    Record<string, Grade | null>
  >(emptyGradeMap());
  const [diyaGrades, setDiyaGrades] = useState<Record<string, Grade | null>>(
    emptyGradeMap(),
  );
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    if (unlocked) void ensureStarted("report-card");
  }, [ensureStarted, unlocked]);

  const allSelected = useMemo(() => {
    const k = SUBJECTS.every((s) => Boolean(kushalGrades[s.key]));
    const d = SUBJECTS.every((s) => Boolean(diyaGrades[s.key]));
    return k && d;
  }, [kushalGrades, diyaGrades]);

  const kushalPct = useMemo(() => {
    const selected = SUBJECTS.map((s) => kushalGrades[s.key]).filter(
      Boolean,
    ) as Grade[];
    if (!selected.length) return 0;
    return Math.round(
      selected.reduce((sum, g) => sum + GRADE_RULES[g].percent, 0) /
        selected.length,
    );
  }, [kushalGrades]);

  const diyaPct = useMemo(() => {
    const selected = SUBJECTS.map((s) => diyaGrades[s.key]).filter(
      Boolean,
    ) as Grade[];
    if (!selected.length) return 0;
    return Math.round(
      selected.reduce((sum, g) => sum + GRADE_RULES[g].percent, 0) /
        selected.length,
    );
  }, [diyaGrades]);

  const kushalFinal = pctToLetter(kushalPct);
  const diyaFinal = pctToLetter(diyaPct);

  const winner =
    kushalPct === diyaPct ? "Tie" : kushalPct > diyaPct ? "Kushal" : "Diya";

  async function finalizeAndContinue() {
    if (!calculated) return;
    await markComplete("report-card");
    router.push("/love-letter");
  }

  if (!unlocked) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="font-serif text-3xl text-[#4e3d59]">Report Card</h1>
        <p className="mt-2 text-slate-700">
          Locked. Finish the Gazette first.
        </p>
        <div className="mt-6">
          <Link className="underline text-[#8f7650]" href="/chat-analytics">
            Go to the Gazette
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-[#ecd9be]/75 bg-[#fff7eb]/55 p-6 sm:p-10 backdrop-blur-md shadow-[0_16px_38px_rgba(66,49,30,0.16)]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-[#4e3d59]">
              5-Year Report Card
            </h1>
            <p className="mt-2 text-[#5b4d63]">
              Grade both students using the official rubric.
            </p>
          </div>
          <div className="rounded-2xl border border-[#ead8bf]/80 bg-[#fffaf2]/65 px-4 py-3">
            <div className="text-xs uppercase tracking-widest text-[#8a7556]">
              Grade Rubric
            </div>
            <div className="mt-1 text-xs text-[#5b4d63] leading-5">
              A = 100% (Very Good)
              <br />
              B = 90% (Good)
              <br />
              C = 80% (Could work on it more)
              <br />
              F = 60% (Needs to work on it more)
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GradeTable
            name="Kushal 👽"
            selected={kushalGrades}
            onSelect={(key, grade) => {
              setKushalGrades((prev) => ({ ...prev, [key]: grade }));
              setCalculated(false);
            }}
          />
          <GradeTable
            name="Diya 🐷"
            selected={diyaGrades}
            onSelect={(key, grade) => {
              setDiyaGrades((prev) => ({ ...prev, [key]: grade }));
              setCalculated(false);
            }}
          />
        </div>

        <div className="mt-8 rounded-3xl border border-[#ead8bf]/80 bg-[#fffaf2]/60 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl text-[#4e3d59]">Results</h2>
              {calculated ? (
                <div className="mt-2 text-[#5b4d63] leading-7">
                  <div>
                    Kushal: <b>{kushalFinal}</b> ({kushalPct}%)
                  </div>
                  <div>
                    Diya: <b>{diyaFinal}</b> ({diyaPct}%)
                  </div>
                  <div className="mt-2">
                    Winner: <b>{winner}</b>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-[#5b4d63]">
                  Pick grades for all categories, then calculate.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCalculated(true)}
              disabled={!allSelected}
              className={[
                "shrink-0 rounded-full px-4 py-2 text-sm transition",
                allSelected
                  ? "text-white shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed",
              ].join(" ")}
            >
              Calculate grades
            </button>
          </div>
        </div>

        {/* Centered next-level button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => void finalizeAndContinue()}
            disabled={!calculated}
            className={[
              "rounded-full px-6 py-3 text-sm transition",
              calculated
                ? "text-white shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
                : "bg-slate-200 text-slate-500 cursor-not-allowed",
            ].join(" ")}
          >
            Finalize report card
          </button>
        </div>
      </div>
    </main>
  );
}

function GradeTable({
  name,
  selected,
  onSelect,
}: {
  name: string;
  selected: Record<string, Grade | null>;
  onSelect: (key: string, grade: Grade) => void;
}) {
  return (
    <section className="rounded-3xl border border-[#ead8bf]/80 bg-[#fff8ef]/70 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl text-[#4e3d59]">{name}</h2>
        <div className="text-xs text-[#8a7556]">
          Completed:{" "}
          <b className="text-[#5b4d63]">
            {Object.values(selected).filter(Boolean).length}/{SUBJECTS.length}
          </b>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-[#ead8bf]/80">
        <div className="grid grid-cols-12 bg-[#fffaf2]/70 px-3 py-2 text-xs uppercase tracking-widest text-[#8a7556]">
          <div className="col-span-6">Subject</div>
          <div className="col-span-6">Choose grade</div>
        </div>
        <div className="divide-y divide-[#ead8bf]/70">
          {SUBJECTS.map((subject) => {
            const current = selected[subject.key];
            return (
              <div
                key={`${name}_${subject.key}`}
                className="grid grid-cols-12 gap-3 px-3 py-3 items-center"
              >
                <div className="col-span-12 sm:col-span-6 font-medium text-[#4e3d59]">
                  {subject.label}
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <div className="flex gap-2">
                    {GRADE_ORDER.map((grade) => (
                      <button
                        key={`${subject.key}_${grade}`}
                        type="button"
                        onClick={() => onSelect(subject.key, grade)}
                        className={[
                          "rounded-full px-3 py-1 text-xs border transition",
                          current === grade
                            ? "border-[#d8b883] bg-[#faefd9] text-[#5d4732] shadow-sm"
                            : "border-[#e8dac6] bg-[#fffaf2] text-[#5b4d63] hover:bg-[#f9efdf]",
                        ].join(" ")}
                        title={`${grade} - ${GRADE_RULES[grade].label}`}
                      >
                        <span className="font-semibold">{grade}</span>
                      </button>
                    ))}
                  </div>
                  {current ? (
                    <div className="mt-1 text-[11px] text-[#8a7556]">
                      {current} = {GRADE_RULES[current].percent}% (
                      {GRADE_RULES[current].label})
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

