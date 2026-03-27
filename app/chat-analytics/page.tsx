"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { isSectionUnlocked } from "@/lib/game";

type Person = "Kushal" | "Diya";

type Question = {
  id: string;
  title: string;
  prompt: string;
  correct: Person | "Tie";
  revealTitle: string;
  revealBody: string;
  chart: {
    type: "pie" | "bar2";
    aLabel: string;
    aValue: number;
    bLabel: string;
    bValue: number;
    unit?: string;
  };
};

const QUESTIONS: Question[] = [
  {
    id: "total-messages",
    title: "The Numbers",
    prompt: "Who sent more total messages?",
    correct: "Kushal",
    revealTitle: "Verdict: Kushal is statistically the talker.",
    revealBody:
      "Over 5 years, Kushal sent 1,188 more messages and typed 18,918 more words. He is, by every available metric, the one who kept the conversation moving.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 9996,
      bLabel: "Diya",
      bValue: 8808,
      unit: "msgs",
    },
  },
  {
    id: "median-reply",
    title: "Reply Speed Race",
    prompt: "Who replies faster (median reply time)?",
    correct: "Kushal",
    revealTitle: "Winner: Kushal.",
    revealBody:
      "18 seconds vs 42 seconds. Either he has zero responsibilities or Diya is his entire situational awareness. Both could be true.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 18,
      bLabel: "Diya",
      bValue: 42,
      unit: "sec",
    },
  },
  {
    id: "apology-counter",
    title: "The Apology Counter",
    prompt: "Who says sorry more?",
    correct: "Kushal",
    revealTitle: "Kushal apologised 2.6× more.",
    revealBody:
      "94 apologies over 5 years is roughly one every 19 days. Whether that’s self-awareness or a high incident rate is a matter of ongoing debate.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 94,
      bLabel: "Diya",
      bValue: 36,
      unit: "sorries",
    },
  },
  {
    id: "miss-energy",
    title: "Love & Affection Score",
    prompt: 'Who says "miss" more?',
    correct: "Diya",
    revealTitle: "Diya wins the miss-you energy.",
    revealBody:
      "Kushal sends nearly 3× more affectionate messages overall, but Diya uses “miss” twice as often—she feels deeply, she just doesn’t always monologue about it.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 97,
      bLabel: "Diya",
      bValue: 211,
      unit: "miss",
    },
  },
  {
    id: "deep-night-texts",
    title: "Night Owl Energy",
    prompt: "Who sent more deep-night texts (1am-4am)?",
    correct: "Kushal",
    revealTitle: "Kushal by a small margin.",
    revealBody:
      "1,633 vs 1,513. Together that is 3,146 night messages over five years. Sleep was optional. Each other was not.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 1633,
      bLabel: "Diya",
      bValue: 1513,
      unit: "msgs",
    },
  },
  {
    id: "question-mark-energy",
    title: "Question Mark Championship",
    prompt: "Who asked more questions?",
    correct: "Kushal",
    revealTitle: "Kushal asks. A lot.",
    revealBody:
      "1,948 questions vs 1,052. Curiosity is romantic, but this is also low-key an interrogation strategy.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 1948,
      bLabel: "Diya",
      bValue: 1052,
      unit: "msgs",
    },
  },
  {
    id: "emoji-chaos",
    title: "Emoji Chaos Index",
    prompt: "Who used more emojis overall?",
    correct: "Kushal",
    revealTitle: "Kushal wins by emoji volume.",
    revealBody:
      "1,614 vs 1,245. Evidence suggests both are expressive; one is simply more committed to decorative punctuation.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 1614,
      bLabel: "Diya",
      bValue: 1245,
      unit: "emoji",
    },
  },
  {
    id: "instant-replies",
    title: "Instant Reply Reflex",
    prompt: "Who has a higher instant reply rate (<1 min)?",
    correct: "Kushal",
    revealTitle: "Kushal has faster reflexes here.",
    revealBody:
      "70% vs 55%. Diya calls it being busy. Kushal calls it dedication. The data calls it notifications always on.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 70,
      bLabel: "Diya",
      bValue: 55,
      unit: "%",
    },
  },
  {
    id: "slow-replies",
    title: "Strategic Delays",
    prompt: "Who has more slow replies (>30 mins)?",
    correct: "Diya",
    revealTitle: "Diya masters the dramatic pause.",
    revealBody:
      "13% vs 8%. Not a bug. A feature. Keeps suspense alive and character development strong.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 8,
      bLabel: "Diya",
      bValue: 13,
      unit: "%",
    },
  },
  {
    id: "compliments-given",
    title: "Compliment Department",
    prompt: "Who gives more compliments?",
    correct: "Kushal",
    revealTitle: "Kushal: Head of verbal appreciation.",
    revealBody:
      "187 vs 52. Meanwhile Diya keeps quality control strict and releases praise only when earned.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 187,
      bLabel: "Diya",
      bValue: 52,
      unit: "msgs",
    },
  },
  {
    id: "dry-replies",
    title: "Dry Reply Hall of Fame",
    prompt: "Who sent more one-word dry replies?",
    correct: "Diya",
    revealTitle: "Diya dominates the minimalism category.",
    revealBody:
      "193 vs 95. 'Ok', 'yeah', 'k', 'hmm'—short messages, high impact, elite emotional economy.",
    chart: {
      type: "pie",
      aLabel: "Kushal",
      aValue: 95,
      bLabel: "Diya",
      bValue: 193,
      unit: "msgs",
    },
  },
];

