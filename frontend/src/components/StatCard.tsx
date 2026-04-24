import { Text, View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  value: string;
  accent?: string;
};

export function StatCard({ title, value, accent = colors.primary }: Props) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 110,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        borderLeftWidth: 5,
        borderLeftColor: accent
      }}
    >
      <Text style={{ color: colors.textMuted, marginBottom: 8 }}>{title}</Text>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}
