import { useEffect, useState } from "react";

import { useSession } from "@/context/SessionContext";
import { ApiError, apiFetch } from "@/utils/api";

type ResourceState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

/** Načíta `GET` zdroj z API s tokenom prihláseného používateľa; `reload` zopakuje požiadavku. */
export function useApiResource<T>(path: string) {
  const { session } = useSession();
  const token = session?.token;
  const [state, setState] = useState<ResourceState<T>>({
    data: null,
    error: null,
    loading: true,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    apiFetch<T>(path, { token })
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (cancelled) return;
        const message =
          error instanceof ApiError ? error.message : "Niečo sa pokazilo.";
        setState({ data: null, error: message, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [path, token, attempt]);

  const reload = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setAttempt((n) => n + 1);
  };

  return { ...state, reload };
}
