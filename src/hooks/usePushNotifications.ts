import * as Notifications from "expo-notifications";
import { router, type Href } from "expo-router";
import { useEffect, useRef } from "react";

import { useSession } from "@/context/SessionContext";
import {
  configureNotificationHandler,
  getExpoPushToken,
  registerPushToken,
  unregisterPushToken,
} from "@/utils/push";

configureNotificationHandler();

/** Po prihlásení zaregistruje push token zariadenia a obsluhuje ťuknutie na notifikáciu. */
export function usePushNotifications() {
  const { session } = useSession();
  const sessionToken = session?.token;

  useEffect(() => {
    if (!sessionToken) return;
    let cancelled = false;

    (async () => {
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
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionToken]);

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
