import type { ReactNode } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

type PressableScaleProps = Omit<PressableProps, "style" | "children"> & {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/** Pressable s jemným stlačením – odozva na dotyk namiesto zmeny priehľadnosti. */
export default function PressableScale({
  style,
  children,
  ...rest
}: PressableScaleProps) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        style,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.92 },
      ]}
    >
      {children}
    </Pressable>
  );
}
