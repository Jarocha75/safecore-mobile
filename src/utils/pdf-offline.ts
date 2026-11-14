import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";

import { PDF_COLLECTIONS, PDF_STORAGE } from "@/constants/pdf-collections";
import { WEB_URL } from "@/constants/web";
import type { PdfCollection, PdfManifest } from "@/types/pdf";

/** PDF sú verejné, takže sa ukladajú spoločne pre všetkých používateľov zariadenia. */
const directory = (collection: PdfCollection) =>
  new Directory(Paths.document, PDF_STORAGE[collection].directory);

const fileFor = (collection: PdfCollection, id: string) =>
  new File(directory(collection), `${id}.pdf`);

export const pdfUrl = (path: string) => `${WEB_URL}${encodeURI(path)}`;

export const findPdfItem = (collection: PdfCollection, id: string) =>
  PDF_COLLECTIONS[collection]().find((item) => item.id === id);

export async function loadPdfManifest(
  collection: PdfCollection,
): Promise<PdfManifest | null> {
  try {
    const json = await AsyncStorage.getItem(PDF_STORAGE[collection].manifestKey);
    return json ? (JSON.parse(json) as PdfManifest) : null;
  } catch {
    return null;
  }
}

/** Adresa stiahnutého súboru, alebo null, ak PDF nie je (celé) stiahnuté. */
export function localPdfUri(
  collection: PdfCollection,
  manifest: PdfManifest | null,
  id: string,
): string | null {
  if (!manifest?.ids.includes(id)) return null;
  try {
    const file = fileFor(collection, id);
    return file.exists ? file.uri : null;
  } catch {
    return null;
  }
}

/** Stiahne všetky PDF zbierky. Manifest sa zapíše až po úspechu všetkých; pri chybe vyhodí výnimku. */
export async function downloadPdfs(
  collection: PdfCollection,
  onProgress: (done: number, total: number) => void,
): Promise<PdfManifest> {
  const items = PDF_COLLECTIONS[collection]().filter(
    (item) => item.pdf !== null,
  );
  const dir = directory(collection);
  if (!dir.exists) dir.create({ intermediates: true });

  onProgress(0, items.length);
  let done = 0;
  for (const item of items) {
    const target = fileFor(collection, item.id);
    try {
      await File.downloadFileAsync(pdfUrl(item.pdf!), target, {
        idempotent: true,
      });
    } catch (error) {
      // Neúplný súbor nesmie ostať; manifest ho tak či tak neobsahuje.
      try {
        if (target.exists) target.delete();
      } catch {}
      throw error;
    }
    onProgress(++done, items.length);
  }

  const manifest: PdfManifest = {
    ids: items.map((item) => item.id),
    savedAt: Date.now(),
  };
  await AsyncStorage.setItem(
    PDF_STORAGE[collection].manifestKey,
    JSON.stringify(manifest),
  );
  return manifest;
}
