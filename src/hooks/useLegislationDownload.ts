import { useCallback, useEffect, useState } from "react";

import type { LegislationManifest } from "@/types/legislation";
import {
  downloadLegislation,
  loadLegislationManifest,
} from "@/utils/legislation-offline";

type Status = "idle" | "downloading" | "error";

/** Stav a spustenie sťahovania predpisov na offline. */
export function useLegislationDownload() {
  const [manifest, setManifest] = useState<LegislationManifest | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadLegislationManifest().then((m) => {
      if (!cancelled) setManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const start = useCallback(async () => {
    setStatus("downloading");
    setError(null);
    setProgress({ done: 0, total: 0 });
    try {
      setManifest(
        await downloadLegislation((done, total) => setProgress({ done, total })),
      );
      setStatus("idle");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Predpisy sa nepodarilo stiahnuť. Skús to znova.",
      );
      setStatus("error");
    }
  }, []);

  return { manifest, status, progress, error, start };
}
