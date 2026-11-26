import * as Print from "expo-print";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { PDF_CACHE_SECONDS } from "@/constants/pdf-collections";
import { Font } from "@/constants/typography";
import type { PdfCollection } from "@/types/pdf";
import {
  findPdfItem,
  loadPdfManifest,
  localPdfUri,
  pdfUrl,
} from "@/utils/pdf-offline";

type PdfViewerScreenProps = {
  collection: PdfCollection;
  /** Názov v hornej lište, kým nie je známa položka. */
  fallbackTitle: string;
};

/** Čítačka PDF: stiahnutý súbor z zariadenia, inak z webu. */
export default function PdfViewerScreen({
  collection,
  fallbackTitle,
}: PdfViewerScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const norm = findPdfItem(collection, id);
  const [source, setSource] = useState<{ uri: string } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!norm?.pdf) return;
    let cancelled = false;
    loadPdfManifest(collection).then((manifest) => {
      if (cancelled) return;
      setSource({
        uri: localPdfUri(collection, manifest, norm.id) ?? pdfUrl(norm.pdf!),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [collection, norm]);

  const canPrint = source !== null && !failed;

  /** Otvorí systémový dialóg tlače (stiahnutý súbor alebo adresa z webu). */
  const printPdf = async () => {
    if (!source) return;
    try {
      await Print.printAsync({ uri: source.uri });
    } catch (error) {
      // Zrušenie tlače používateľom nie je chyba.
      const message = error instanceof Error ? error.message : "";
      if (/cancel|did not complete/i.test(message)) return;
      Alert.alert(
        "Tlač sa nepodarila",
        "Skontroluj pripojenie na internet a skús to znova.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar
        title={norm?.title ?? fallbackTitle}
        action={
          canPrint
            ? { icon: "print-outline", label: "Tlačiť", onPress: printPdf }
            : undefined
        }
      />

      {!norm?.pdf || failed ? (
        <View style={styles.center}>
          <Text style={styles.message}>
            {failed
              ? "PDF sa nepodarilo načítať. Skontroluj pripojenie na internet a skús to znova."
              : "Tento súbor nie je k dispozícii."}
          </Text>
        </View>
      ) : source ? (
        <Pdf
          source={{ ...source, cache: true, expiration: PDF_CACHE_SECONDS }}
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
