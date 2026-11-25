import * as Notifications from "expo-notifications";
import { router, type Href } from "expo-router";
import { useEffect, useRef } from "react";

import { useSession } from "@/context/SessionContext";
import {
  configureNotificationHandler,
  disableDevicePush,
  getExpoPushToken,
  registerPushToken,
  runPushTask,
  unregisterPushToken,
} from "@/utils/push";

configureNotificationHandler();

/**
 * Po prihlásení zaregistruje push token zariadenia, bez prihlásenia push v zariadení
 * vypne a obsluhuje ťuknutie na notifikáciu.
 */
export function usePushNotifications() {
  const { session, isLoading } = useSession();
  const sessionToken = session?.token;

  useEffect(() => {
    // Kým sa načítava uložená relácia, nevieme, či je niekto prihlásený.
    if (isLoading) return;
    if (!sessionToken) {
      // Ručné odhlásenie, vypršaná relácia aj štart appky bez prihlásenia.
      void disableDevicePush();
      return;
    }
    let cancelled = false;

    void runPushTask(async () => {
      if (cancelled) return;
      const pushToken = await getExpoPushToken();
      if (!pushToken || cancelled) return;
      try {
        await registerPushToken(pushToken, sessionToken);
      } catch {
        // server nedostupný – skúsi sa pri ďalšom štarte appky
        return;
      }
      // Odhlásenie prebehlo počas registrácie → token hneď odpoj od účtu.
      if (cancelled) void unregisterPushToken(sessionToken);
    });

    return () => {
      cancelled = true;
    };
  }, [sessionToken, isLoading]);

  // Ťuknutie na notifikáciu otvorí obrazovku z `data.url` (napr. "/license"),
  // aj keď appka bola zatvorená.
  const response = Notifications.useLastNotificationResponse();
  const handledRef = useRef<string | null>(null);
  useEffect(() => {
    if (!sessionToken || !response) return;
    // Hook vracia poslednú odpoveď stále – každú spracuj len raz.
    const responseKey = `${response.notification.request.identifier}:${response.notification.date}`;
    if (handledRef.current === responseKey) return;
    handledRef.current = responseKey;
    if (response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) {
      return;
    }
    const url = response.notification.request.content.data?.url;
    if (typeof url === "string" && url.startsWith("/")) {
      router.push(url as Href);
    }
  }, [response, sessionToken]);
}
