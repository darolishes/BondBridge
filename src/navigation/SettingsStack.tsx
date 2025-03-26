import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "./types";
import { useTheme } from "@theme/ThemeProvider";

/**
 * SettingsStack
 * -------------
 * Stack-Navigation für die Einstellungen der App.
 * Ermöglicht die Anpassung von Appearance, Benachrichtigungen und anderen Präferenzen.
 *
 * @component
 * @navigation
 */

// Placeholder-Komponenten, bis die tatsächlichen Screens implementiert sind
const SettingsHomeScreen = () => null;
const ThemeSettingsScreen = () => null;
const NotificationSettingsScreen = () => null;
const AboutScreen = () => null;

const Stack = createNativeStackNavigator<SettingsStackParamList>();

/**
 * Stack-Navigator für die Einstellungen
 */
export const SettingsStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="SettingsHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "500",
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHomeScreen}
        options={{ title: "Einstellungen" }}
      />
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeSettingsScreen}
        options={{ title: "Design anpassen" }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{ title: "Benachrichtigungen" }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "Über BondBridge" }}
      />
    </Stack.Navigator>
  );
};
