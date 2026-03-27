"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CROSSWORD_ENTRIES, normalizeAnswer } from "@/src/content/crossword";
import { useProgress } from "@/hooks/useProgress";

type Status = "idle" | "wrong" | "correct";

export default function CrosswordMiniGame() {
  const { markComplete } = useProgress();

  const answers = useMemo(
    () => CROSSWORD_ENTRIES.map((e) => normalizeAnswer(e.answer)),
    [],
  );

  const [inputs, setInputs] = useState(() => answers.map(() => ""));
  const [status, setStatus] = useState<Status>("idle");
  const [completed, setCompleted] = useState(false);

  const allCorrect = useMemo(() => {
    for (let i = 0; i < answers.length; i++) {
      if (normalizeAnswer(inputs[i] ?? "") !== answers[i]) return false;
    }
    return true;
  }, [answers, inputs]);

  useEffect(() => {
    if (completed) return;
    if (!allCorrect) return;
    setCompleted(true);
    setStatus("correct");
    void markComplete("crossword");
  }, [allCorrect, completed, markComplete]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (allCorrect) {
      setStatus("correct");
      return;
    }
    setStatus("wrong");
  }

  return (
    <div className="rounded-3xl border border-[#ead8bf]/75 bg-[#fff7eb]/55 backdrop-blur-md p-4 sm:p-10 shadow-[0_16px_38px_rgba(66,49,30,0.16)]">
      <h2 className="font-serif text-xl sm:text-2xl text-[#4e3d59]">
        Level 1: The Crossword Codebook
      </h2>
      <p className="mt-2 text-[#5b4d63] leading-7">
        Strict rule: this level only clears when every answer is exactly right.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        {CROSSWORD_ENTRIES.map((entry, idx) => {
          const expected = answers[idx];
          const current = inputs[idx] ?? "";
          const normalized = normalizeAnswer(current);
          const isCorrect = normalized === expected;
          const chars = normalized.split("");

          return (
            <div
              key={entry.answer}
              className={[
                "rounded-2xl border p-4 sm:p-5 bg-[#fffaf2]/72",
                isCorrect ? "border-emerald-300" : "border-[#ead8bf]/80",
              ].join(" ")}
            >
              <div className="flex items-start gap-2">
                <div className="shrink-0 h-6 w-6 rounded-full bg-[#f4e8d6] text-[#8f7650] text-xs grid place-items-center">
                  {idx + 1}
                </div>
                <div className="text-sm text-[#4e3d59]">{entry.clue}</div>
              </div>

              <div className="mt-3 overflow-x-auto">
                <div className="flex w-max gap-1.5 pr-1">
                {Array.from({ length: expected.length }).map((_, i) => {
                  const ch = chars[i] ?? "";
                  return (
                    <div
                      key={`${entry.answer}_${i}`}
                      className={[
                        "h-8 w-8 sm:h-9 sm:w-9 rounded-md border text-center text-sm font-mono uppercase grid place-items-center",
                        ch
                          ? "bg-[#f8efe2] border-[#e7d3b7] text-[#4e3d59]"
                          : "bg-white border-slate-200 text-slate-300",
                        isCorrect ? "ring-1 ring-emerald-200" : "",
                      ].join(" ")}
                    >
                      {ch || ""}
                    </div>
                  );
                })}
                </div>
              </div>

              <div className="mt-3 sm:max-w-sm">
                <input
                  value={current}
                  onChange={(e) => {
                    const next = [...inputs];
                    next[idx] = e.target.value;
                    setInputs(next);
                    setStatus("idle");
                  }}
                  className={[
                    "w-full rounded-xl border px-3 py-2 bg-white/80 font-mono tracking-wider uppercase outline-none text-slate-900 placeholder:text-slate-400",
                    isCorrect ? "border-emerald-300" : "border-[#e7d3b7] focus:border-[#d8b883]",
                  ].join(" ")}
                  placeholder="Type answer"
                  maxLength={expected.length}
                  aria-label={`Answer ${idx + 1}`}
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="mt-1 text-xs text-slate-600">
                  {expected.length} letters
                  {isCorrect ? " • correct" : ""}
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-2 flex flex-wrap gap-3 items-center">
          {status !== "correct" ? (
            <button
              type="submit"
              className="rounded-full text-white px-5 py-2 text-sm transition shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
            >
              Check answers
            </button>
          ) : null}
          {status === "wrong" ? (
            <div className="text-sm text-rose-700">
              Not quite — keep going.
            </div>
          ) : null}
          {status === "correct" ? (
            <div className="text-sm text-emerald-700">
              Level cleared. The next page is unlocked.
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

