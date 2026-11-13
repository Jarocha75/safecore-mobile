import { useEffect, useState } from "react";

import { useSession } from "@/context/SessionContext";
import { ApiError, apiFetch } from "@/utils/api";
import { loadCached, saveCached } from "@/utils/api-cache";

type ResourceState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  /** Dáta pochádzajú z uloženej kópie, lebo server sa nepodarilo kontaktovať. */
  offline: boolean;
  /** Kedy bola zobrazená kópia uložená (ms od epochy); null pri čerstvých dátach. */
  savedAt: number | null;
};

type Options = {
  /** False pre zdroje, ktoré sa pri každom volaní skladajú nanovo (cvičný test). */
  cache?: boolean;
};

/**
 * Načíta `GET` zdroj z API s tokenom prihláseného používateľa; `reload` zopakuje požiadavku.
 * Stale-while-revalidate: ak existuje uložená kópia, zobrazí sa hneď a na pozadí sa obnoví.
 * Pri chybe siete ostane kópia zobrazená (`offline`), chyby servera sa hlásia ako predtým.
 */
export function useApiResource<T>(path: string, { cache = true }: Options = {}) {
  const { session } = useSession();
  const token = session?.token;
  const userId = session?.user.id;
  const [state, setState] = useState<ResourceState<T>>({
    data: null,
    error: null,
    loading: true,
    offline: false,
    savedAt: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!token || !userId) return;
    let cancelled = false;

    (async () => {
      const cached = cache ? await loadCached<T>(userId, path) : null;
      if (cancelled) return;
      if (cached) {
        setState({
          data: cached.data,
          error: null,
          loading: false,
          offline: false,
          savedAt: cached.savedAt,
        });
      }

      try {
        const data = await apiFetch<T>(path, { token });
        if (cancelled) return;
        if (cache) void saveCached(userId, path, data);
        // Kópia sa nahradí len pri zmene, aby sa rozpracovaná obrazovka zbytočne neresetovala.
        setState((prev) =>
          cached && JSON.stringify(cached.data) === JSON.stringify(data)
            ? { ...prev, savedAt: null }
            : { data, error: null, loading: false, offline: false, savedAt: null },
        );
      } catch (error) {
        if (cancelled) return;
        if (cached && error instanceof ApiError && error.status === 0) {
          setState((prev) => ({ ...prev, offline: true }));
          return;
        }
        // Server odmietol (napr. 403 – kurz už nie je aktívny): kópiu nezobrazujeme.
        const message =
          error instanceof ApiError ? error.message : "Niečo sa pokazilo.";
        setState({
          data: null,
          error: message,
          loading: false,
          offline: false,
          savedAt: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [path, token, userId, cache, attempt]);

  const reload = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setAttempt((n) => n + 1);
  };

  return { ...state, reload };
}
