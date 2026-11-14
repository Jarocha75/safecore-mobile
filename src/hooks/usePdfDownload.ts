import { useCallback, useEffect, useState } from "react";

import type { PdfCollection, PdfManifest } from "@/types/pdf";
import { downloadPdfs, loadPdfManifest } from "@/utils/pdf-offline";

type Status = "idle" | "downloading" | "error";

/** Stav a spustenie sťahovania PDF zbierky (predpisy, dokumenty) na offline. */
export function usePdfDownload(collection: PdfCollection) {
  const [manifest, setManifest] = useState<PdfManifest | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadPdfManifest(collection).then((m) => {
      if (!cancelled) setManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, [collection]);

  const start = useCallback(async () => {
    setStatus("downloading");
    setError(null);
    setProgress({ done: 0, total: 0 });
    try {
      setManifest(
        await downloadPdfs(collection, (done, total) =>
          setProgress({ done, total }),
        ),
      );
      setStatus("idle");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Súbory sa nepodarilo stiahnuť. Skús to znova.",
      );
      setStatus("error");
    }
  }, [collection]);

  return { manifest, status, progress, error, start };
}
