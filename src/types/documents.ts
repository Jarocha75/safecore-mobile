import type { PdfSource } from "@/types/pdf";

/** Dokument alebo tlačivo na stiahnutie (PDF na webe v `public/dokumenty/`). */
export type DocumentItem = PdfSource & {
  description: string;
};

export type DocumentGroup = {
  id: string;
  title: string;
  items: DocumentItem[];
};
