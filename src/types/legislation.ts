import type { PdfSource } from "@/types/pdf";

/** Právny predpis v sekcii „Zákony a legislatíva“ (podľa webu safecore.sk/zakon). */
export type LegalNorm = PdfSource & {
  subtitle: string;
  description: string;
  year: string;
};

export type LegalNormGroup = {
  id: string;
  title: string;
  norms: LegalNorm[];
};
