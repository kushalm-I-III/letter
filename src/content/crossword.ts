export type CrosswordEntry = {
  answer: string;
  clue: string;
};

export const CROSSWORD_ENTRIES: CrosswordEntry[] = [
  { answer: "PIGGY", clue: "What are you saved as on Kush's phone?" },
  { answer: "CHUBBY", clue: '"Babe, I look too ___"' },
  { answer: "ASHTON", clue: "My third-wheel / wingman" },
  { answer: "LADYBOY", clue: "Your key highlight on the Bangkok trip" },
  { answer: "SIDECHICKS", clue: "Kush claims to have a lot of these" },
  { answer: "RANT", clue: '"whining noises"' },
  { answer: "KANNUR", clue: "The trip we both agree was our best one, yet" },
  { answer: "BOOBRANI", clue: '"The queen of…"' },
  { answer: "KOPI", clue: "The Singapore coffee we fell in love with" },
  {
    answer: "WEARETHEPEOPLE",
    clue: 'Finish our inside joke: "Che chi be leaving now…"',
  },
  { answer: "WEEKENDS", clue: '"Only on the ___ babe"' },
];

export function normalizeAnswer(s: string) {
  return s.toUpperCase().replace(/[^A-Z]/g, "");
}

