import AsyncStorage from "@react-native-async-storage/async-storage";

import type { CachedResponse } from "@/types/cache";

const PREFIX = "api_cache_";

const keyFor = (userId: string, path: string) => `${PREFIX}${userId}_${path}`;

/** Načíta uloženú odpoveď API; pri chybe alebo poškodených dátach vráti null. */
export async function loadCached<T>(
  userId: string,
  path: string,
): Promise<CachedResponse<T> | null> {
  try {
    const json = await AsyncStorage.getItem(keyFor(userId, path));
    return json ? (JSON.parse(json) as CachedResponse<T>) : null;
  } catch {
    return null;
  }
}

/** Uloží odpoveď; vráti false, ak sa zápis nepodaril (cache je len pohodlie, preto nevyhadzuje chybu). */
export async function saveCached<T>(
  userId: string,
  path: string,
  data: T,
): Promise<boolean> {
  try {
    const entry: CachedResponse<T> = { data, savedAt: Date.now() };
    await AsyncStorage.setItem(keyFor(userId, path), JSON.stringify(entry));
    return true;
  } catch {
    return false;
  }
}

/** Zmaže cache všetkých používateľov (volá sa pri odhlásení). */
export async function clearApiCache() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys.filter((key) => key.startsWith(PREFIX)));
  } catch {
    // pozri saveCached
  }
}
