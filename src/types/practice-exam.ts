import type { QuizQuestion } from "@/types/quiz";

/** Otázka cvičného testu; `points` závisí od skupiny otázok. */
export type PracticeExamQuestion = QuizQuestion & { points: number };

/** Cvičný test zložený serverom (`GET /api/mobile/courses/[id]/practice-exam`). */
export type PracticeExam = {
  title: string;
  durationMinutes: number;
  maxPoints: number;
  passPoints: number;
  questions: PracticeExamQuestion[];
};
