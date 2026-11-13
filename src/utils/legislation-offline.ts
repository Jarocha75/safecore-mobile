import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";

import { LEGAL_NORM_GROUPS, WEB_URL } from "@/constants/legislation";
import type { LegalNorm, LegislationManifest } from "@/types/legislation";

const MANIFEST_KEY = "legislation_manifest";

export const allNorms = (): LegalNorm[] =>
  LEGAL_NORM_GROUPS.flatMap((group) => group.norms);

/** Predpisy sú verejné, takže sa ukladajú spoločne pre všetkých používateľov zariadenia. */
const directory = () => new Directory(Paths.document, "legislation");

const fileFor = (id: string) => new File(directory(), `${id}.pdf`);

export const pdfUrl = (path: string) => `${WEB_URL}${encodeURI(path)}`;

export async function loadLegislationManifest(): Promise<LegislationManifest | null> {
  try {
    const json = await AsyncStorage.getItem(MANIFEST_KEY);
    return json ? (JSON.parse(json) as LegislationManifest) : null;
  } catch {
    return null;
  }
}

/** Adresa stiahnutého súboru, alebo null, ak predpis nie je (celý) stiahnutý. */
export function localPdfUri(
  manifest: LegislationManifest | null,
  id: string,
): string | null {
  if (!manifest?.ids.includes(id)) return null;
  try {
    const file = fileFor(id);
    return file.exists ? file.uri : null;
  } catch {
    return null;
  }
}

/** Stiahne všetky PDF predpisov. Manifest sa zapíše až po úspechu všetkých; pri chybe vyhodí výnimku. */
export async function downloadLegislation(
  onProgress: (done: number, total: number) => void,
): Promise<LegislationManifest> {
  const norms = allNorms().filter((norm) => norm.pdf !== null);
  const dir = directory();
  if (!dir.exists) dir.create({ intermediates: true });

  onProgress(0, norms.length);
  let done = 0;
  for (const norm of norms) {
    const target = fileFor(norm.id);
    try {
      await File.downloadFileAsync(pdfUrl(norm.pdf!), target, {
        idempotent: true,
      });
    } catch (error) {
      // Neúplný súbor nesmie ostať; manifest ho tak či tak neobsahuje.
      try {
        if (target.exists) target.delete();
      } catch {}
      throw error;
    }
    onProgress(++done, norms.length);
  }

  const manifest: LegislationManifest = {
    ids: norms.map((norm) => norm.id),
    savedAt: Date.now(),
  };
  await AsyncStorage.setItem(MANIFEST_KEY, JSON.stringify(manifest));
  return manifest;
}
