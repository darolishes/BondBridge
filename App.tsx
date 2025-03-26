import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/theme/ThemeProvider";
import { Navigation, createNavigationTheme } from "./src/navigation";
import { navigationRef } from "./src/navigation/navigationRef";
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
  const navigationTheme = createNavigationTheme(theme);

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <Navigation />
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
