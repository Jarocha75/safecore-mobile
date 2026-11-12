import type { QuizAnswers } from "@/types/quiz";

/** Rozpracované štúdium zobrazené v karte „Pokračuj v štúdiu“. */
export type StudyProgress = {
  courseTitle: string;
  testTitle: string;
  /** Číslo poslednej otázky (od 1). */
  questionNumber: number;
  totalQuestions: number;
};

/** Rozpracovaný pokus o test uložený v zariadení (na obnovenie presne tam, kde používateľ skončil). */
export type SavedStudy = StudyProgress & {
  testId: string;
  courseId?: string;
  /** Id otázok v poradí, v akom boli zobrazené. */
  order: string[];
  answers: QuizAnswers;
  /** Index aktuálnej otázky (od 0). */
  index: number;
};
