import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

import {
  REMINDER_WEEKDAYS,
  STUDY_REMINDER_CONTENT,
  STUDY_REMINDER_ID_PREFIX,
  UNFINISHED_REMINDER_DELAY_SECONDS,
  UNFINISHED_REMINDER_ID,
  UNFINISHED_REMINDER_TITLE,
} from "@/constants/local-notifications";
import { ANDROID_CHANNEL_ID } from "@/constants/notification-channel";
import type { StudyReminderSettings } from "@/types/reminders";
import type { SavedStudy } from "@/types/study";
import {
  ensureAndroidChannel,
  hasNotificationPermission,
} from "@/utils/notification-permission";
import { runNotificationTask } from "@/utils/notification-queue";
import { loadReminderSettings } from "@/utils/reminder-settings-storage";
import { loadStudy } from "@/utils/study-storage";

async function applyStudyReminders(settings: StudyReminderSettings) {
  await Promise.all(
    REMINDER_WEEKDAYS.map(({ value }) =>
      Notifications.cancelScheduledNotificationAsync(
        `${STUDY_REMINDER_ID_PREFIX}${value}`,
      ),
    ),
  );
  if (!settings.studyEnabled) return;
  for (const weekday of settings.weekdays) {
    await Notifications.scheduleNotificationAsync({
      identifier: `${STUDY_REMINDER_ID_PREFIX}${weekday}`,
      content: STUDY_REMINDER_CONTENT,
      trigger: {
        type: SchedulableTriggerInputTypes.WEEKLY,
        weekday,
        hour: settings.hour,
        minute: settings.minute,
        channelId: ANDROID_CHANNEL_ID,
      },
    });
  }
}

async function applyUnfinishedReminder(
  settings: StudyReminderSettings,
  study: SavedStudy | null,
) {
  await Notifications.cancelScheduledNotificationAsync(UNFINISHED_REMINDER_ID);
  if (!settings.unfinishedEnabled || !study) return;
  const query = study.courseId
    ? `?courseId=${encodeURIComponent(study.courseId)}`
    : "";
  await Notifications.scheduleNotificationAsync({
    identifier: UNFINISHED_REMINDER_ID,
    content: {
      title: UNFINISHED_REMINDER_TITLE,
      body: `${study.testTitle}: pokračuj od otázky ${study.questionNumber} z ${study.totalQuestions}.`,
      data: { url: `/quiz/${encodeURIComponent(study.testId)}${query}` },
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: UNFINISHED_REMINDER_DELAY_SECONDS,
      channelId: ANDROID_CHANNEL_ID,
    },
  });
}

/** Spustí plánovanie v rade; pripomienky sú doplnok, chyba nesmie zhodiť appku. */
function schedule(task: () => Promise<void>) {
  return runNotificationTask(async () => {
    try {
      if (!(await hasNotificationPermission())) return;
      await ensureAndroidChannel();
      await task();
    } catch {
      // nedostupné na tejto platforme
    }
  });
}

/** Naplánuje všetky pripomienky nanovo podľa uloženého nastavenia a rozpracovaného testu. */
export function syncLocalReminders(userId: string) {
  return schedule(async () => {
    const settings = await loadReminderSettings(userId);
    await applyStudyReminders(settings);
    await applyUnfinishedReminder(settings, await loadStudy(userId));
  });
}

/** Po zmene postupu v teste posunie pripomienku; `null` (test dokončený) ju zruší. */
export function updateUnfinishedReminder(
  userId: string,
  study: SavedStudy | null,
) {
  return schedule(async () => {
    await applyUnfinishedReminder(await loadReminderSettings(userId), study);
  });
}

/** Pri odhlásení zruší všetky naplánované pripomienky. */
export function cancelLocalReminders() {
  return runNotificationTask(async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch {
      // nedostupné na tejto platforme
    }
  });
}
