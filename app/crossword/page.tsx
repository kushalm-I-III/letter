"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";
import CrosswordMiniGame from "@/components/CrosswordMiniGame";

export default function CrosswordPage() {
  const { ensureStarted, completedSections } = useProgress();

  useEffect(() => {
    void ensureStarted("crossword");
  }, [ensureStarted]);

  const unlockedNext = completedSections.has("crossword");

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <CrosswordMiniGame />
      <div className="mt-8 flex justify-center">
        <Link
          href="/chat-analytics"
          aria-disabled={!unlockedNext}
          className={[
            "rounded-full px-8 py-3 text-sm transition",
            unlockedNext
              ? "text-white shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
              : "bg-slate-200 text-slate-500 pointer-events-none",
          ].join(" ")}
        >
          Next level →
        </Link>
      </div>
    </main>
  );
}

