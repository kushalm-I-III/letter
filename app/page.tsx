"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <div className="rounded-3xl border border-transparent bg-transparent p-6 sm:p-10 shadow-none backdrop-blur-0">
        <h1 className="font-script text-center text-4xl sm:text-6xl text-white drop-shadow-[0_3px_12px_rgba(35,24,14,0.75)]">
          Lady Whistledown&apos;s Grand Love Quest
        </h1>
        <p className="mt-5 max-w-3xl text-white font-semibold leading-7 drop-shadow-[0_2px_10px_rgba(22,15,10,0.9)]">
          Complete each level in order to unlock Lady Whistledown&apos;s letter.
        </p>
        <div className="mt-4 rounded-2xl border border-[#f0dfc8]/80 bg-[#fff4e6]/44 backdrop-blur-sm p-4 shadow-[0_12px_28px_rgba(36,25,15,0.28)]">
          <div className="text-xs uppercase tracking-widest text-white font-semibold drop-shadow-[0_1px_5px_rgba(26,18,12,0.85)]">
            Game Rules
          </div>
          <ul className="mt-2 text-sm text-white font-medium leading-7 drop-shadow-[0_2px_6px_rgba(24,16,10,0.9)]">
            <li>• Level 1 (Crossword): all answers must be correct.</li>
            <li>• Level 2 (Gazette): make all the guesses.</li>
            <li>• Level 3 (Report Card): choose all grades, calculate, then finalize.</li>
            <li>• Lady Whistledown&apos;s Letter unlocks only after Levels 1-3 are complete.</li>
          </ul>
        </div>

        <div className="mt-10 p-2 sm:p-3">
          <div className="flex flex-col items-center">
            <Link
              href="/crossword"
              className="relative inline-flex items-center justify-center rounded-full px-12 py-4 text-xl font-bold text-white shadow-[0_12px_28px_rgba(69,58,38,0.34)] transition bg-gradient-to-r from-[#b28b55] via-[#8f7d5b] to-[#7b7fa2] hover:brightness-105 before:absolute before:inset-[-2px] before:-z-10 before:rounded-full before:bg-gradient-to-r before:from-[#d8b883] before:via-[#bcae8f] before:to-[#9eaad1] before:blur-[1px]"
            >
              Start Here!
            </Link>
            <div className="mt-3 rounded-full border border-[#f1ddc2]/70 bg-[#fff4e6]/42 px-5 py-2 backdrop-blur-sm shadow-[0_8px_18px_rgba(34,24,15,0.24)]">
              <p className="text-sm font-semibold tracking-wide text-white drop-shadow-[0_1px_4px_rgba(38,28,18,0.75)]">
                Follow the finger and begin your quest
              </p>
            </div>

            <div className="mt-4 p-[2px] rounded-[30px] bg-gradient-to-br from-[#d4b16f]/85 via-[#dfa9c6]/80 to-[#a792d8]/85 shadow-[0_14px_28px_rgba(68,49,31,0.16)]">
              <div className="rounded-[28px] border-0 bg-transparent p-0">
                <Image
                  src="/mepoint_new.png"
                  alt="Kushal pointing upward"
                  width={250}
                  height={340}
                  className="h-auto w-[210px] sm:w-[250px] rounded-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
