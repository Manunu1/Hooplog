import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors as c, ui } from "@/constants/hooplog";
export function Screen({
  children,
  header = true,
}: PropsWithChildren<{
  header?: boolean;
}>) {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.safe}>
      {header && (
        <View style={s.header}>
          <Text style={s.brand}>
            HOOPLOG<Text style={{ color: c.orange }}>.</Text>
          </Text>
          <Text style={ui.label}>BY HOOPERS</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={s.content}>{children}</ScrollView>
    </SafeAreaView>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={s.buttonText}>{title}</Text>
    </Pressable>
  );
}
export function Demo({
  children = "Vista previa · Datos de ejemplo",
}: PropsWithChildren) {
  return <Text style={s.notice}>{children}</Text>;
}
export function Stats({
  items,
}: {
  items: {
    label: string;
    value: string | number;
  }[];
}) {
  return (
    <View style={s.stats}>
      {items.map((item) => (
        <View key={item.label} style={s.stat}>
          <Text style={s.value}>{item.value}</Text>
          <Text style={s.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.cream },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: c.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: c.rust,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  content: {
    padding: 24,
    gap: 24,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    flexGrow: 1,
    paddingBottom: 36,
  },
  button: {
    minHeight: 58,
    padding: 16,
    borderRadius: 14,
    backgroundColor: c.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  secondary: {
    backgroundColor: c.cream,
    borderWidth: 1,
    borderColor: c.orange,
  },
  buttonText: {
    color: c.ink,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  notice: {
    color: c.rust,
    backgroundColor: c.peach,
    padding: 12,
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  stat: { flex: 1, minWidth: 74, alignItems: "center", paddingVertical: 8 },
  value: { color: c.rust, fontSize: 30, fontWeight: "900", letterSpacing: -1 },
  statLabel: {
    color: c.muted,
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
});
