import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useIsOnline } from "@/hooks/useIsOnline";
import { useOfflineDownload } from "@/hooks/useOfflineDownload";
import type { CourseType } from "@/types/auth";

type OfflineDownloadCardProps = { courseId: string; type: CourseType };

/** Karta „Stiahnuť na offline“ v zozname testov kurzu. */
export default function OfflineDownloadCard({
  courseId,
  type,
}: OfflineDownloadCardProps) {
  const online = useIsOnline();
  const { manifest, status, progress, error, start } = useOfflineDownload(
    courseId,
    type,
  );
  const downloading = status === "downloading";

  const title = manifest ? "Stiahnuté na offline" : "Stiahnuť na offline";
  const hint = downloading
    ? progress.total > 0
      ? `Sťahujem ${progress.done} z ${progress.total}…`
      : "Pripravujem…"
    : error
      ? error
      : manifest
        ? `Naposledy ${new Date(manifest.savedAt).toLocaleDateString("sk-SK")}. Aktualizuj, ak sa test na webe zmenil.`
        : "Testy a otázky budeš mať k dispozícii aj bez pripojenia.";
  const actionLabel = manifest ? "Aktualizovať" : "Stiahnuť";

  return (
    <View style={styles.card}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[styles.hint, status === "error" && styles.error]}
          accessibilityLiveRegion="polite"
        >
          {hint}
        </Text>
      </View>
      {downloading ? (
        <ActivityIndicator color={Palette.primary} accessibilityLabel="Sťahujem" />
      ) : (
        <PressableScale
          style={[styles.button, !online && styles.disabled]}
          onPress={start}
          disabled={!online}
          accessibilityRole="button"
          accessibilityLabel={online ? actionLabel : `${actionLabel} (vyžaduje pripojenie)`}
        >
          <Ionicons
            name={manifest ? "refresh" : "cloud-download"}
            size={18}
            color={Palette.onPrimary}
          />
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </PressableScale>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Palette.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 16,
    marginBottom: 16,
  },
  texts: { flex: 1 },
  title: { fontFamily: Font.bodySemiBold, fontSize: 16, color: Palette.text },
  hint: {
    fontFamily: Font.body,
    fontSize: 13,
    lineHeight: 18,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  error: { color: Palette.danger },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Palette.primary,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
  },
  disabled: { opacity: 0.4 },
  buttonText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 15,
    color: Palette.onPrimary,
  },
});
