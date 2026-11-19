import * as SecureStore from "expo-secure-store";

import type { LicenseKind, StoredLicense } from "@/types/license";

const KINDS: LicenseKind[] = ["firearm", "sbs"];

const keyFor = (kind: LicenseKind) => `license_${kind}`;

/** Načíta údaje preukazu z telefónu; pri chybe alebo poškodených dátach vráti null. */
export async function loadStoredLicense(
  kind: LicenseKind,
): Promise<StoredLicense | null> {
  try {
    const json = await SecureStore.getItemAsync(keyFor(kind));
    return json ? (JSON.parse(json) as StoredLicense) : null;
  } catch {
    return null;
  }
}

/** Uloží údaje preukazu len do telefónu. Osobné údaje nelogovať. */
export async function saveStoredLicense(
  kind: LicenseKind,
  license: StoredLicense,
) {
  try {
    await SecureStore.setItemAsync(keyFor(kind), JSON.stringify(license));
  } catch {
    // Lokálna kópia je len pohodlie – SMS upozornenie sa uložilo na server.
  }
}

export async function clearStoredLicense(kind: LicenseKind) {
  try {
    await SecureStore.deleteItemAsync(keyFor(kind));
  } catch {
    // pozri saveStoredLicense
  }
}

/** Vymaže údaje všetkých preukazov (pri odhlásení a zmazaní účtu). */
export async function clearAllStoredLicenses() {
  await Promise.all(KINDS.map(clearStoredLicense));
}
