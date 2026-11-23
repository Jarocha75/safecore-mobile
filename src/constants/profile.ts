import { router } from "expo-router";

import { APP_VERSION } from "@/constants/about";
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
    id: "terms",
    label: "Podmienky používania",
    icon: "document-text-outline",
    onPress: () => router.push("/terms"),
  },
  {
    id: "about",
    label: APP_VERSION ? `O SafeCore (Verzia ${APP_VERSION})` : "O SafeCore",
    icon: "information-circle-outline",
    onPress: () => router.push("/about"),
  },
];
