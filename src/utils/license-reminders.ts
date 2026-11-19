import { ApiPath } from "@/constants/api";
import type { LicenseFormData, LicenseKind } from "@/types/license";
import { apiFetch } from "@/utils/api";
import { phoneDigits } from "@/utils/phone";

export const SERVER_KIND: Record<LicenseKind, "FIREARM" | "SBS"> = {
  firearm: "FIREARM",
  sbs: "SBS",
};

/** Dátum ako RRRR-MM-DD podľa lokálneho času (toISOString by ho mohol posunúť o deň). */
export function toDateOnly(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

/** Uloží na server SMS upozornenie na koniec platnosti preukazu. */
export async function saveLicenseReminder(
  kind: LicenseKind,
  data: LicenseFormData,
  sessionToken: string,
) {
  await apiFetch(ApiPath.licenseReminders, {
    method: "PUT",
    body: {
      kind: SERVER_KIND[kind],
      validUntil: toDateOnly(data.validUntil),
      phone: phoneDigits(data.phone),
      smsConsent: data.smsConsent,
    },
    token: sessionToken,
  });
}

/** Zruší SMS upozornenie daného typu preukazu. */
export async function deleteLicenseReminder(
  kind: LicenseKind,
  sessionToken: string,
) {
  await apiFetch(`${ApiPath.licenseReminders}?kind=${SERVER_KIND[kind]}`, {
    method: "DELETE",
    token: sessionToken,
  });
}
