import * as SecureStore from "expo-secure-store";

import type { AuthUser } from "@/types/auth";

const TOKEN_KEY = "session_token";
const USER_KEY = "session_user";

type StoredSession = { token: string; user: AuthUser };

/** Načíta uloženú reláciu zo zabezpečeného úložiska (Keychain / Keystore). */
export async function loadStoredSession(): Promise<StoredSession | null> {
  try {
    const [token, userJson] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(USER_KEY),
    ]);
    if (!token || !userJson) return null;
    return { token, user: JSON.parse(userJson) as AuthUser };
  } catch {
    return null;
  }
}

export async function saveStoredSession({ token, user }: StoredSession) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function clearStoredSession() {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
  } catch {
    // Úložisko sa nepodarilo vyčistiť – relácia v pamäti sa aj tak zruší.
  }
}
