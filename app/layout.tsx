import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import ProgressNav from "@/components/ProgressNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kushal × Diya — Five Years",
  description: "A little game, a big love letter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col text-slate-900">
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat [filter:saturate(1.2)_contrast(1.08)_brightness(1.02)]"
          style={{ backgroundImage: "url('/tree.png')" }}
        />
        <div
          className="pointer-events-none fixed inset-0 z-0 backdrop-blur-[8px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.62) 58%, black 82%)",
            maskImage:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.62) 58%, black 82%)",
          }}
        />
        <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#fff4df]/24 via-[#fff7ea]/14 to-[#f7f0e4]/22" />
        <div className="relative z-10 min-h-screen">
          <ProgressNav />
          <div className="min-h-[calc(100vh-57px)] pb-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
