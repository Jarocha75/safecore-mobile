import type { ReactNode } from "react";

/** Položka zoznamu kurzov (karta na obrazovke Testy). */
export type Course = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
};

/** Karta v sekcii „Kurzy a príprava“ (podľa webu safecore.sk/kurzy). */
export type PrepCourse = {
  id: string;
  /** Písmeno/znak v kruhu pri názve. */
  badge: string;
  title: string;
  /** Zvýraznený podnadpis (právny základ). */
  subtitle: string;
  /** Voliteľný popis pod podnadpisom. */
  description?: string;
};
