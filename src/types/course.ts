import type { ReactNode } from "react";

/**
 * Položka zoznamu kurzov (karta na obrazovke Testy).
 * Pri kurzoch Z, S a P sa `id` musí zhodovať s `PrepCourse.id` a kľúčom v `COURSE_DETAILS`.
 */
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

/** Karta na Home, ktorá môže viesť na vlastnú obrazovku. */
export type HomeSection = Course & {
  href?: "/courses";
};

/** Jednotka trvania predmetov v osnove kurzu. */
export type DurationUnit = "minutes" | "teachingHours";

/** Predmet v osnove odbornej prípravy. */
export type CourseSubject = {
  letter: string;
  title: string;
  /** Trvanie v jednotkách kurzu (minúty alebo vyučovacie hodiny). */
  amount: number;
};

/** Obsah detailu kurzu (osnova, právny základ). */
export type CourseDetail = {
  /** Zhoduje sa s `PrepCourse.id`. */
  courseId: string;
  lawReference: string;
  /** Stránka kurzu na webe, kde prebieha nákup. */
  webUrl: string;
  durationUnit: DurationUnit;
  /** Voliteľná poznámka pod osnovou. */
  note?: string;
  subjects: CourseSubject[];
};
