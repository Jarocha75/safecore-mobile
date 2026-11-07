import type { CourseDetail } from "@/types/course";

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  "zbrojny-preukaz": {
    courseId: "zbrojny-preukaz",
    lawReference: "zákon č. 190/2003 Z.z. o zbraniach a strelive",
    webUrl: "https://www.safecore.sk/kurzy/z",
    subjects: [
      {
        letter: "A",
        title: "Zákon o zbraniach a strelive č. 190/2003 Z.z.",
        minutes: 119,
      },
      {
        letter: "B",
        title: "Trestný zákon, Trestný poriadok, Priestupkové a Správne právo",
        minutes: 85,
      },
      {
        letter: "C",
        title:
          "Základy konštrukcie a činnosti strelných zbraní, teória streľby",
        minutes: 33,
      },
      {
        letter: "D",
        title: "Prvá pomoc pri streľných poraneniach",
        minutes: 48,
      },
      {
        letter: "E",
        title: "Praktické a bezpečné používanie zbrane",
        minutes: 14,
      },
    ],
  },
};
