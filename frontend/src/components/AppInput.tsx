import { Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../theme/colors";

type Props = TextInputProps & {
  label: string;
};

export function AppInput({ label, ...rest }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: colors.textMuted, marginBottom: 6 }}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surfaceAlt,
          color: colors.text,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 10
        }}
        {...rest}
      />
    </View>
  );
}
