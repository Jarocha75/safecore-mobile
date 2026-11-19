import type { ReactNode } from "react";

/** Hodnoty rozpracovaného formulára preukazu (zbrojný preukaz aj preukaz SBS). */
export type LicenseFormValues = {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  validUntil: Date | null;
  phone: string;
  /** Súhlas so zasielaním SMS upozornení. */
  smsConsent: boolean;
};

/** Hodnoty po úspešnej validácii (dátum platnosti je už povinný). */
export type LicenseFormData = Omit<LicenseFormValues, "validUntil"> & {
  validUntil: Date;
};

export type LicenseKind = "firearm" | "sbs";

/** Rozdiely medzi typmi preukazov – všetko ostatné je spoločné. */
export type LicenseFormConfig = {
  kind: LicenseKind;
  title: string;
  numberLabel: string;
  numberPlaceholder: string;
  numberRequiredMessage: string;
  numberInvalidMessage: string;
};

/** SMS upozornenie uložené na serveri (celé telefónne číslo server nevracia). */
export type LicenseReminder = {
  kind: "FIREARM" | "SBS";
  /** Dátum platnosti ako RRRR-MM-DD. */
  validUntil: string;
  phoneLast3: string;
};

/**
 * Údaje preukazu uložené len v telefóne (expo-secure-store), na server nejdú.
 * Server dostane iba dátum platnosti a telefón pre SMS upozornenie.
 */
export type StoredLicense = {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  /** Dátum platnosti ako RRRR-MM-DD. */
  validUntil: string;
};

/** Stav platnosti preukazu podľa zostávajúcich dní. */
export type LicenseStatusKind = "valid" | "soon" | "expired";

export type LicenseStatus = {
  kind: LicenseStatusKind;
  /** Zostávajúce dni; záporné číslo = počet dní po vypršaní. */
  daysLeft: number;
};

/** Adresy obrazoviek pre typované trasy Expo Routeru. */
export type LicenseHref = "/firearm-license" | "/sbs-license";
export type LicenseDetailHref =
  | "/license-detail/firearm"
  | "/license-detail/sbs";

export type LicenseCardItem = {
  id: string;
  title: string;
  kind: LicenseKind;
  icon: ReactNode;
  /** Formulár údajov a SMS upozornenia. */
  href: LicenseHref;
  /** Detail preukazu (číslo, platnosť, stav). */
  detailHref: LicenseDetailHref;
};
