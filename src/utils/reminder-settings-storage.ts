import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEFAULT_REMINDER_SETTINGS } from "@/constants/local-notifications";
import type { StudyReminderSettings } from "@/types/reminders";

const keyFor = (userId: string) => `reminder_settings_${userId}`;

export async function loadReminderSettings(
  userId: string,
): Promise<StudyReminderSettings> {
  try {
    const json = await AsyncStorage.getItem(keyFor(userId));
    return json
      ? { ...DEFAULT_REMINDER_SETTINGS, ...(JSON.parse(json) as Partial<StudyReminderSettings>) }
      : DEFAULT_REMINDER_SETTINGS;
  } catch {
    return DEFAULT_REMINDER_SETTINGS;
  }
}

export async function saveReminderSettings(
  userId: string,
  settings: StudyReminderSettings,
) {
  try {
    await AsyncStorage.setItem(keyFor(userId), JSON.stringify(settings));
  } catch {
    // Nastavenie platí do zatvorenia obrazovky.
  }
}
