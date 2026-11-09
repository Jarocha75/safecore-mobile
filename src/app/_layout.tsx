import RootNavigator from "@/components/navigation/RootNavigator";
import { SessionProvider } from "@/context/SessionContext";

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
