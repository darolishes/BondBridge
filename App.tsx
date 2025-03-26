import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme, useNavigationTheme } from "./src/theme";
import { TabNavigator } from "./src/navigation";
import { navigationRef } from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";

/**
 * App
 * ---
 * Haupteinstiegspunkt der BondBridge-Anwendung.
 * Integriert Theming, Navigation und StatusBar.
 *
 * @component
 * @root
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
    <ThemeProvider>
      <AppCore />
    </ThemeProvider>
  );
}
