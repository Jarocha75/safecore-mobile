import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ReminderStatusCard from "@/components/license/ReminderStatusCard";
import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { LICENSES } from "@/constants/licenses";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import { useStoredLicenses } from "@/hooks/useStoredLicenses";
import type { LicenseKind } from "@/types/license";
import { formatIsoDate } from "@/utils/date";
import {
  formatDays,
  getLicenseStatus,
  STATUS_COLOR,
  STATUS_TITLE,
} from "@/utils/license-status";

type InfoRowProps = { label: string; value: string };

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/** Detail preukazu: stav platnosti, údaje z telefónu a SMS upozornenie. */
export default function LicenseDetailScreen({ kind }: { kind: LicenseKind }) {
  const license = LICENSES.find((l) => l.kind === kind);
  const reminders = useLicenseReminders();
  const stored = useStoredLicenses();

  if (!license) return null;

  const saved = stored.find(kind);
  const reminder = reminders.find(kind);
  // Dátum zo servera (SMS upozornenie) má prednosť, inak lokálne uložený.
  const validUntil = reminder?.validUntil ?? saved?.validUntil ?? null;
  const status = validUntil ? getLicenseStatus(validUntil) : null;
  const color = status ? STATUS_COLOR[status.kind] : Palette.icon;

  const confirmClear = () => {
    Alert.alert(
      "Odstrániť údaje z telefónu",
      "Zmažeme meno, číslo a dátum platnosti uložené v tomto telefóne. SMS upozornenie ostane zapnuté, ak ho nezrušíš.",
      [
        { text: "Ponechať", style: "cancel" },
        {
          text: "Odstrániť",
          style: "destructive",
          onPress: () => void stored.remove(kind),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={license.title} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {status && validUntil ? (
          <View style={[styles.statusCard, { borderColor: color }]}>
            <Ionicons
              name={status.kind === "expired" ? "alert-circle" : "shield-checkmark"}
              size={32}
              color={color}
            />
            <Text style={[styles.statusTitle, { color }]}>
              {STATUS_TITLE[status.kind]}
            </Text>
            <Text style={styles.statusText}>
              {status.kind === "expired"
                ? `Platnosť skončila ${formatIsoDate(validUntil)} (pred ${formatDays(status.daysLeft)}).`
                : status.daysLeft === 0
                  ? `Platí do dnes (${formatIsoDate(validUntil)}).`
                  : `Platí do ${formatIsoDate(validUntil)}, zostáva ${formatDays(status.daysLeft)}.`}
            </Text>
          </View>
        ) : (
          <View style={styles.statusCard}>
            <Ionicons name="id-card-outline" size={32} color={Palette.icon} />
            <Text style={styles.statusTitle}>Údaje zatiaľ nezadané</Text>
            <Text style={styles.statusText}>
              Zadaj údaje preukazu a uvidíš jeho platnosť. Zároveň môžeš zapnúť
              SMS upozornenie pred koncom platnosti.
            </Text>
          </View>
        )}

        {saved ? (
          <View style={styles.infoCard}>
            <InfoRow
              label="Meno a priezvisko"
              value={`${saved.firstName} ${saved.lastName}`.trim()}
            />
            <InfoRow label={`Číslo preukazu`} value={saved.licenseNumber} />
            <InfoRow
              label="Platnosť do"
              value={formatIsoDate(saved.validUntil)}
            />
            <Text style={styles.hint}>
              Tieto údaje sú uložené len v tomto telefóne, na server sa
              neposielajú.
            </Text>
          </View>
        ) : null}

        {reminder ? (
          <ReminderStatusCard
            reminder={reminder}
            removing={reminders.removing}
            error={reminders.removeError}
            onRemove={() => void reminders.remove(kind)}
          />
        ) : (
          <View style={styles.infoCard}>
            <View style={styles.reminderHeader}>
              <Ionicons
                name="notifications-off-outline"
                size={20}
                color={Palette.icon}
              />
              <Text style={styles.reminderTitle}>
                SMS upozornenie nie je zapnuté
              </Text>
            </View>
            <Text style={styles.hint}>
              Pošleme ti SMS 3 mesiace a týždeň pred koncom platnosti.
            </Text>
          </View>
        )}

        <PressableScale
          style={styles.primaryButton}
          onPress={() => router.push(license.href)}
          accessibilityRole="button"
          accessibilityLabel={saved || reminder ? "Upraviť údaje" : "Zadať údaje"}
        >
          <Text style={styles.primaryText}>
            {saved || reminder ? "Upraviť údaje" : "Zadať údaje"}
          </Text>
        </PressableScale>

        {saved ? (
          <PressableScale
            style={styles.secondaryButton}
            onPress={confirmClear}
            accessibilityRole="button"
            accessibilityLabel="Odstrániť údaje z telefónu"
          >
            <Text style={styles.secondaryText}>Odstrániť údaje z telefónu</Text>
          </PressableScale>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  statusCard: {
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Palette.border,
    padding: 20,
    marginBottom: 14,
  },
  statusTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 20,
    color: Palette.text,
    marginTop: 8,
    textAlign: "center",
  },
  statusText: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 22,
    color: Palette.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  infoRow: { marginBottom: 12 },
  infoLabel: {
    fontFamily: Font.body,
    fontSize: 13,
    color: Palette.textSecondary,
  },
  infoValue: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.text,
    marginTop: 2,
  },
  hint: {
    fontFamily: Font.body,
    fontSize: 13,
    lineHeight: 19,
    color: Palette.textSecondary,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  reminderTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.text,
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.onPrimary,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Palette.dangerBorder,
    backgroundColor: Palette.dangerSoft,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 15,
    color: Palette.danger,
  },
});
