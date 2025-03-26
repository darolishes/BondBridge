import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme, useNavigationTheme } from "./theme";
import { TabNavigator } from "./navigation";
import { navigationRef } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import StoreProvider from "./store/providers/StoreProvider";

/**
 * App
 * ---
 * Haupteinstiegspunkt der BondBridge-Anwendung.
 * Integriert Theming, Navigation, StatusBar und Redux Store.
 *
 * @component
 */

/**
 * App-Kern mit aktivierter ThemeProvider-Umgebung
 */
const AppCore = () => {
  const { theme, isDark } = useTheme();
  const navigationTheme = useNavigationTheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

/**
 * Haupteinstiegspunkt der Anwendung
 */
export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppCore />
      </ThemeProvider>
    </StoreProvider>
  );
}
