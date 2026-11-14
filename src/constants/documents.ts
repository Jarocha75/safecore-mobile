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
    items: [
      {
        id: "sbs-ziadost-s",
        title: "Žiadosť o vydanie preukazu odbornej spôsobilosti typu S",
        description: "Tlačivo žiadosti o vydanie preukazu odbornej spôsobilosti typu S.",
        pdf: "/dokumenty/tlaciva/Ziadost o vydanie preukazu odbornej sposobilosti typu S.pdf",
      },
      {
        id: "sbs-ziadost-p",
        title: "Žiadosť o vydanie preukazu odbornej spôsobilosti typu P",
        description: "Tlačivo žiadosti o vydanie preukazu odbornej spôsobilosti typu P.",
        pdf: "/dokumenty/tlaciva/Ziadost o vydanie preukazu odbornej sposobilosti typu P.pdf",
      },
      {
        id: "sbs-ziadost-strata",
        title: "Žiadosť o vydanie preukazu z dôvodu straty",
        description: "Žiadosť o vydanie nového preukazu odbornej spôsobilosti po jeho strate.",
        pdf: "/dokumenty/tlaciva/Ziadost o vydanie preukazu odbornej sposobilosti z dovodu straty.pdf",
      },
      {
        id: "sbs-ziadost-odcudzenie",
        title: "Žiadosť o vydanie preukazu z dôvodu odcudzenia",
        description: "Žiadosť o vydanie nového preukazu odbornej spôsobilosti po jeho odcudzení.",
        pdf: "/dokumenty/tlaciva/Ziadost o vydanie preukazu odbornej sposobilosti z dovodu odcudzenia.pdf",
      },
      {
        id: "sbs-cestne-vyhlasenie-strata",
        title: "Čestné vyhlásenie o strate preukazu",
        description: "Čestné vyhlásenie o strate preukazu odbornej spôsobilosti.",
        pdf: "/dokumenty/tlaciva/Cestne vyhlasenie o strate preukazu odbornej sposobilosti.pdf",
      },
      {
        id: "sbs-cestne-vyhlasenie-odcudzenie",
        title: "Čestné vyhlásenie o odcudzení preukazu",
        description: "Čestné vyhlásenie o odcudzení preukazu odbornej spôsobilosti.",
        pdf: "/dokumenty/tlaciva/Cestne vyhlasenie o odcudzeni preukazu odbornej sposobilosti.pdf",
      },
    ],
  },
];
