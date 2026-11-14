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
    items: [
      {
        id: "zp-ziadost-zbrojny-preukaz",
        title: "Žiadosť o vydanie zbrojného preukazu",
        description: "Tlačivo žiadosti o vydanie zbrojného preukazu.",
        pdf: "/dokumenty/tlaciva/ZP/1. Ziadost_o_vydanie_zbrojneho_preukazu.pdf",
      },
      {
        id: "zp-zaevidovanie-zbrane",
        title: "Žiadosť o zaevidovanie zbrane a vydanie preukazu zbrane",
        description: "Žiadosť o zaevidovanie zbrane a vydanie preukazu zbrane.",
        pdf: "/dokumenty/tlaciva/ZP/10. Ziadost_o_zaevidovanie_zbrane_a_vydanie_preukazu_zbrane.pdf",
      },
      {
        id: "zp-zbrojny-sprievodny-list",
        title: "Žiadosť o vydanie zbrojného sprievodného listu",
        description: "Tlačivo žiadosti o vydanie zbrojného sprievodného listu.",
        pdf: "/dokumenty/tlaciva/ZP/11. Ziadost_o_vydanie_zbrojneho_sprievodneho_listu.pdf",
      },
      {
        id: "zp-nakupne-povolenie-ab",
        title: "Žiadosť o vydanie nákupného povolenia (kategória A alebo B)",
        description: "Žiadosť o vydanie nákupného povolenia na zbrane kategórie A alebo B.",
        pdf: "/dokumenty/tlaciva/ZP/13. Ziadost_o_vydanie_nakupneho_povolenia_ na zbrane_ kategorie_A_aleboB_ZP.pdf",
      },
      {
        id: "zp-povolenie-kategoria-d",
        title: "Žiadosť o udelenie povolenia na zbraň (kategória D)",
        description: "Žiadosť o udelenie povolenia na zbraň kategórie D.",
        pdf: "/dokumenty/tlaciva/ZP/17. Ziadost_o udelenie_Povolenia_na zbran-kategorie_D.pdf",
      },
      {
        id: "zp-prevod-zbrane-c",
        title: "Ohlásenie prevodu zbrane (kategória C)",
        description: "Tlačivo na ohlásenie prevodu zbrane kategórie C.",
        pdf: "/dokumenty/tlaciva/ZP/18. Ohlasenie_prevodu_zbrane_kategorie_C.pdf",
      },
      {
        id: "zp-potvrdenie-statna-sluzba",
        title: "Potvrdenie o bezúhonnosti, spoľahlivosti a spôsobilosti (štátna služba)",
        description: "Potvrdenie o bezúhonnosti, spoľahlivosti, zdravotnej a psychickej spôsobilosti pre štátnu službu.",
        pdf: "/dokumenty/tlaciva/ZP/D_Potvrdenie o bezuhonnosti_spolahlivosti_zdravotnej sposobilosti_psychickej sposobilosti_statna sluzba.pdf",
      },
    ],
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
