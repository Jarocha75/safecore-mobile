import { Redirect } from "expo-router";

import WelcomeScreen from "@/components/screens/WelcomeScreen";
import { useSession } from "@/context/SessionContext";

export default function Index() {
  const { session } = useSession();
  if (session) return <Redirect href="/home" />;
  return <WelcomeScreen />;
}
