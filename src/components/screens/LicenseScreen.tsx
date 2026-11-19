import CustomHeader from "@/components/CustomHeader";
import LicenseCard from "@/components/license/LicenseCard";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { LICENSES } from "@/constants/licenses";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import { useStoredLicenses } from "@/hooks/useStoredLicenses";
import {
  getLicenseStatus,
  STATUS_COLOR,
  statusLabel,
} from "@/utils/license-status";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LicenseScreen() {
  const reminders = useLicenseReminders();
  const stored = useStoredLicenses();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader title="Preukaz" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Vyber si preukaz a uvidíš jeho údaje, platnosť a zostávajúci čas. Údaje
          zostávajú len v tvojom telefóne.
        </Text>

        {LICENSES.map((license) => {
          // Dátum zo servera (SMS upozornenie) má prednosť, inak lokálne uložený.
          const validUntil =
            reminders.find(license.kind)?.validUntil ??
            stored.find(license.kind)?.validUntil ??
            null;
          const status = validUntil ? getLicenseStatus(validUntil) : null;
          return (
            <LicenseCard
              key={license.id}
              license={license}
              href={license.detailHref}
              subtitle={status ? statusLabel(status) : "Údaje zatiaľ nezadané"}
              subtitleColor={status ? STATUS_COLOR[status.kind] : undefined}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
    lineHeight: 23,
    marginBottom: 20,
  },
});
