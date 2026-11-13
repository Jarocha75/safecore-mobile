import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { ApiPath } from "@/constants/api";
import type { LoginResponse, MeResponse, Session } from "@/types/auth";
import { ApiError, apiFetch, setUnauthorizedHandler } from "@/utils/api";
import { clearApiCache } from "@/utils/api-cache";
import {
  clearStoredSession,
  loadStoredCourses,
  loadStoredSession,
  saveStoredCourses,
  saveStoredSession,
} from "@/utils/session-storage";

const NO_COURSE_MESSAGE =
  "K tomuto účtu nie je priradený žiadny aktívny kurz.";

type SessionContextValue = {
  session: Session | null;
  /** True, kým sa z úložiska nenačíta uložená relácia. */
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession musí byť použitý v SessionProvider.");
  return value;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    await Promise.all([clearStoredSession(), clearApiCache()]);
    setSession(null);
  };

  const signIn = async (email: string, password: string) => {
    const { token } = await apiFetch<LoginResponse>(ApiPath.login, {
      method: "POST",
      body: { email, password },
    });
    const me = await apiFetch<MeResponse>(ApiPath.me, { token });
    // Do appky patria len zákazníci s kúpeným kurzom.
    if (me.courses.length === 0) throw new ApiError(403, NO_COURSE_MESSAGE);

    await saveStoredSession({ token, user: me.user });
    await saveStoredCourses(me.courses);
    setSession({ token, user: me.user, courses: me.courses });
  };

  useEffect(() => {
    setUnauthorizedHandler(() => {
      void signOut();
    });
    return () => setUnauthorizedHandler(null);
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const stored = await loadStoredSession();
      if (cancelled) return;
      const storedCourses = stored ? await loadStoredCourses() : [];
      if (cancelled) return;
      if (stored) setSession({ ...stored, courses: storedCourses });
      setIsLoading(false);
      if (!stored) return;

      // Obnova kurzov na pozadí. 401 (vypršaný token) rieši unauthorizedHandler,
      // pri chybe siete ostáva používateľ prihlásený.
      try {
        const me = await apiFetch<MeResponse>(ApiPath.me, {
          token: stored.token,
        });
        if (cancelled) return;
        if (me.courses.length === 0) {
          await signOut();
          return;
        }
        void saveStoredCourses(me.courses);
        setSession({ token: stored.token, user: me.user, courses: me.courses });
      } catch {
        // offline alebo server nedostupný
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}
