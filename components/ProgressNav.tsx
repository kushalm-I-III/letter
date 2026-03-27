"use client";

import Link from "next/link";

export default function ProgressNav() {
  return (
    <nav className="w-full sticky top-0 z-20 border-b border-[#f1debe]/75 bg-[#fff7ea]/62 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-center">
        <Link
          href="/"
          className="font-script text-[#8f7650] text-2xl leading-none [text-shadow:0_0_6px_rgba(255,241,216,0.65),0_1px_4px_rgba(74,54,33,0.25)]"
        >
          Kushal × Diya
        </Link>
      </div>
    </nav>
  );
}

