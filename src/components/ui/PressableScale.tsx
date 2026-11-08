import type { ReactNode } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

type PressableScaleProps = Omit<PressableProps, "style" | "children"> & {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * Pressable s jemným stlačením – odozva na dotyk namiesto zmeny priehľadnosti.
 * Bez `onPress` je prvok neaktívny (bez odozvy a ohlásený ako disabled).
 */
export default function PressableScale({
  style,
  children,
  onPress,
  disabled,
  accessibilityState,
  ...rest
}: PressableScaleProps) {
  const isDisabled = disabled ?? !onPress;

  return (
    <Pressable
      {...rest}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityState={{ ...accessibilityState, disabled: isDisabled }}
      style={({ pressed }) => [
        style,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.92 },
      ]}
    >
      {children}
    </Pressable>
  );
}
