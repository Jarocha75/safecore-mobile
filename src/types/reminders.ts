/** Nastavenie lokálnych pripomienok (plánuje ich telefón, server o nich nevie). */
export type StudyReminderSettings = {
  studyEnabled: boolean;
  /** Dni v týždni podľa expo-notifications: 1 = nedeľa … 7 = sobota. */
  weekdays: number[];
  hour: number;
  minute: number;
  unfinishedEnabled: boolean;
};
