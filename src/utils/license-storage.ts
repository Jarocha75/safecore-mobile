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

/** Uloží údaje preukazu len do telefónu; vráti, či sa to podarilo. Osobné údaje nelogovať. */
export async function saveStoredLicense(
  kind: LicenseKind,
  license: StoredLicense,
) {
  try {
    await SecureStore.setItemAsync(keyFor(kind), JSON.stringify(license));
    return true;
  } catch {
    return false;
  }
}

export async function clearStoredLicense(kind: LicenseKind) {
  try {
    await SecureStore.deleteItemAsync(keyFor(kind));
  } catch {
    // Zlyhanie mazania nesmie zablokovať odhlásenie.
  }
}

/** Vymaže údaje všetkých preukazov (pri odhlásení a zmazaní účtu). */
export async function clearAllStoredLicenses() {
  await Promise.all(KINDS.map(clearStoredLicense));
}
