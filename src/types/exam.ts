/** Položka zoznamu sád otázok na skúšku (`GET /api/mobile/courses/[id]/exam-sets`). */
export type ExamSetSummary = {
  id: string;
  title: string;
  questionCount: number;
};

export type ExamSetsResponse = { sets: ExamSetSummary[] };

/** Otázka s textovou odpoveďou (bez možností a bodovania). */
export type ExamQuestion = {
  id: string;
  /** Napr. „Časť A“. */
  part: string;
  /** Názov predmetu / zákona, ku ktorému otázka patrí. */
  subject: string;
  question: string;
  answer: string;
};

/** Sada otázok (`GET /api/mobile/courses/[id]/exam-sets/[setId]`). */
export type ExamSet = {
  id: string;
  title: string;
  questions: ExamQuestion[];
};
