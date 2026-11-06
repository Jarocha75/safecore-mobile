import type { LicenseFormConfig } from "@/types/license";

export const FIREARM_LICENSE_CONFIG: LicenseFormConfig = {
  kind: "firearm",
  title: "Zbrojný preukaz",
  numberLabel: "Číslo zbrojného preukazu",
  numberPlaceholder: "napr. ZP 123456",
  numberRequiredMessage: "Zadaj číslo zbrojného preukazu.",
  numberInvalidMessage:
    "Číslo zbrojného preukazu musí mať 5 až 20 znakov (písmená, číslice).",
};

export const SBS_LICENSE_CONFIG: LicenseFormConfig = {
  kind: "sbs",
  title: "Preukaz SBS",
  numberLabel: "Číslo preukazu SBS",
  numberPlaceholder: "napr. SBS 123456",
  numberRequiredMessage: "Zadaj číslo preukazu SBS.",
  numberInvalidMessage:
    "Číslo preukazu SBS musí mať 5 až 20 znakov (písmená, číslice).",
};
