import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Palette } from "@/constants/palette";
import type { Course } from "@/types/course";

const ICON_SIZE = 28;

export const COURSES: Course[] = [
  {
    id: "zbrojny-preukaz",
    icon: (
      <MaterialCommunityIcons
        name="pistol"
        size={ICON_SIZE}
        color={Palette.primary}
      />
    ),
    title: "Zbrojný preukaz",
    description: "Skupiny A, B, C, D, E – Testy a legislatíva",
  },
  {
    id: "sbs-s",
    icon: (
      <Ionicons name="lock-closed" size={ICON_SIZE} color={Palette.primary} />
    ),
    title: "Preukaz typu S",
    description: "Strážna služba a odborná príprava",
  },
  {
    id: "sbs-p",
    icon: <Ionicons name="business" size={ICON_SIZE} color={Palette.primary} />,
    title: "Preukaz typu P",
    description: "Fyzická ochrana a detektívna služba",
  },
];
