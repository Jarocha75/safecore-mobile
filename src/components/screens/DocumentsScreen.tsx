import { router } from "expo-router";
import { Fragment } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DocumentCard from "@/components/documents/DocumentCard";
import PdfDownloadCard from "@/components/pdf/PdfDownloadCard";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { DOCUMENT_GROUPS } from "@/constants/documents";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useIsOnline } from "@/hooks/useIsOnline";
import { usePdfDownload } from "@/hooks/usePdfDownload";
import type { DocumentItem } from "@/types/documents";
import { localPdfUri } from "@/utils/pdf-offline";

const hasItems = DOCUMENT_GROUPS.some((group) => group.items.length > 0);

/** Stiahnuté PDF alebo online dokument sa otvorí v čítačke; offline bez stiahnutia nejde. */
function openDocument(item: DocumentItem, downloaded: boolean, online: boolean) {
  if (!downloaded && !online) {
    Alert.alert(
      "Si offline",
      "Tento dokument nie je stiahnutý. Pripoj sa k internetu alebo ho stiahni na offline.",
    );
    return;
  }
  router.push({ pathname: "/documents/[id]", params: { id: item.id } });
}

export default function DocumentsScreen() {
  const online = useIsOnline();
  const { manifest, status, progress, error, start } =
    usePdfDownload("documents");
  const downloaded = (item: DocumentItem) =>
    localPdfUri("documents", manifest, item.id) !== null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title="Dokumenty a tlačivá" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {hasItems ? (
          <PdfDownloadCard
            manifest={manifest}
            status={status}
            progress={progress}
            error={error}
            onStart={start}
            noun="dokumentov"
          />
        ) : null}

        {DOCUMENT_GROUPS.map((group) => (
          <Fragment key={group.id}>
            <Text style={styles.groupTitle} accessibilityRole="header">
              {group.title}
            </Text>
            {group.items.length > 0 ? (
              group.items.map((item) => (
                <DocumentCard
                  key={item.id}
                  item={item}
                  downloaded={downloaded(item)}
                  onPress={() => openDocument(item, downloaded(item), online)}
                />
              ))
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  Dokumenty budú pridané čoskoro.
                </Text>
              </View>
            )}
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
  empty: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Palette.border,
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
  },
});
