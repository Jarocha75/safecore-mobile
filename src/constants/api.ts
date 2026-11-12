/**
 * Adresa webového API (Next.js). Nastavuje sa v `.env.local` ako EXPO_PUBLIC_API_URL,
 * napr. http://192.168.1.54:3000 pre lokálny web (telefón nevidí `localhost` počítača).
 * Premenná sa musí čítať statickým zápisom, inak ju Expo nenahradí.
 */
export const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const API_TIMEOUT_MS = 15_000;

export const ApiPath = {
  login: "/api/mobile/login",
  me: "/api/mobile/me",
  /** Verejný endpoint webu – pošle e-mail s odkazom na obnovenie hesla (heslo sa mení na webe). */
  forgotPassword: "/api/forgot-password",
  courseTests: (courseId: string) =>
    `/api/mobile/courses/${encodeURIComponent(courseId)}/tests`,
  /** Každé volanie zloží nový cvičný test (kurz S). */
  practiceExam: (courseId: string) =>
    `/api/mobile/courses/${encodeURIComponent(courseId)}/practice-exam`,
  examSets: (courseId: string) =>
    `/api/mobile/courses/${encodeURIComponent(courseId)}/exam-sets`,
  examSet: (courseId: string, setId: string) =>
    `/api/mobile/courses/${encodeURIComponent(courseId)}/exam-sets/${encodeURIComponent(setId)}`,
  test: (testId: string) => `/api/mobile/tests/${encodeURIComponent(testId)}`,
  testResults: (testId: string) =>
    `/api/mobile/tests/${encodeURIComponent(testId)}/results`,
} as const;
