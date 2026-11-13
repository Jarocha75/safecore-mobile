import { useNetInfo } from "@react-native-community/netinfo";

/**
 * Či zariadenie hlási pripojenie. Pri neznámom stave (null) sa berie ako online;
 * rozhodujúca je aj tak skutočná chyba požiadavky.
 */
export function useIsOnline() {
  const { isConnected, isInternetReachable } = useNetInfo();
  return isConnected !== false && isInternetReachable !== false;
}
