/** Zbierky PDF, ktoré sa dajú stiahnuť na offline a otvoriť v čítačke. */
export type PdfCollection = "legislation" | "documents";

/** Minimum, čo potrebuje čítačka a sťahovanie: názov a cesta k PDF na webe. */
export type PdfSource = {
  id: string;
  title: string;
  /** Cesta k PDF na webe (začína `/dokumenty/`), alebo null, ak ešte nie je. */
  pdf: string | null;
};

/** Čo je stiahnuté na offline (ukladá sa v AsyncStorage). */
export type PdfManifest = {
  /** `id` stiahnutých PDF. */
  ids: string[];
  /** Čas posledného stiahnutia (ms od epochy). */
  savedAt: number;
};
