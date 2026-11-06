import type { LicenseFormConfig } from "@/types/license";
import { isValidPhone } from "@/utils/phone";
import { z } from "zod";

/** Zod schéma formulára preukazu; hláška k číslu preukazu závisí od typu preukazu. */
const NAME_PATTERN = /^\p{L}[\p{L} '-]*$/u;
const LICENSE_NUMBER_PATTERN = /^[\p{L}\d][\p{L}\d /-]*$/u;

function nameSchema(requiredMessage: string, label: string) {
  return z
    .string()
    .trim()
    .min(1, requiredMessage)
    .min(3, `${label} musí mať aspoň 3 znaky.`)
    .max(50, `${label} môže mať najviac 50 znakov.`)
    .regex(NAME_PATTERN, `${label} môže obsahovať iba písmená.`);
}

export function createLicenseSchema(config: LicenseFormConfig) {
  return z.object({
    firstName: nameSchema("Zadaj meno.", "Meno"),
    lastName: nameSchema("Zadaj priezvisko.", "Priezvisko"),
    licenseNumber: z
      .string()
      .trim()
      .min(1, config.numberRequiredMessage)
      .min(5, config.numberInvalidMessage)
      .max(20, config.numberInvalidMessage)
      .regex(LICENSE_NUMBER_PATTERN, config.numberInvalidMessage),
    validUntil: z.date({ error: "Vyber dátum platnosti." }),
    phone: z.string().refine(isValidPhone, "Zadaj platné telefónne číslo."),
  });
}
