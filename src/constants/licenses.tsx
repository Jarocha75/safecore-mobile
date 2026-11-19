import { Palette } from "@/constants/palette";
import type { LicenseCardItem } from "@/types/license";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const LICENSES: LicenseCardItem[] = [
  {
    id: "zbrojny-preukaz",
    title: "Zbrojný preukaz",
    kind: "firearm",
    href: "/firearm-license",
    detailHref: "/license-detail/firearm",
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
    kind: "sbs",
    href: "/sbs-license",
    detailHref: "/license-detail/sbs",
    icon: <Ionicons name="id-card" size={24} color={Palette.primary} />,
  },
];
