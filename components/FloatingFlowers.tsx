"use client";

const FLOWERS = [
  { left: "4%", top: "10%", size: 56, duration: 8, delay: 0, emoji: "✿", color: "#7b90c8" },
  { left: "12%", top: "66%", size: 46, duration: 10, delay: 1, emoji: "❀", color: "#b08ac6" },
  { left: "20%", top: "32%", size: 60, duration: 9, delay: 2, emoji: "✾", color: "#e09ab3" },
  { left: "30%", top: "82%", size: 42, duration: 7, delay: 0.5, emoji: "❁", color: "#7b90c8" },
  { left: "40%", top: "16%", size: 50, duration: 8, delay: 1.5, emoji: "✿", color: "#b08ac6" },
  { left: "50%", top: "60%", size: 56, duration: 10, delay: 2.5, emoji: "❀", color: "#e09ab3" },
  { left: "60%", top: "24%", size: 46, duration: 8, delay: 1, emoji: "✾", color: "#7b90c8" },
  { left: "70%", top: "76%", size: 62, duration: 11, delay: 3, emoji: "❁", color: "#b08ac6" },
  { left: "80%", top: "34%", size: 44, duration: 7, delay: 2, emoji: "✿", color: "#e09ab3" },
  { left: "90%", top: "56%", size: 54, duration: 10, delay: 1.3, emoji: "❀", color: "#7b90c8" },
  { left: "94%", top: "16%", size: 36, duration: 8, delay: 0.8, emoji: "✦", color: "#f0b8d0" },
  { left: "8%", top: "86%", size: 34, duration: 9, delay: 2.2, emoji: "✦", color: "#d7a9ea" },
  { left: "48%", top: "8%", size: 30, duration: 6, delay: 1.7, emoji: "✧", color: "#f0b8d0" },
  { left: "76%", top: "10%", size: 28, duration: 6, delay: 2.8, emoji: "✧", color: "#d7a9ea" },
];

export default function FloatingFlowers() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9]">
      {FLOWERS.map((f, i) => (
        <span
          key={`${f.left}_${f.top}_${i}`}
          className="absolute select-none opacity-80 animate-floatFlower"
          style={{
            left: f.left,
            top: f.top,
            fontSize: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            color: f.color,
            textShadow: "0 1px 2px rgba(255,255,255,0.75), 0 0 8px rgba(255,255,255,0.35)",
            filter: "saturate(110%)",
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}

