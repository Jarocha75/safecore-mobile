import type { CourseDetail, DurationUnit } from "@/types/course";

/** Popisky jednotiek: skrátený pri predmete a súhrnný pod celkovým počtom. */
export const DURATION_LABELS: Record<
  DurationUnit,
  { short: string; total: string }
> = {
  minutes: { short: "min.", total: "minút celkom" },
  teachingHours: { short: "vyuč. hod.", total: "vyučovacích hodín celkom" },
};

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  "zbrojny-preukaz": {
    courseId: "zbrojny-preukaz",
    lawReference: "zákon č. 190/2003 Z.z. o zbraniach a strelive",
    webUrl: "https://www.safecore.sk/kurzy/z",
    durationUnit: "minutes",
    subjects: [
      {
        letter: "A",
        title: "Zákon o zbraniach a strelive č. 190/2003 Z.z.",
        amount: 119,
      },
      {
        letter: "B",
        title: "Trestný zákon, Trestný poriadok, Priestupkové a Správne právo",
        amount: 85,
      },
      {
        letter: "C",
        title:
          "Základy konštrukcie a činnosti strelných zbraní, teória streľby",
        amount: 33,
      },
      {
        letter: "D",
        title: "Prvá pomoc pri streľných poraneniach",
        amount: 48,
      },
      {
        letter: "E",
        title: "Praktické a bezpečné používanie zbrane",
        amount: 14,
      },
    ],
  },
  "preukaz-s": {
    courseId: "preukaz-s",
    lawReference: "§ 4 vyhlášky MV SR č. 634/2005 Z.z.",
    webUrl: "https://www.safecore.sk/kurzy/s",
    durationUnit: "teachingHours",
    note: "K tomuto kurzu bude postupne tvorený obsah k spracovaniu jednotlivých tém.",
    subjects: [
      {
        letter: "a",
        title:
          "Základy právneho poriadku Slovenskej republiky, Ústava Slovenskej republiky a právna úprava ľudských práv a slobôd",
        amount: 2,
      },
      {
        letter: "b",
        title:
          "Všeobecne záväzné právne predpisy týkajúce sa poskytovania služieb v oblasti súkromnej bezpečnosti",
        amount: 20,
      },
      { letter: "c", title: "Základy trestného práva", amount: 6 },
      { letter: "d", title: "Základy kriminalistiky", amount: 6 },
      { letter: "e", title: "Zákon o priestupkoch", amount: 3 },
      {
        letter: "f",
        title:
          "Zákon o Policajnom zbore, zákon o obecnej polícii, zákon o Vojenskej polícii a zákon o Slovenskej informačnej službe",
        amount: 6,
      },
      {
        letter: "g",
        title:
          "Teória taktiky a techniky vykonávania zásahov a riešenie modelových situácií",
        amount: 20,
      },
      { letter: "h", title: "Poskytovanie prvej pomoci", amount: 8 },
      { letter: "i", title: "Požiarna príprava", amount: 5 },
      {
        letter: "j",
        title:
          "Všeobecne záväzné právne predpisy týkajúce sa ochrany osobných údajov",
        amount: 2,
      },
    ],
  },
  "preukaz-p": {
    courseId: "preukaz-p",
    lawReference: "§ 5 vyhlášky MV SR č. 634/2005 Z.z.",
    webUrl: "https://www.safecore.sk/kurzy/p",
    durationUnit: "teachingHours",
    note: "K tomuto kurzu bude postupne tvorený obsah k spracovaniu jednotlivých tém.",
    subjects: [
      {
        letter: "a",
        title: "Základy právneho poriadku Slovenskej republiky",
        amount: 5,
      },
      {
        letter: "b",
        title:
          "Ústava Slovenskej republiky a právna úprava ľudských práv a slobôd",
        amount: 4,
      },
      {
        letter: "c",
        title:
          "Všeobecne záväzné právne predpisy týkajúce sa poskytovania služieb v oblasti súkromnej bezpečnosti",
        amount: 26,
      },
      { letter: "d", title: "Základy trestného práva", amount: 8 },
      {
        letter: "e",
        title: "Základy kriminalistiky a kriminológie",
        amount: 6,
      },
      {
        letter: "f",
        title: "Zákon o priestupkoch a správny poriadok",
        amount: 8,
      },
      {
        letter: "g",
        title:
          "Zákon o Policajnom zbore, zákon o obecnej polícii, zákon o Vojenskej polícii a zákon o Slovenskej informačnej službe",
        amount: 10,
      },
      {
        letter: "h",
        title:
          "Teória taktiky a techniky vykonávania zásahov a riešenie modelových situácií",
        amount: 15,
      },
      { letter: "i", title: "Poskytovanie prvej pomoci", amount: 8 },
      { letter: "j", title: "Požiarna príprava", amount: 5 },
      {
        letter: "k",
        title:
          "Všeobecne záväzné právne predpisy týkajúce sa ochrany osobných údajov",
        amount: 5,
      },
    ],
  },
};
