import * as Notifications from "expo-notifications";
import { router, type Href } from "expo-router";
import { useEffect } from "react";

import { useSession } from "@/context/SessionContext";
import {
  configureNotificationHandler,
  getExpoPushToken,
  registerPushToken,
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
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionToken]);

  // Ťuknutie na notifikáciu otvorí obrazovku z `data.url` (napr. "/license"),
  // aj keď appka bola zatvorená.
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (!sessionToken || !response) return;
    if (response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) {
      return;
    }
    const url = response.notification.request.content.data?.url;
    if (typeof url === "string" && url.startsWith("/")) {
      router.push(url as Href);
    }
  }, [response, sessionToken]);
}