export default function ChatAnalyticsPage() {
  const {
    ensureStarted,
    completedSections,
    setCheckpoints,
    markCheckpoint,
    markComplete,
  } = useProgress();
  const unlocked = isSectionUnlocked(completedSections, "chat-analytics");
  const alreadyCompleted = completedSections.has("chat-analytics");
  const [answers, setAnswers] = useState<Record<string, Person>>({});
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!unlocked) return;
    void ensureStarted("chat-analytics");
    void setCheckpoints("chat-analytics", QUESTIONS.length);
  }, [ensureStarted, setCheckpoints, unlocked]);

  useEffect(() => {
    // Keep answers ephemeral per page load.
    setAnswers({});
  }, [alreadyCompleted]);

  const numAnswered = useMemo(
    () => QUESTIONS.filter((q) => Boolean(answers[q.id])).length,
    [answers],
  );

  const allAnswered = numAnswered === QUESTIONS.length;

  function choose(idx: number, person: Person) {
    const q = QUESTIONS[idx];
    if (!q) return;
    if (answers[q.id]) return;
    setAnswers((prev) => {
      return { ...prev, [q.id]: person };
    });
    void markCheckpoint("chat-analytics");
    const nextIdx = Math.min(idx + 1, QUESTIONS.length - 1);
    setActiveIdx(nextIdx);
    requestAnimationFrame(() => {
      const el = document.getElementById(`q_${QUESTIONS[nextIdx]?.id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 120;
      // Skip big jumps; only apply a gentle nudge.
      if (Math.abs(targetY - window.scrollY) > 260) return;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    });

    // Completing the last question should mark the whole level complete
    // so the "Next level" link unlocks.
    if (idx === QUESTIONS.length - 1) {
      void markComplete("chat-analytics");
    }
  }

  if (!unlocked) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="font-serif text-3xl text-[#4e3d59]">The Gazette</h1>
        <p className="mt-2 text-slate-700">
          Locked. Finish the crossword first.
        </p>
        <div className="mt-6">
          <Link className="underline text-[#8f7650]" href="/crossword">
            Go to crossword
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-3 sm:px-4 py-8 sm:py-10">
      <div className="rounded-3xl border border-[#ead8bf]/75 bg-[#fff7eb]/55 backdrop-blur-md p-4 sm:p-10 shadow-[0_16px_38px_rgba(66,49,30,0.16)]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#4e3d59]">
          The Kushal × Diya Gazette
        </h1>
        <p className="mt-2 text-[#5b4d63] leading-7">
          Mini-game rule: for each headline, guess who it’s about. You can be wrong.
          The objective is to <b>make the guesses</b>.
        </p>

        <div className="mt-8 text-xs text-[#8a7556]">
          Guess once per question. After each guess, you’ll move to the next one automatically.
        </div>

        {/* Scrolling feed of all questions */}
        <div className="mt-4 space-y-4">
          {QUESTIONS.map((qq, idx) => {
            const a = answers[qq.id];
            const unlockedCard = idx <= activeIdx || Boolean(a);
            const isCurrent = idx === activeIdx && !a;
            return (
              <div
                key={qq.id}
                id={`q_${qq.id}`}
                className={[
                  "rounded-2xl border bg-[#fffaf2]/75 p-4 sm:p-5",
                  !unlockedCard
                    ? "border-slate-100 opacity-50"
                    : isCurrent
                      ? "border-[#d8b883] ring-2 ring-[#f4e8d6]"
                      : "border-[#ead8bf]/80",
                ].join(" ")}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8a7556]">
                      {idx + 1}. {qq.title}
                    </div>
                    <div className="mt-2 text-[#4e3d59]">{qq.prompt}</div>
                    {a ? (
                      <div className="mt-2 text-xs text-[#8a7556]">
                        You guessed <b className="text-[#5b4d63]">{a}</b>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-[#b39f84]">
                        Not answered yet
                      </div>
                    )}
                  </div>
                  {a ? <TinyChart {...qq.chart} /> : null}
                </div>

                {unlockedCard ? (
                  <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => choose(idx, "Kushal")}
                      disabled={Boolean(a)}
                      className={[
                        "rounded-full px-4 sm:px-5 py-2 text-sm border transition",
                        a === "Kushal"
                          ? "border-[#d8b883] bg-[#faefd9] text-[#5d4732]"
                          : a
                            ? "border-slate-200 text-slate-400 cursor-not-allowed"
                            : "border-[#e8dac6] hover:bg-[#f9efdf] text-[#4e3d59]",
                      ].join(" ")}
                    >
                      Kushal
                    </button>
                    <button
                      type="button"
                      onClick={() => choose(idx, "Diya")}
                      disabled={Boolean(a)}
                      className={[
                        "rounded-full px-4 sm:px-5 py-2 text-sm border transition",
                        a === "Diya"
                          ? "border-[#d8b883] bg-[#faefd9] text-[#5d4732]"
                          : a
                            ? "border-slate-200 text-slate-400 cursor-not-allowed"
                            : "border-[#e8dac6] hover:bg-[#f9efdf] text-[#4e3d59]",
                      ].join(" ")}
                    >
                      Diya
                    </button>
                  </div>
                ) : null}

                {a ? (
                  <div className="mt-4 rounded-2xl border border-[#ead8bf]/85 bg-[#fff1df]/78 p-4">
                    <div className="text-sm text-[#5b4d63]">
                      Answer:{" "}
                      <b>{qq.correct === "Tie" ? "It’s a tie" : qq.correct}</b>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[#4e3d59]">
                      {qq.revealTitle}
                    </div>
                    <div className="mt-1 text-sm text-[#5b4d63]">
                      {qq.revealBody}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/report-card"
            aria-disabled={!completedSections.has("chat-analytics")}
            className={[
              "rounded-full px-8 py-3 text-sm transition",
              completedSections.has("chat-analytics")
                ? "text-white shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
                : "bg-slate-200 text-slate-500 pointer-events-none",
            ].join(" ")}
          >
            Next level →
          </Link>
        </div>
      </div>
    </main>
  );
}

function TinyChart({
  type,
  aLabel,
  aValue,
  bLabel,
  bValue,
  unit,
}: {
  type: "pie" | "bar2";
  aLabel: string;
  aValue: number;
  bLabel: string;
  bValue: number;
  unit?: string;
}) {
  const kushalColor = "#2d6cdf";
  const diyaColor = "#e28ab1";

  if (type === "pie") {
    const total = aValue + bValue;
    const aPct = total === 0 ? 0.5 : aValue / total;
    const r = 18;
    const c = 2 * Math.PI * r;
    const aLen = c * aPct;
    const bLen = c - aLen;
    return (
      <div className="shrink-0 text-right self-end sm:self-auto">
        <svg className="h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle
            cx="26"
            cy="26"
            r={r}
            fill="none"
            stroke={kushalColor}
            strokeWidth="10"
            strokeDasharray={`${aLen} ${bLen}`}
            strokeDashoffset="0"
            transform="rotate(-90 26 26)"
            strokeLinecap="butt"
          />
          <circle
            cx="26"
            cy="26"
            r={r}
            fill="none"
            stroke={diyaColor}
            strokeWidth="10"
            strokeDasharray={`${bLen} ${aLen}`}
            strokeDashoffset={-aLen}
            transform="rotate(-90 26 26)"
            strokeLinecap="butt"
          />
        </svg>
        <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-4">
          <span style={{ color: kushalColor }}>{aLabel}</span>{" "}
          {unit ? `${aValue}${unit === "sec" ? "s" : ""}` : aValue}
          <br />
          <span style={{ color: diyaColor }}>{bLabel}</span>{" "}
          {unit ? `${bValue}${unit === "sec" ? "s" : ""}` : bValue}
        </div>
      </div>
    );
  }

  const max = Math.max(aValue, bValue, 1);
  const aW = Math.round((aValue / max) * 44);
  const bW = Math.round((bValue / max) * 44);
  return (
    <div className="shrink-0 w-[72px]">
      <div className="flex flex-col gap-1">
        <div className="h-2 rounded bg-sky-200 overflow-hidden">
          <div className="h-2" style={{ width: `${aW}px`, backgroundColor: kushalColor }} />
        </div>
        <div className="h-2 rounded bg-sky-200 overflow-hidden">
          <div className="h-2" style={{ width: `${bW}px`, backgroundColor: diyaColor }} />
        </div>
      </div>
      <div className="mt-1 text-[11px] text-slate-500 leading-4">
        <span style={{ color: kushalColor }}>
          {unit === "sec" ? `${aValue}s` : aValue}
        </span>{" "}
        /{" "}
        <span style={{ color: diyaColor }}>
          {unit === "sec" ? `${bValue}s` : bValue}
        </span>
      </div>
    </div>
  );
}

