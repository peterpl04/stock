import { ActivityIndicator, View } from "react-native";
import { colors } from "../theme/colors";

export function LoadingOverlay() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15,20,26,0.6)"
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
