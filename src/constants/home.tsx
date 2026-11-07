import { Ionicons } from "@expo/vector-icons";

import { Palette } from "@/constants/palette";
import type { HomeSection } from "@/types/course";
import type { StudyProgress } from "@/types/study";

const ICON_SIZE = 28;

/** Zatiaľ ukážkové dáta – neskôr z API / lokálneho úložiska. */
export const LAST_STUDY: StudyProgress = {
  courseTitle: "Zbrojný preukaz",
  testTitle: "Test 3 – Zákon o zbraniach a strelive",
  questionNumber: 12,
  totalQuestions: 30,
};

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "kurzy",
    icon: <Ionicons name="school" size={ICON_SIZE} color={Palette.primary} />,
    title: "Kurzy a príprava",
    href: "/courses",
    description: "Zbrojný preukaz, preukaz typu S a P",
  },
  {
    id: "legislativa",
    icon: <Ionicons name="library" size={ICON_SIZE} color={Palette.primary} />,
    title: "Zákony a legislatíva",
    description: "Aktuálne znenia zákonov a predpisov",
  },
  {
    id: "dokumenty",
    icon: (
      <Ionicons name="document-text" size={ICON_SIZE} color={Palette.primary} />
    ),
    title: "Dokumenty a tlačivá",
    description: "Tlačivá a podklady na stiahnutie",
  },
];
