import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { AndroidImportance } from "expo-notifications";
import { Platform } from "react-native";

import { ApiPath } from "@/constants/api";
import { apiFetch } from "@/utils/api";

const ANDROID_CHANNEL_ID = "default";

/** Notifikácie sa zobrazia aj vtedy, keď je appka otvorená. */
export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

let pushQueue: Promise<unknown> = Promise.resolve();

/**
 * Registráciu a vypnutie pushu spúšťa po jednom, v poradí volania, aby sa pri
 * rýchlom odhlásení/prihlásení neprebehli. Úloha nesmie hádzať chybu.
 */
export function runPushTask(task: () => Promise<void>) {
  const next = pushQueue.then(task);
  pushQueue = next.catch(() => {});
  return next;
}

/**
 * Vypne push priamo v zariadení – nezávisle od nášho servera, takže na odhlásený
 * telefón nechodia notifikácie, ani keď sa token na serveri nepodarilo zmazať.
 * Na Androide potrebuje sieť; ak zlyhá, skúsi sa pri ďalšom štarte bez prihlásenia.
 */
export function disableDevicePush() {
  return runPushTask(async () => {
    try {
      // Inak by expo-notifications pri ďalšom štarte zariadenie znova zaregistrovalo.
      await Notifications.setAutoServerRegistrationEnabledAsync(false);
    } catch {
      // nedostupné na tejto platforme
    }
    try {
      await Notifications.unregisterForNotificationsAsync();
    } catch {
      // offline alebo nedostupné na tejto platforme
    }
  });
}

/**
 * Vypýta povolenie a vráti Expo push token, alebo null, ak sa nedá
 * (simulátor, zamietnuté povolenie, chýba EAS projekt / iOS entitlement).
 * Nikdy nehádže chybu – push je doplnok, nesmie zhodiť appku.
 */
export async function getExpoPushToken(): Promise<string | null> {
  try {
    // Push token na simulátore nevznikne.
    if (!Device.isDevice) return null;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;
    if (!projectId) return null;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
        name: "SafeCore",
        importance: AndroidImportance.DEFAULT,
      });
    }

    let { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      ({ status } = await Notifications.requestPermissionsAsync());
    }
    if (status !== "granted") return null;

    const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
    return data;
  } catch {
    return null;
  }
}

/** Token zaregistrovaný v tejto relácii – treba ho pri odhlásení odpojiť od účtu. */
let registeredPushToken: string | null = null;

/** Pošle token na server, aby naň mohol posielať notifikácie k prihlásenému účtu. */
export async function registerPushToken(
  pushToken: string,
  sessionToken: string,
) {
  await apiFetch<{ ok: true }>(ApiPath.pushToken, {
    method: "POST",
    body: { token: pushToken, platform: Platform.OS },
    token: sessionToken,
  });
  registeredPushToken = pushToken;
}

/** Pri odhlásení odpojí zariadenie od účtu (best effort). */
export async function unregisterPushToken(sessionToken: string) {
  const pushToken = registeredPushToken;
  registeredPushToken = null;
  if (!pushToken) return;
  try {
    await apiFetch<{ ok: true }>(ApiPath.pushTokenRemove, {
      method: "POST",
      body: { token: pushToken },
      token: sessionToken,
    });
  } catch {
    // offline alebo vypršaná relácia – doručovanie zastaví disableDevicePush()
  }
}
