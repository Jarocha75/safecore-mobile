import type { PracticeExamQuestion } from "@/types/practice-exam";
import type { QuizAnswers } from "@/types/quiz";

export function earnedPoints(
  questions: PracticeExamQuestion[],
  answers: QuizAnswers,
): number {
  return questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.correct ? q.points : 0),
    0,
  );
}

/** Zostávajúci čas ako mm:ss. */
export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
