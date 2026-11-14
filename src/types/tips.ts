import type { ReactNode } from "react";

/** Blok textu v rade: odsek alebo odrážkový zoznam. */
export type TipBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** Časť rady: karta v téme a samostatná podstránka s textom. */
export type TipSection = {
  id: string;
  title: string;
  /** Krátky popis na karte sekcie. */
  description: string;
  blocks: TipBlock[];
};

/** Téma v sekcii Rady a tipy (karta + podstránka so sekciami). */
export type TipTopic = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  /** Prázdne = obsah sa pripravuje (karta sa zobrazí, ale nedá sa otvoriť). */
  sections: TipSection[];
};
