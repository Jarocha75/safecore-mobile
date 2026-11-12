import { Ionicons } from "@expo/vector-icons";

import { Palette } from "@/constants/palette";
import type { HomeSection } from "@/types/course";

const ICON_SIZE = 28;

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
  {
    id: "rady-tipy",
    icon: <Ionicons name="bulb" size={ICON_SIZE} color={Palette.primary} />,
    title: "Rady a tipy",
    description: "Ako sa pripraviť na skúšku a čo sa oplatí vedieť",
  },
];
