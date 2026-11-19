import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import type { LicenseKind, StoredLicense } from "@/types/license";
import {
  clearStoredLicense,
  loadStoredLicense,
} from "@/utils/license-storage";

type Stored = Record<LicenseKind, StoredLicense | null>;

/**
 * Údaje preukazov uložené v telefóne. Načítajú sa pri každom zobrazení obrazovky,
 * takže zmena vo formulári sa hneď prejaví.
 */
export function useStoredLicenses() {
  const [stored, setStored] = useState<Partial<Stored>>({});
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      void Promise.all([
        loadStoredLicense("firearm"),
        loadStoredLicense("sbs"),
      ]).then(([firearm, sbs]) => {
        if (cancelled) return;
        setStored({ firearm, sbs });
        setLoaded(true);
      });
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const find = (kind: LicenseKind): StoredLicense | null =>
    stored[kind] ?? null;

  const remove = async (kind: LicenseKind) => {
    await clearStoredLicense(kind);
    setStored((prev) => ({ ...prev, [kind]: null }));
  };

  return { find, remove, loaded };
}
