import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import {
  allNorms,
  loadLegislationManifest,
  localPdfUri,
  pdfUrl,
} from "@/utils/legislation-offline";

/** Čítačka PDF predpisu: stiahnutý súbor z zariadenia, inak z webu. */
export default function LegislationPdfScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const norm = allNorms().find((n) => n.id === id);
  const [source, setSource] = useState<{ uri: string } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!norm?.pdf) return;
    let cancelled = false;
    loadLegislationManifest().then((manifest) => {
      if (cancelled) return;
      setSource({ uri: localPdfUri(manifest, norm.id) ?? pdfUrl(norm.pdf!) });
    });
    return () => {
      cancelled = true;
    };
  }, [norm]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={norm?.title ?? "Predpis"} />

      {!norm?.pdf || failed ? (
        <View style={styles.center}>
          <Text style={styles.message}>
            {failed
              ? "PDF sa nepodarilo načítať. Skontroluj pripojenie na internet a skús to znova."
              : "Tento predpis nie je k dispozícii."}
          </Text>
        </View>
      ) : source ? (
        <Pdf
          source={{ ...source, cache: true }}
          style={styles.pdf}
          trustAllCerts={false}
          renderActivityIndicator={() => (
            <ActivityIndicator color={Palette.primary} size="large" />
          )}
          onError={() => setFailed(true)}
        />
      ) : (
        <View style={styles.center}>
          <ActivityIndicator color={Palette.primary} size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  pdf: { flex: 1, backgroundColor: Palette.background },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  message: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 22,
    color: Palette.textSecondary,
    textAlign: "center",
  },
});
