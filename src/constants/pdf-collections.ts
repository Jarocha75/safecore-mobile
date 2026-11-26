import { DOCUMENT_GROUPS } from "@/constants/documents";
import { LEGAL_NORM_GROUPS } from "@/constants/legislation";
import type { PdfCollection, PdfSource } from "@/types/pdf";

/**
 * Ako dlho platí dočasná kópia PDF z čítačky (v sekundách). Po uplynutí sa stiahne
 * z webu znova, aby sa zobrazili vymenené predpisy a tlačivá.
 */
export const PDF_CACHE_SECONDS = 24 * 60 * 60;

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
