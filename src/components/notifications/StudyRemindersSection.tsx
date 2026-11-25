import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import ReminderTimeRow from "@/components/notifications/ReminderTimeRow";
import SettingSwitchRow from "@/components/notifications/SettingSwitchRow";
import WeekdayPicker from "@/components/notifications/WeekdayPicker";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useStudyReminderSettings } from "@/hooks/useStudyReminderSettings";

/** Lokálne pripomienky štúdia a nedokončeného testu. */
export default function StudyRemindersSection() {
  const { settings, permitted, update } = useStudyReminderSettings();
  if (!settings) return null;

  const anyEnabled = settings.studyEnabled || settings.unfinishedEnabled;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pripomienky štúdia</Text>

      {anyEnabled && !permitted ? (
        <Pressable
          style={styles.warning}
          onPress={() => void Linking.openSettings()}
          accessibilityRole="button"
        >
          <Text style={styles.warningText}>
            Notifikácie sú v telefóne vypnuté, pripomienky neprídu. Ťukni a povoľ
            ich v nastaveniach.
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.card}>
        <SettingSwitchRow
          title="Pravidelné precvičovanie"
          description="Pripomenieme ti testy vo vybrané dni a čas."
          value={settings.studyEnabled}
          onChange={(studyEnabled) => void update({ studyEnabled })}
        />
        {settings.studyEnabled ? (
          <>
            <WeekdayPicker
              selected={settings.weekdays}
              onChange={(weekdays) => void update({ weekdays })}
            />
            <ReminderTimeRow
              hour={settings.hour}
              minute={settings.minute}
              onChange={(hour, minute) => void update({ hour, minute })}
            />
          </>
        ) : null}
      </View>

      <View style={styles.card}>
        <SettingSwitchRow
          title="Nedokončený test"
          description="Ak sa k rozpracovanému testu 2 dni nevrátiš, pripomenieme ti ho."
          value={settings.unfinishedEnabled}
          onChange={(unfinishedEnabled) => void update({ unfinishedEnabled })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 16 },
  sectionTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  warning: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Palette.dangerBorder,
    backgroundColor: Palette.dangerSoft,
    padding: 14,
    marginBottom: 12,
  },
  warningText: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.text,
  },
});
