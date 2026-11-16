import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { ApiPath } from "@/constants/api";
import { useSession } from "@/context/SessionContext";
import type { LicenseKind, LicenseReminder } from "@/types/license";
import { ApiError, apiFetch } from "@/utils/api";
import { deleteLicenseReminder, SERVER_KIND } from "@/utils/license-reminders";

/**
 * Uložené SMS upozornenia prihláseného používateľa. Načítajú sa pri každom
 * zobrazení obrazovky (po uložení vo formulári sa tak hneď prejavia).
 * Bez siete sa upozornenia jednoducho nezobrazia – offline cache nie je potrebná.
 */
export function useLicenseReminders() {
  const { session } = useSession();
  const token = session?.token;
  const [reminders, setReminders] = useState<LicenseReminder[]>([]);
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      let cancelled = false;
      apiFetch<{ reminders: LicenseReminder[] }>(ApiPath.licenseReminders, {
        token,
      })
        .then((r) => {
          if (!cancelled) setReminders(r.reminders);
        })
        .catch(() => {
          // offline alebo chyba servera – upozornenia sa nezobrazia
        });
      return () => {
        cancelled = true;
      };
    }, [token]),
  );

  const find = (kind: LicenseKind) =>
    reminders.find((r) => r.kind === SERVER_KIND[kind]) ?? null;

  const remove = async (kind: LicenseKind) => {
    if (!token) return;
    setRemoveError(null);
    setRemoving(true);
    try {
      await deleteLicenseReminder(kind, token);
      setReminders((prev) => prev.filter((r) => r.kind !== SERVER_KIND[kind]));
    } catch (e) {
      setRemoveError(
        e instanceof ApiError ? e.message : "Niečo sa pokazilo. Skús to znova.",
      );
    } finally {
      setRemoving(false);
    }
  };

  return { find, remove, removing, removeError };
}
