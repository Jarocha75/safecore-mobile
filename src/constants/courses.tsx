import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";

import { Palette } from "@/constants/palette";
import type { CourseType } from "@/types/auth";

const ICON_SIZE = 28;

/** Ikona a popis karty kurzu podľa typu kurzu z API (názov kurzu prichádza zo servera). */
export const COURSE_TYPE_META: Record<
  CourseType,
  { icon: ReactNode; description: string }
> = {
  Z: {
    icon: (
      <MaterialCommunityIcons
        name="pistol"
        size={ICON_SIZE}
        color={Palette.primary}
      />
    ),
    description: "Simulácia otázok pred skúškou – si pripravený?",
  },
  S: {
    icon: (
      <Ionicons name="lock-closed" size={ICON_SIZE} color={Palette.primary} />
    ),
    description: "Strážna služba a odborná príprava",
  },
  P: {
    icon: <Ionicons name="business" size={ICON_SIZE} color={Palette.primary} />,
    description: "Fyzická ochrana a detektívna služba",
  },
};
