import type { LegalLink } from "@/types/profile";

/** Zásady ochrany osobných údajov na webe (odkaz pri súhlase so SMS). */
export const PRIVACY_POLICY_URL = "https://safecore.sk/ochrana-osobnych-udajov";

/** Právne dokumenty na webe, ktoré sa z appky otvárajú v prehliadači. */
export const LEGAL_LINKS: LegalLink[] = [
  {
    id: "terms",
    title: "Obchodné podmienky",
    url: "https://safecore.sk/obchodne-podmienky",
    icon: "document-text-outline",
  },
  {
    id: "privacy",
    title: "Ochrana osobných údajov",
    url: PRIVACY_POLICY_URL,
    icon: "shield-checkmark-outline",
  },
];
