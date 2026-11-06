import type { ReactNode } from "react";

/** Hodnoty formulára preukazu (zbrojný preukaz aj preukaz SBS). */
export type LicenseFormValues = {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  validUntil: Date | null;
  phone: string;
};

export type LicenseFormErrors = Partial<Record<keyof LicenseFormValues, string>>;

export type LicenseKind = "firearm" | "sbs";

/** Rozdiely medzi typmi preukazov – všetko ostatné je spoločné. */
export type LicenseFormConfig = {
  kind: LicenseKind;
  title: string;
  numberLabel: string;
  numberPlaceholder: string;
  numberRequiredMessage: string;
};

/** Adresy obrazoviek pre typované trasy Expo Routeru. */
export type LicenseHref = "/firearm-license" | "/sbs-license";

export type LicenseCardItem = {
  id: string;
  title: string;
  icon: ReactNode;
  href: LicenseHref;
};
