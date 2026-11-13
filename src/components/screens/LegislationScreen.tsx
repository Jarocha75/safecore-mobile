import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { Fragment } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LegalNormCard from "@/components/legislation/LegalNormCard";
import LegislationDownloadCard from "@/components/legislation/LegislationDownloadCard";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { LEGAL_NORM_GROUPS } from "@/constants/legislation";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useIsOnline } from "@/hooks/useIsOnline";
import { useLegislationDownload } from "@/hooks/useLegislationDownload";
import type { LegalNorm } from "@/types/legislation";
import { localPdfUri, pdfUrl } from "@/utils/legislation-offline";

const OPEN_FAILED_TITLE = "PDF sa nepodarilo otvoriť";

/** Stiahnuté PDF sa otvorí v systémovej ponuke aplikácií, inak sa otvorí z webu. */
async function openNorm(norm: LegalNorm, localUri: string | null, online: boolean) {
  try {
    if (localUri) {
      await Sharing.shareAsync(localUri, {
        mimeType: "application/pdf",
        UTI: "com.adobe.pdf",
        dialogTitle: norm.title,
      });
      return;
    }
    if (!online) {
      Alert.alert(
        "Si offline",
        "Tento predpis nie je stiahnutý. Pripoj sa k internetu alebo ho stiahni na offline.",
      );
      return;
    }
    await WebBrowser.openBrowserAsync(pdfUrl(norm.pdf!));
  } catch {
    Alert.alert(
      OPEN_FAILED_TITLE,
      "Skontroluj pripojenie na internet a skús to znova.",
    );
  }
}

export default function LegislationScreen() {
  const online = useIsOnline();
  const { manifest, status, progress, error, start } = useLegislationDownload();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title="Zákony a legislatíva" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LegislationDownloadCard
          manifest={manifest}
          status={status}
          progress={progress}
          error={error}
          onStart={start}
        />

        {LEGAL_NORM_GROUPS.map((group) => (
          <Fragment key={group.id}>
            <Text style={styles.groupTitle} accessibilityRole="header">
              {group.title}
            </Text>
            {group.norms.map((norm) => (
              <LegalNormCard
                key={norm.id}
                norm={norm}
                downloaded={localPdfUri(manifest, norm.id) !== null}
                onPress={() =>
                  openNorm(norm, localPdfUri(manifest, norm.id), online)
                }
              />
            ))}
          </Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  groupTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.textSecondary,
    marginTop: 8,
    marginBottom: 12,
  },
});
