import { useCallback, useEffect, useState } from "react";

import { useSession } from "@/context/SessionContext";
import type { CourseType } from "@/types/auth";
import type { CachedResponse, OfflineManifest } from "@/types/cache";
import { loadCached } from "@/utils/api-cache";
import { downloadCourse, manifestKey } from "@/utils/offline-download";

type Status = "idle" | "downloading" | "error";

/** Stav a spustenie sťahovania kurzu na offline. */
export function useOfflineDownload(courseId: string, type: CourseType) {
  const { session } = useSession();
  const token = session?.token;
  const userId = session?.user.id;
  const [manifest, setManifest] =
    useState<CachedResponse<OfflineManifest> | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    loadCached<OfflineManifest>(userId, manifestKey(courseId)).then((cached) => {
      if (!cancelled) setManifest(cached);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, courseId]);

  const start = useCallback(async () => {
    if (!token || !userId) return;
    setStatus("downloading");
    setError(null);
    setProgress({ done: 0, total: 0 });
    try {
      await downloadCourse({
        token,
        userId,
        courseId,
        type,
        onProgress: (done, total) => setProgress({ done, total }),
      });
      setManifest(await loadCached<OfflineManifest>(userId, manifestKey(courseId)));
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Niečo sa pokazilo.");
      // Predošlé stiahnutie ostáva nedotknuté (manifest sa prepíše až po úspechu).
      setStatus("error");
    }
  }, [token, userId, courseId, type]);

  return { manifest, status, progress, error, start };
}
