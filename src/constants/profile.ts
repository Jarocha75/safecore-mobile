import type { ProfileMenuItemData, ProfileUser } from "@/types/profile";

/** Ukážkové údaje. Po pripojení API sa nahradia dátami prihláseného používateľa. */
export const PROFILE_USER: ProfileUser = {
  name: "Ján Novák",
  email: "jan.novak@example.com",
  membership: "Pro členstvo (Aktívne)",
};

export const SETTINGS_MENU: ProfileMenuItemData[] = [
  { id: "notifications", label: "Notifikácie", icon: "notifications-outline" },
  {
    id: "subscription",
    label: "Predplatné a platby",
    icon: "shield-checkmark-outline",
  },
  { id: "appearance", label: "Vzhľad (Tmavý režim)", icon: "moon-outline" },
];

export const ABOUT_MENU: ProfileMenuItemData[] = [
  {
    id: "terms",
    label: "Podmienky používania",
    icon: "document-text-outline",
  },
  {
    id: "about",
    label: "O SafeCore (Verzia 1.0.0)",
    icon: "information-circle-outline",
  },
];
