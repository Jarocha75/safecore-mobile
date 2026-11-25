import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

import { useSession } from "@/context/SessionContext";
import type { StudyReminderSettings } from "@/types/reminders";
import { syncLocalReminders } from "@/utils/local-notifications";
import {
  hasNotificationPermission,
  requestNotificationPermission,
} from "@/utils/notification-permission";
import {
  loadReminderSettings,
  saveReminderSettings,
} from "@/utils/reminder-settings-storage";

/** Nastavenie lokálnych pripomienok; každá zmena sa hneď uloží a preplánuje. */
export function useStudyReminderSettings() {
  const { session } = useSession();
  const userId = session?.user.id;
  const [settings, setSettings] = useState<StudyReminderSettings | null>(null);
  const [permitted, setPermitted] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    loadReminderSettings(userId).then((loaded) => {
      if (!cancelled) setSettings(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Povolenie sa dá zmeniť v Nastaveniach telefónu – po návrate ho over znova.
  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      const check = async () => {
        const granted = await hasNotificationPermission();
        setPermitted(granted);
        if (granted) void syncLocalReminders(userId);
      };
      void check();
      const subscription = AppState.addEventListener("change", (state) => {
        if (state === "active") void check();
      });
      return () => subscription.remove();
    }, [userId]),
  );

  const update = async (patch: Partial<StudyReminderSettings>) => {
    if (!userId || !settings) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    await saveReminderSettings(userId, next);
    // Povolenie pýtame až vo chvíli, keď používateľ pripomienku zapne.
    if (patch.studyEnabled || patch.unfinishedEnabled) {
      setPermitted(await requestNotificationPermission());
    }
    await syncLocalReminders(userId);
  };

  return { settings, permitted, update };
}
