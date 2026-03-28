"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/hooks/useProgress";
import { isSectionUnlocked } from "@/lib/game";

export default function LoveLetterPage() {
  const { completedSections } = useProgress();
  const unlocked = isSectionUnlocked(completedSections, "love-letter");
  const [code, setCode] = useState("");
  const [passed, setPassed] = useState(false);

  const decorations = useMemo(
    () => [
      { left: "4%", top: "12%", size: 34, emoji: "💖", delay: 0, duration: 7 },
      { left: "12%", top: "60%", size: 26, emoji: "💗", delay: 1.5, duration: 8 },
      { left: "20%", top: "25%", size: 28, emoji: "🌸", delay: 2, duration: 7 },
      { left: "32%", top: "78%", size: 22, emoji: "💕", delay: 0.5, duration: 6 },
      { left: "40%", top: "15%", size: 30, emoji: "✨", delay: 2.5, duration: 8 },
      { left: "50%", top: "66%", size: 24, emoji: "🌷", delay: 1, duration: 9 },
      { left: "60%", top: "22%", size: 20, emoji: "💞", delay: 1.8, duration: 7 },
      { left: "72%", top: "74%", size: 28, emoji: "🌺", delay: 2.8, duration: 9 },
      { left: "84%", top: "34%", size: 24, emoji: "💘", delay: 1.2, duration: 7 },
      { left: "92%", top: "56%", size: 26, emoji: "❀", delay: 2.2, duration: 8 },
    ],
    [],
  );
  const floatingPhotos = useMemo(
    () => [
      { src: "/pic1.jpg", left: "5%", top: "18%", width: 156, rotate: -9, duration: 6.5, delay: 0.4 },
      { src: "/pic2.jpg", left: "83%", top: "14%", width: 166, rotate: 8, duration: 7.5, delay: 1.1 },
      { src: "/pic3.jpg", left: "8%", top: "70%", width: 148, rotate: 6, duration: 6.8, delay: 1.9 },
      { src: "/pic4.jpg", left: "80%", top: "72%", width: 160, rotate: -7, duration: 7.2, delay: 0.8 },
      { src: "/pic2.jpg", left: "18%", top: "8%", width: 128, rotate: 5, duration: 6.2, delay: 2.1 },
      { src: "/pic3.jpg", left: "30%", top: "12%", width: 132, rotate: -6, duration: 6.9, delay: 0.2 },
      { src: "/pic4.jpg", left: "66%", top: "8%", width: 130, rotate: 9, duration: 7.1, delay: 1.7 },
      { src: "/pic1.jpg", left: "92%", top: "24%", width: 124, rotate: -10, duration: 6.4, delay: 2.5 },
      { src: "/pic3.jpg", left: "3%", top: "42%", width: 122, rotate: 7, duration: 6.1, delay: 1.3 },
      { src: "/pic1.jpg", left: "87%", top: "44%", width: 126, rotate: -8, duration: 6.7, delay: 0.9 },
      { src: "/pic2.jpg", left: "18%", top: "52%", width: 120, rotate: -5, duration: 5.9, delay: 2.2 },
      { src: "/pic4.jpg", left: "70%", top: "50%", width: 118, rotate: 6, duration: 6.6, delay: 1.5 },
      { src: "/pic1.jpg", left: "30%", top: "82%", width: 122, rotate: 10, duration: 6.3, delay: 0.6 },
      { src: "/pic2.jpg", left: "58%", top: "84%", width: 120, rotate: -9, duration: 6.8, delay: 2.8 },
      { src: "/pic3.jpg", left: "43%", top: "6%", width: 118, rotate: 4, duration: 5.8, delay: 1.9 },
      { src: "/pic4.jpg", left: "46%", top: "88%", width: 116, rotate: -4, duration: 6.4, delay: 2.4 },
    ],
    [],
  );

  function checkCode() {
    setPassed(true);
  }

  if (!unlocked) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="font-serif text-3xl text-[#4e3d59]">Lady Whistledown&apos;s Letter</h1>
        <p className="mt-2 text-slate-700">
          Locked. Complete all three sections to unlock.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link className="underline text-[#8f7650]" href="/crossword">
            Go to crossword
          </Link>
          <Link className="underline text-[#8f7650]" href="/chat-analytics">
            Go to the Gazette
          </Link>
          <Link className="underline text-[#8f7650]" href="/report-card">
            Go to report card
          </Link>
        </div>
      </main>
    );
  }

  if (!passed) {
    return (
      <main className="mx-auto w-full max-w-3xl px-3 sm:px-4 py-10 sm:py-16">
        <div className="rounded-3xl border border-[#ead8bf]/75 bg-[#fff7eb]/60 backdrop-blur-md p-4 sm:p-10 shadow-[0_16px_38px_rgba(66,49,30,0.16)]">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4e3d59]">Wait! One last Question.</h1>
          <p className="mt-3 text-[#5b4d63]">Kya aap udna chaahate ho?</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-[#e7d3b7] bg-[#fffaf2] px-3 py-2 text-[#4e3d59] outline-none focus:border-[#d8b883]"
              placeholder=""
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={checkCode}
              className="rounded-xl text-white px-5 py-2 min-w-[110px] transition shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
            >
              Unlock
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-3xl px-3 sm:px-4 py-8 sm:py-12">
      <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden">
        {decorations.map((d, i) => (
          <span
            key={`${d.left}_${d.top}_${i}`}
            className="absolute animate-floatFlower opacity-80"
            style={{
              left: d.left,
              top: d.top,
              fontSize: `${d.size}px`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          >
            {d.emoji}
          </span>
        ))}
      </div>
      <div className="pointer-events-none fixed inset-0 z-[9] overflow-hidden hidden sm:block">
        {floatingPhotos.map((p, i) => (
          <div
            key={`${p.src}_${i}`}
            className="absolute animate-floatFlower opacity-90"
            style={{
              left: p.left,
              top: p.top,
              transform: `rotate(${p.rotate}deg)`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <div className="rounded-sm bg-[#fffdf7] p-2 pb-6 shadow-[0_12px_30px_rgba(50,38,26,0.2)] ring-1 ring-[#ecdac1]/90">
              <Image
                src={p.src}
                alt="Memory photo"
                width={p.width}
                height={Math.round(p.width * 1.2)}
                className="h-auto w-auto max-w-[160px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 rounded-3xl border border-[#efdcc2]/80 bg-gradient-to-b from-[#fff7eb]/90 via-[#fffaf2]/90 to-[#fef4e8]/90 backdrop-blur p-4 sm:p-10 shadow-[0_18px_45px_rgba(84,61,39,0.18)]">
        <h1 className="font-script text-4xl sm:text-5xl text-[#8f7650]">
          Lady Whistledown&apos;s Letter
        </h1>
        <div className="mt-6 space-y-4 text-[#4e3d59] leading-7 sm:leading-8 font-serif text-[15px] sm:text-base">
          <p>
            Dearest Gentle Reader,
            <br />
            It is with great pleasure that this author reports what society has long suspected but never dared confirm. Five years. Five years since two unsuspecting souls stumbled into something neither of them fully understood and yet neither of them walked away from. How delightfully foolish. How absolutely wonderful.
          </p>
          <p>
            This author has observed many a courtship in her time. Most are forgettable. This one is not.
          </p>
          <p>
            Let us begin with the confession that started it all. He said I love you. She said thenks. Society gasped. He did not flinch. He did not waver. He did not look back. Not once. Not for a single moment. And that dear reader told this author everything she needed to know.
          </p>
          <p>
            He reaches for her first. Always. When fortune smiles upon him and when it most certainly does not. When something is too wonderful or too ridiculous to keep to himself it is her name that forms before the thought has even finished. Five years of this and not one day has been different. This author finds it almost unbearably romantic and she does not say that lightly.
          </p>
          <p>
            She shows up quietly. She holds her own storms until he has put his down. She cheers for him without fanfare without expectation without ever once making it a spectacle. And he notices. This author can confirm he has always noticed. He simply does not say it nearly enough and she considers this his greatest failing to date.
          </p>
          <p>
            Kannur. Ah yes. Kannur. Every adventure since has been quietly held up against it and found ever so slightly lacking. Perhaps it shall never be matched. Perhaps that is rather the point of a memory truly worth keeping.
          </p>
          <p>
            Five years is no small feat dear reader. It is something real. Something rare. The kind of thing lesser people take entirely for granted. He does not. She does not. And this author finds that most admirable.
          </p>
          <p>
            He cannot wait to see her. To celebrate this properly. In person. As it deserves.
            <br />
            She deserves that. She deserves everything.
          </p>
          <p>
            Happy 5. Happy birthday. She has had his heart since day one. ❤️
          </p>
          <p>
            Until next time dear reader. This author shall be watching.
          </p>
          <p className="font-script text-3xl text-[#8f7650] leading-tight">
            Yours in devoted observation
            <br />
            Lady Whistledown
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-full px-8 py-3 text-sm text-white transition shadow-[0_10px_24px_rgba(69,58,38,0.30)] bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105"
          >
            Return Home →
          </Link>
        </div>
      </div>
    </main>
  );
}

