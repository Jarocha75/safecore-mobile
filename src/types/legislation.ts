/** Právny predpis v sekcii „Zákony a legislatíva“ (podľa webu safecore.sk/zakon). */
export type LegalNorm = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  /** Cesta k PDF na webe (začína `/dokumenty/`), alebo null, ak ešte nie je. */
  pdf: string | null;
};

export type LegalNormGroup = {
  id: string;
  title: string;
  norms: LegalNorm[];
};

/** Čo je stiahnuté na offline (ukladá sa v AsyncStorage). */
export type LegislationManifest = {
  /** `id` stiahnutých predpisov. */
  ids: string[];
  /** Čas posledného stiahnutia (ms od epochy). */
  savedAt: number;
};
