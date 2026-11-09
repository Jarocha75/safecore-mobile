import type { QuizAnswers, QuizQuestion } from "@/types/quiz";

/** Slovenské skloňovanie: 1 otázka, 2–4 otázky, 5+ otázok. */
export function questionCountLabel(count: number): string {
  if (count === 1) return "1 otázka";
  if (count >= 2 && count <= 4) return `${count} otázky`;
  return `${count} otázok`;
}

/** Fisher–Yates; vracia novú kópiu (poradie otázok sa pri každom pokuse mení ako na webe). */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function countCorrect(
  questions: QuizQuestion[],
  answers: QuizAnswers,
): number {
  return questions.filter((q) => answers[q.id] === q.correct).length;
}

/** Písmeno možnosti: 0 → A, 1 → B, … */
export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}
