import type { PrepCourse } from "@/types/course";

export const PREP_COURSES: PrepCourse[] = [
  {
    id: "zbrojny-preukaz",
    badge: "Z",
    title: "Príprava na zbrojný preukaz",
    subtitle:
      "odborná príprava na získanie zbrojného preukazu podľa zákona č. 190/2003 Z.z. o zbraniach a strelive",
  },
  {
    id: "preukaz-s",
    badge: "S",
    title: "Preukaz typu S",
    subtitle: "pre osoby poverené výkonom fyzickej ochrany a pátrania",
    description:
      "Odborná príprava na skúšku odbornej spôsobilosti podľa § 4 vyhlášky MV SR č. 634/2005 Z.z.",
  },
  {
    id: "preukaz-p",
    badge: "P",
    title: "Preukaz typu P",
    subtitle:
      "pre osoby poverené výkonom fyzickej ochrany, pátrania, odbornej prípravy a poradenstva a pre prevádzkovateľov",
    description:
      "Odborná príprava na skúšku odbornej spôsobilosti podľa § 5 vyhlášky MV SR č. 634/2005 Z.z.",
  },
];
