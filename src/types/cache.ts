/** Odpoveď API uložená na zariadení pre offline režim. */
export type CachedResponse<T> = {
  data: T;
  /** Čas uloženia (ms od epochy). */
  savedAt: number;
};

/** Čo sa stiahlo pre kurz cez „Stiahnuť na offline“. */
export type OfflineManifest = {
  tests: number;
  examSets: number;
  practiceExams: number;
};
