import { NavigationContainer, Theme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store";
import { hydrateAuth } from "./src/store/auth.slice";
import { colors } from "./src/theme/colors";

const navTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.warning
  }
};

function Bootstrap() {
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return <RootNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Bootstrap />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
