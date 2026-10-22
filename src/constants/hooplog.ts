import { StyleSheet } from "react-native";
export const colors = {
  cream: "#FFFBF0",
  white: "#FFFFFF",
  ink: "#2D211B",
  muted: "#786052",
  orange: "#FF6B00",
  rust: "#A74300",
  border: "#EBD5BF",
  peach: "#FFF0E6",
  court: "#FFF2C3",
  good: "#B9EF91",
  low: "#FF6B58",
  empty: "#E9E3D8",
};
export const ui = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
  },
  text: { fontSize: 15, color: colors.muted, lineHeight: 23 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: colors.muted,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
});
