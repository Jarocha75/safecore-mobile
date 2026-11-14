import type { DocumentGroup } from "@/types/documents";

/**
 * Dokumenty a tlačivá. Súbor sa nahrá na web do `public/dokumenty/` a tu pribudne položka:
 *
 *   {
 *     id: "zp-ziadost-o-vydanie",              // unikátne, bez medzier
 *     title: "Žiadosť o vydanie zbrojného preukazu",
 *     description: "Krátky popis, na čo tlačivo slúži.",
 *     pdf: "/dokumenty/tlaciva/zbrojny-preukaz/ziadost.pdf",
 *   }
 *
 * Cesty s medzerami a diakritikou sú v poriadku. Appka ich zakóduje sama.
 */
export const DOCUMENT_GROUPS: DocumentGroup[] = [
  {
    id: "zbrojny-preukaz",
    title: "Tlačivá – zbrojný preukaz",
    items: [],
  },
  {
    id: "sbs",
    title: "Tlačivá – SBS",
    items: [],
  },
];
