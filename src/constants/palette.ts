/**
 * Značková paleta SafeCore (tmavý motív).
 * Odvodená z loga: podklad loga, oceľový štít a jasná modrá z nápisu.
 */
export const Palette = {
  background: "#121824", // podklad loga – logo s ním splýva
  surface: "#1A2233", // karty a skupiny
  surfaceRaised: "#232E45", // zvýraznená plocha (písmeno preukazu, vstupy)
  border: "#2B3750", // jemný delič
  primary: "#4DA3FF",
  primarySoft: "rgba(77, 163, 255, 0.10)",
  primaryMuted: "rgba(77, 163, 255, 0.16)",
  primaryBorder: "rgba(77, 163, 255, 0.32)",
  onPrimary: "#08121F", // text na primárnom tlačidle (kontrast 8:1)
  success: "#34D399",
  successMuted: "rgba(52, 211, 153, 0.15)",
  successBorder: "rgba(52, 211, 153, 0.3)",
  danger: "#F87171",
  dangerSoft: "rgba(248, 113, 113, 0.10)",
  dangerBorder: "rgba(248, 113, 113, 0.3)",
  stamp: "#E3B04B", // mosadz – len pre stav platnosti / členstva
  stampSoft: "rgba(227, 176, 75, 0.12)",
  stampBorder: "rgba(227, 176, 75, 0.35)",
  logoRing: "rgba(80, 160, 225, 0.4)",
  text: "#F4F7FB",
  textSecondary: "#8E9BB3",
  textButtonSecondary: "#C9D3E3", // oceľová
  icon: "#6F7D96",
} as const;
