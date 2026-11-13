/** Ako dlho (v dňoch) po poslednom overení na serveri sa dá appka používať offline. */
export const OFFLINE_ACCESS_DAYS = 7;

export const OFFLINE_ACCESS_MS = OFFLINE_ACCESS_DAYS * 24 * 60 * 60 * 1000;

export const OFFLINE_EXPIRED_MESSAGE = `Offline prístup vypršal (platí ${OFFLINE_ACCESS_DAYS} dní od posledného pripojenia). Pripoj sa k internetu a skús to znova.`;

/** Koľko hotových cvičných testov sa stiahne; offline sa z nich vyberá (nový test sa skladá na serveri). */
export const PRACTICE_EXAM_VARIANTS = 3;

/** Počet súbežných sťahovaní. */
export const DOWNLOAD_CONCURRENCY = 4;
