import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/theme/ThemeProvider";
import { Navigation } from "./src/navigation";
import { navigationRef } from "./src/navigation/navigationRef";

/**
 * App-Kern mit aktivierter ThemeProvider-Umgebung
 */
const AppCore = () => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Navigation />
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
