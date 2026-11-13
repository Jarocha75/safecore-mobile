import { API_TIMEOUT_MS, API_URL } from "@/constants/api";

export class ApiError extends Error {
  /** HTTP stav; 0 = server sa nepodarilo kontaktovať. */
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string;
};

let unauthorizedHandler: (() => void) | null = null;
let verifiedHandler: (() => void) | null = null;

/** Zavolá sa po každej úspešnej odpovedi na požiadavku s tokenom (server potvrdil prístup). */
export function setVerifiedHandler(handler: (() => void) | null) {
  verifiedHandler = handler;
}

/** Zavolá sa, keď server odmietne platný token (vypršal, účet bol zablokovaný). */
export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

const NETWORK_ERROR = "Nepodarilo sa pripojiť k serveru. Skontroluj pripojenie.";
const GENERIC_ERROR = "Niečo sa pokazilo. Skús to znova.";

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<T> {
  if (!API_URL) {
    throw new ApiError(0, "Chýba EXPO_PUBLIC_API_URL (pozri .env.example).");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    throw new ApiError(0, NETWORK_ERROR);
  } finally {
    clearTimeout(timer);
  }

  const data = (await response.json().catch(() => null)) as
    | (T & { error?: string })
    | null;

  if (!response.ok) {
    if (response.status === 401 && token) unauthorizedHandler?.();
    throw new ApiError(
      response.status,
      typeof data?.error === "string" ? data.error : GENERIC_ERROR,
    );
  }

  if (data === null) throw new ApiError(response.status, GENERIC_ERROR);
  if (token) verifiedHandler?.();
  return data;
}
