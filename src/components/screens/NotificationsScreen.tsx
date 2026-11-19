import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LicenseCard from "@/components/license/LicenseCard";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { LICENSES } from "@/constants/licenses";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import { formatIsoDate } from "@/utils/date";

/** Nastavenie notifikácií: SMS upozornenia na koniec platnosti preukazov. */
export default function NotificationsScreen() {
  const { find } = useLicenseReminders();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title="Notifikácie" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>SMS upozornenia</Text>
        <Text style={styles.description}>
          Pošleme ti SMS 3 mesiace a týždeň pred koncom platnosti preukazu.
          Ťuknutím na preukaz upozornenie zapneš, zmeníš alebo zrušíš.
        </Text>

        {LICENSES.map((license) => {
          const reminder = find(license.kind);
          return (
            <LicenseCard
              key={license.id}
              license={license}
              href={license.href}
              subtitle={
                reminder
                  ? `SMS upozornenie · platnosť do ${formatIsoDate(reminder.validUntil)}`
                  : "SMS upozornenie nie je zapnuté"
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  sectionTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
    marginBottom: 6,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
});
