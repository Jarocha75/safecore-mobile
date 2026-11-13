import { ApiPath } from "@/constants/api";
import { DOWNLOAD_CONCURRENCY, PRACTICE_EXAM_VARIANTS } from "@/constants/offline";
import type { CourseType } from "@/types/auth";
import type { OfflineManifest } from "@/types/cache";
import type { ExamSet, ExamSetsResponse } from "@/types/exam";
import type { PracticeExam } from "@/types/practice-exam";
import type { CourseTestsResponse, QuizTest } from "@/types/quiz";
import { apiFetch } from "@/utils/api";
import { loadCached, saveCached } from "@/utils/api-cache";

// Kľúče v cache, ktoré nie sú API cesty (cache ich ukladá rovnako ako odpovede).
export const manifestKey = (courseId: string) => `/offline/${courseId}`;
const practiceVariantsKey = (courseId: string) =>
  `/offline/${courseId}/practice-exams`;

export async function loadPracticeVariants(userId: string, courseId: string) {
  const cached = await loadCached<PracticeExam[]>(
    userId,
    practiceVariantsKey(courseId),
  );
  return cached?.data ?? [];
}

/** Spustí úlohy najviac `limit` naraz; prvá chyba zastaví ďalšie spúšťanie. */
async function runPool(jobs: (() => Promise<void>)[], limit: number) {
  let next = 0;
  let failed = false;
  const worker = async () => {
    while (!failed && next < jobs.length) {
      const job = jobs[next++];
      try {
        await job();
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, worker));
}

type DownloadArgs = {
  token: string;
  userId: string;
  courseId: string;
  type: CourseType;
  /** Volá sa po každej dokončenej položke; `total` je známy po stiahnutí zoznamov. */
  onProgress: (done: number, total: number) => void;
};

const STORAGE_ERROR = "Nepodarilo sa uložiť dáta do zariadenia (možno je plné úložisko).";

async function store<T>(userId: string, path: string, data: T) {
  if (!(await saveCached(userId, path, data))) throw new Error(STORAGE_ERROR);
}

/** Stiahne zoznamy a obsah testov kurzu do cache, aby fungovali offline. Pri chybe vyhodí výnimku. */
export async function downloadCourse({
  token,
  userId,
  courseId,
  type,
  onProgress,
}: DownloadArgs): Promise<OfflineManifest> {
  const testsPath = ApiPath.courseTests(courseId);
  const tests = await apiFetch<CourseTestsResponse>(testsPath, { token });
  await store(userId, testsPath, tests);

  let sets: ExamSetsResponse["sets"] = [];
  if (type === "Z") {
    const setsPath = ApiPath.examSets(courseId);
    const response = await apiFetch<ExamSetsResponse>(setsPath, { token });
    await store(userId, setsPath, response);
    sets = response.sets;
  }

  const practiceCount =
    type === "S" || type === "P" ? PRACTICE_EXAM_VARIANTS : 0;
  const variants: PracticeExam[] = [];

  const jobs: (() => Promise<void>)[] = [
    ...tests.tests.map((t) => async () => {
      const path = ApiPath.test(t.id);
      await store(userId, path, await apiFetch<QuizTest>(path, { token }));
    }),
    ...sets.map((s) => async () => {
      const path = ApiPath.examSet(courseId, s.id);
      await store(userId, path, await apiFetch<ExamSet>(path, { token }));
    }),
    ...Array.from({ length: practiceCount }, () => async () => {
      variants.push(
        await apiFetch<PracticeExam>(ApiPath.practiceExam(courseId), { token }),
      );
    }),
  ];

  const total = jobs.length;
  let done = 0;
  onProgress(0, total);
  await runPool(
    jobs.map((job) => async () => {
      await job();
      onProgress(++done, total);
    }),
    DOWNLOAD_CONCURRENCY,
  );

  if (practiceCount > 0) {
    await store(userId, practiceVariantsKey(courseId), variants);
  }

  const manifest: OfflineManifest = {
    tests: tests.tests.length,
    examSets: sets.length,
    practiceExams: variants.length,
  };
  await store(userId, manifestKey(courseId), manifest);
  return manifest;
}
