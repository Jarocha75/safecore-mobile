import type { ReactNode } from "react";

/** Položka zoznamu kurzov (karta na obrazovke Testy). */
export type Course = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
};
