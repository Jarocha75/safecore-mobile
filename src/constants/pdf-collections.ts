import { DOCUMENT_GROUPS } from "@/constants/documents";
import { LEGAL_NORM_GROUPS } from "@/constants/legislation";
import type { PdfCollection, PdfSource } from "@/types/pdf";

/** Všetky PDF zbierky; z nich sa berie zoznam na sťahovanie aj vyhľadanie v čítačke. */
export const PDF_COLLECTIONS: Record<PdfCollection, () => PdfSource[]> = {
  legislation: () => LEGAL_NORM_GROUPS.flatMap((group) => group.norms),
  documents: () => DOCUMENT_GROUPS.flatMap((group) => group.items),
};

/**
 * Kde sa zbierka ukladá. Názvy `legislation` zostali kvôli už stiahnutým predpisom
 * v zariadeniach (zmena názvu by ich „stratila“).
 */
export const PDF_STORAGE: Record<
  PdfCollection,
  { manifestKey: string; directory: string }
> = {
  legislation: { manifestKey: "legislation_manifest", directory: "legislation" },
  documents: { manifestKey: "documents_manifest", directory: "documents" },
};
