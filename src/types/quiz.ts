/** Položka zoznamu testov kurzu (`GET /api/mobile/courses/[id]/tests`). */
export type TestSummary = {
  id: string;
  title: string;
  /** Minimálne % správnych odpovedí na úspešné absolvovanie. */
  passScore: number;
  questionCount: number;
};

export type CourseTestsResponse = { tests: TestSummary[] };

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  /** Index správnej odpovede v `options`. */
  correct: number;
};

/** Test s otázkami (`GET /api/mobile/tests/[id]`). */
export type QuizTest = {
  id: string;
  title: string;
  passScore: number;
  questions: QuizQuestion[];
};

/** Odpovede používateľa: id otázky → index zvolenej možnosti. */
export type QuizAnswers = Record<string, number>;

/** Výsledok počítaný serverom (`POST /api/mobile/tests/[id]/results`). */
export type SubmitResultResponse = {
  id: string;
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
};
