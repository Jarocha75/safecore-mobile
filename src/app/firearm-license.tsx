import LicenseFormScreen from "@/components/forms/LicenseFormScreen";
import { FIREARM_LICENSE_CONFIG } from "@/constants/license-forms";

export default function FirearmLicenseScreen() {
  return <LicenseFormScreen config={FIREARM_LICENSE_CONFIG} />;
}
