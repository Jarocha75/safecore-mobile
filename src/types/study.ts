/** Rozpracované štúdium zobrazené v karte „Pokračuj v štúdiu“. */
export type StudyProgress = {
  courseTitle: string;
  testTitle: string;
  /** Číslo poslednej otázky (od 1). */
  questionNumber: number;
  totalQuestions: number;
};
