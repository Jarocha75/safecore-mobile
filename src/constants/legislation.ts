import type { LegalNormGroup } from "@/types/legislation";

/** Základná adresa webu, z ktorého sa otvárajú PDF predpisov. */
export const WEB_URL = "https://www.safecore.sk";

/** Obsah podľa `data/zakon.ts` vo webovom repe – pri zmene na webe upraviť aj tu. */
export const LEGAL_NORM_GROUPS: LegalNormGroup[] = [
  {
    id: "zakladne",
    title: "Základné právne predpisy",
    norms: [
      {
        id: "zakon-473-2005",
        title: "Zákon č. 473/2005 Z.z.",
        subtitle: "Zákon o súkromnej bezpečnosti",
        description:
          "Upravuje podmienky prevádzkovania bezpečnostných služieb, vydávanie licencií a preukazov odbornej spôsobilosti.",
        year: "2005",
        pdf: "/dokumenty/zakon-473-2005.pdf",
      },
      {
        id: "zakon-190-2003",
        title: "Zákon č. 190/2003 Z.z.",
        subtitle: "Zákon o zbraniach a strelive",
        description:
          "Upravuje nadobúdanie, držanie, nosenie a používanie zbraní a streliva. Kľúčový pre výkon bezpečnostných služieb.",
        year: "2003",
        pdf: "/dokumenty/Zákon 190-2003 o zbraniach a strelive.pdf",
      },
      {
        id: "ustava-sr",
        title: "Ústava Slovenskej republiky",
        subtitle: "Základný zákon štátu",
        description:
          "Vymedzuje štátne zriadenie, základné práva a slobody občanov a tvorí ústavný základ ochrany práv.",
        year: "1992",
        pdf: "/dokumenty/Ústava SR.pdf",
      },
    ],
  },
  {
    id: "dalsie",
    title: "Ďalšie právne normy",
    norms: [
      {
        id: "vyhlaska-634-2005",
        title: "Vyhláška MV SR č. 634/2005 Z.z.",
        subtitle: "Vykonávacia vyhláška k zákonu o súkromnej bezpečnosti",
        description:
          "Vykonáva niektoré ustanovenia zákona o poskytovaní služieb v oblasti súkromnej bezpečnosti.",
        year: "2005",
        pdf: "/dokumenty/vyhlaska-634-2005.pdf",
      },
      {
        id: "vyhlaska-555-2003",
        title: "Vyhláška MV SR č. 555/2003 Z.z.",
        subtitle: "Vyhláška k zákonu o zbraniach a strelive",
        description:
          "Vykonáva niektoré ustanovenia zákona o zbraniach a strelive.",
        year: "2003",
        pdf: "/dokumenty/Vyhláška 555-2003.pdf",
      },
    ],
  },
];
