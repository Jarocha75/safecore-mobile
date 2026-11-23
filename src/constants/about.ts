import Constants from "expo-constants";

import type { AboutLink } from "@/types/profile";

export const COMPANY_NAME = "SafeCore, s.r.o.";

/** Verzia appky z `app.json` (`expo.version`). */
export const APP_VERSION = Constants.expoConfig?.version ?? "";

const CONTACT_EMAIL = "info@safecore.sk";
const CONTACT_PHONE = "+421 949 433 262";

/** Kontakty a odkazy na webe SafeCore (zrkadlí `app/kontakt` a `app/Footer.tsx` vo webe). */
export const ABOUT_LINKS: AboutLink[] = [
  {
    id: "email",
    title: "E-mail",
    subtitle: CONTACT_EMAIL,
    url: `mailto:${CONTACT_EMAIL}`,
    icon: "mail-outline",
    external: false,
  },
  {
    id: "phone",
    title: "Telefón",
    subtitle: CONTACT_PHONE,
    url: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`,
    icon: "call-outline",
    external: false,
  },
  {
    id: "web",
    title: "Web SafeCore",
    subtitle: "safecore.sk",
    url: "https://safecore.sk",
    icon: "globe-outline",
    external: true,
  },
  {
    id: "company",
    title: "O firme",
    url: "https://safecore.sk/o-firme",
    icon: "business-outline",
    external: true,
  },
];
