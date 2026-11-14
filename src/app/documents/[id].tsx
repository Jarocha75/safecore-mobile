import PdfViewerScreen from "@/components/screens/PdfViewerScreen";

export default function DocumentPdfRoute() {
  return <PdfViewerScreen collection="documents" fallbackTitle="Dokument" />;
}
