import { router } from "expo-router";
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
import { localPdfUri } from "@/utils/legislation-offline";

/** Stiahnuté PDF alebo online predpis sa otvorí v čítačke; offline bez stiahnutia nejde. */
function openNorm(norm: LegalNorm, downloaded: boolean, online: boolean) {
  if (!downloaded && !online) {
    Alert.alert(
      "Si offline",
      "Tento predpis nie je stiahnutý. Pripoj sa k internetu alebo ho stiahni na offline.",
    );
    return;
  }
  router.push({ pathname: "/legislation/[id]", params: { id: norm.id } });
}

export default function LegislationScreen() {
  const online = useIsOnline();
  const { manifest, status, progress, error, start } = useLegislationDownload();
  const downloaded = (norm: LegalNorm) =>
    localPdfUri(manifest, norm.id) !== null;

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
                downloaded={downloaded(norm)}
                onPress={() => openNorm(norm, downloaded(norm), online)}
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
