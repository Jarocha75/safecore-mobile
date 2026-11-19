import { Palette } from "@/constants/palette";
import type { LicenseStatus } from "@/types/license";

/** Preukaz, ktorému zostáva najviac toľko dní, sa označí ako „končí čoskoro“. */
export const SOON_DAYS = 90;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Stav platnosti podľa dátumu RRRR-MM-DD; posledný deň platnosti ešte platí. */
export function getLicenseStatus(
  validUntilIso: string,
  now: Date = new Date(),
): LicenseStatus {
  const [y, m, d] = validUntilIso.split("-").map(Number);
  const end = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const daysLeft = Math.round((end - today) / MS_PER_DAY);
  if (daysLeft < 0) return { kind: "expired", daysLeft };
  return { kind: daysLeft <= SOON_DAYS ? "soon" : "valid", daysLeft };
}

/** „1 deň“, „3 dni“, „10 dní“. */
export function formatDays(count: number): string {
  const n = Math.abs(count);
  if (n === 1) return "1 deň";
  if (n >= 2 && n <= 4) return `${n} dni`;
  return `${n} dní`;
}

/** Krátky popis stavu pre kartu v zozname. */
export function statusLabel(status: LicenseStatus): string {
  if (status.kind === "expired") {
    return `Platnosť vypršala pred ${formatDays(status.daysLeft)}`;
  }
  if (status.daysLeft === 0) return "Platí do dnes";
  return `Platí ešte ${formatDays(status.daysLeft)}`;
}

export const STATUS_COLOR = {
  valid: Palette.success,
  soon: Palette.stamp,
  expired: Palette.danger,
} as const;

export const STATUS_TITLE = {
  valid: "Preukaz je platný",
  soon: "Platnosť čoskoro skončí",
  expired: "Platnosť vypršala",
} as const;
