import LicenseFormScreen from "@/components/forms/LicenseFormScreen";
import { SBS_LICENSE_CONFIG } from "@/constants/license-forms";

export default function SbsLicenseScreen() {
  return <LicenseFormScreen config={SBS_LICENSE_CONFIG} />;
}
