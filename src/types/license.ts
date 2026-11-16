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

/** Adresy obrazoviek pre typované trasy Expo Routeru. */
export type LicenseHref = "/firearm-license" | "/sbs-license";

export type LicenseCardItem = {
  id: string;
  title: string;
  kind: LicenseKind;
  icon: ReactNode;
  href: LicenseHref;
};
