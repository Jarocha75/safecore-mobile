import { router } from "expo-router";

import type { ProfileMenuItemData } from "@/types/profile";

export const SETTINGS_MENU: ProfileMenuItemData[] = [
  {
    id: "notifications",
    label: "Notifikácie",
    icon: "notifications-outline",
    onPress: () => router.push("/notifications"),
  },
];

export const ABOUT_MENU: ProfileMenuItemData[] = [
  {
    id: "about",
    label: "O SafeCore (Verzia 1.0.0)",
    icon: "information-circle-outline",
  },
];
