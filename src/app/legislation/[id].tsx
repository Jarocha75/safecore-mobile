import PdfViewerScreen from "@/components/screens/PdfViewerScreen";

export default function LegislationPdfRoute() {
  return <PdfViewerScreen collection="legislation" fallbackTitle="Predpis" />;
}
