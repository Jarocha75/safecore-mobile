import * as Notifications from "expo-notifications";
import { AndroidImportance } from "expo-notifications";
import { Platform } from "react-native";

import { ANDROID_CHANNEL_ID } from "@/constants/notification-channel";

export async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: "SafeCore",
    importance: AndroidImportance.DEFAULT,
  });
}

export async function hasNotificationPermission() {
  try {
    return (await Notifications.getPermissionsAsync()).status === "granted";
  } catch {
    return false;
  }
}

/** Vypýta povolenie, ak ho appka ešte nemá. */
export async function requestNotificationPermission() {
  try {
    // Android 13+ zobrazí dialóg až vtedy, keď existuje kanál.
    await ensureAndroidChannel();
    if (await hasNotificationPermission()) return true;
    return (await Notifications.requestPermissionsAsync()).status === "granted";
  } catch {
    return false;
  }
}
