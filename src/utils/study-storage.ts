import AsyncStorage from "@react-native-async-storage/async-storage";

import type { SavedStudy } from "@/types/study";

const keyFor = (userId: string) => `study_progress_${userId}`;

/** Načíta rozpracovaný test používateľa; pri chybe alebo poškodených dátach vráti null. */
export async function loadStudy(userId: string): Promise<SavedStudy | null> {
  try {
    const json = await AsyncStorage.getItem(keyFor(userId));
    return json ? (JSON.parse(json) as SavedStudy) : null;
  } catch {
    return null;
  }
}

export async function saveStudy(userId: string, study: SavedStudy) {
  try {
    await AsyncStorage.setItem(keyFor(userId), JSON.stringify(study));
  } catch {
    // Postup je len pohodlie – nepodarené uloženie kvíz nerušíme.
  }
}

export async function clearStudy(userId: string) {
  try {
    await AsyncStorage.removeItem(keyFor(userId));
  } catch {
    // pozri saveStudy
  }
}
