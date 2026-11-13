import { useEffect, useState } from "react";

import { OFFLINE_EXPIRED_MESSAGE } from "@/constants/offline";
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
  /** Server sa nepodarilo kontaktovať (bez ohľadu na to, či je k dispozícii kópia). */
  unreachable: boolean;
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
  const { session, isOfflineAccessValid } = useSession();
  const token = session?.token;
  const userId = session?.user.id;
  const [state, setState] = useState<ResourceState<T>>({
    data: null,
    error: null,
    loading: true,
    offline: false,
    savedAt: null,
    unreachable: false,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!token || !userId) return;
    let cancelled = false;

    (async () => {
      // Po vypršaní offline platnosti sa kópia nepoužije, kým server prístup znova nepotvrdí.
      const stored = cache ? await loadCached<T>(userId, path) : null;
      const cached = stored && isOfflineAccessValid() ? stored : null;
      if (cancelled) return;
      if (cached) {
        setState({
          data: cached.data,
          error: null,
          loading: false,
          offline: false,
          savedAt: cached.savedAt,
          unreachable: false,
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
            : {
                data,
                error: null,
                loading: false,
                offline: false,
                savedAt: null,
                unreachable: false,
              },
        );
      } catch (error) {
        if (cancelled) return;
        if (cached && error instanceof ApiError && error.status === 0) {
          setState((prev) => ({ ...prev, offline: true, unreachable: true }));
          return;
        }
        // Server odmietol (napr. 403 – kurz už nie je aktívny): kópiu nezobrazujeme.
        const message =
          stored && !cached && error instanceof ApiError && error.status === 0
            ? OFFLINE_EXPIRED_MESSAGE
            : error instanceof ApiError
              ? error.message
              : "Niečo sa pokazilo.";
        setState({
          data: null,
          error: message,
          loading: false,
          offline: false,
          savedAt: null,
          unreachable: error instanceof ApiError && error.status === 0,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [path, token, userId, cache, attempt, isOfflineAccessValid]);

  const reload = () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      unreachable: false,
    }));
    setAttempt((n) => n + 1);
  };

  return { ...state, reload };
}
