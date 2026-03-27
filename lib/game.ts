export type GameSection = "crossword" | "chat-analytics" | "report-card" | "love-letter";

export const GAME_SECTIONS: GameSection[] = [
  "crossword",
  "chat-analytics",
  "report-card",
  "love-letter",
];

export const COMPLETION_REQUIRED: GameSection[] = [
  "crossword",
  "chat-analytics",
  "report-card",
];

export function getUnlockOrderIndex(section: GameSection): number {
  return GAME_SECTIONS.indexOf(section);
}

export function isSectionUnlocked(completed: Set<GameSection>, section: GameSection) {
  const idx = getUnlockOrderIndex(section);
  if (idx <= 0) return true;
  const previous = GAME_SECTIONS[idx - 1];
  return completed.has(previous);
}

