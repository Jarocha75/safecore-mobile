/** Odpoveď API uložená na zariadení pre offline režim. */
export type CachedResponse<T> = {
  data: T;
  /** Čas uloženia (ms od epochy). */
  savedAt: number;
};
