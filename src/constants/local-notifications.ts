import type { StudyReminderSettings } from "@/types/reminders";

export const DEFAULT_REMINDER_SETTINGS: StudyReminderSettings = {
  studyEnabled: false,
  weekdays: [2, 4, 6],
  hour: 18,
  minute: 0,
  unfinishedEnabled: true,
};

/** Poradie pondelok – nedeľa; `value` je číslo dňa podľa expo-notifications. */
export const REMINDER_WEEKDAYS = [
  { value: 2, short: "Po", label: "Pondelok" },
  { value: 3, short: "Ut", label: "Utorok" },
  { value: 4, short: "St", label: "Streda" },
  { value: 5, short: "Št", label: "Štvrtok" },
  { value: 6, short: "Pi", label: "Piatok" },
  { value: 7, short: "So", label: "Sobota" },
  { value: 1, short: "Ne", label: "Nedeľa" },
];

/** Za aký čas od poslednej aktivity pripomenúť nedokončený test. */
export const UNFINISHED_REMINDER_DELAY_SECONDS = 2 * 24 * 60 * 60;

export const STUDY_REMINDER_ID_PREFIX = "study-reminder-";
export const UNFINISHED_REMINDER_ID = "unfinished-test";

export const STUDY_REMINDER_CONTENT = {
  title: "Čas na precvičovanie",
  body: "Venuj pár minút testom a priprav sa na skúšku.",
  data: { url: "/tests" },
};

export const UNFINISHED_REMINDER_TITLE = "Máš nedokončený test";
