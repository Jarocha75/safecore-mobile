import { useLocalSearchParams } from "expo-router";

import LicenseDetailScreen from "@/components/screens/LicenseDetailScreen";
import type { LicenseKind } from "@/types/license";

export default function LicenseDetailRoute() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  if (kind !== "firearm" && kind !== "sbs") return null;
  return <LicenseDetailScreen kind={kind as LicenseKind} />;
}
