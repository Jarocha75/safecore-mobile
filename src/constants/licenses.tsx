import { Palette } from "@/constants/palette";
import type { LicenseCardItem } from "@/types/license";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const LICENSES: LicenseCardItem[] = [
  {
    id: "zbrojny-preukaz",
    title: "Zbrojný preukaz",
    href: "/firearm-license",
    icon: (
      <MaterialCommunityIcons
        name="pistol"
        size={24}
        color={Palette.primary}
      />
    ),
  },
  {
    id: "preukaz-sbs",
    title: "Preukaz SBS",
    href: "/sbs-license",
    icon: <Ionicons name="id-card" size={24} color={Palette.primary} />,
  },
];
