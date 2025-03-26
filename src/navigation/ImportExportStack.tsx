import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImportExportStackParamList } from "./types";
import { useTheme } from "@theme/useTheme";

// Placeholder-Komponenten, bis die tatsächlichen Screens implementiert sind
const ImportExportHomeScreen = () => null;
const ImportDataScreen = () => null;
const ExportDataScreen = () => null;

const Stack = createNativeStackNavigator<ImportExportStackParamList>();

/**
 * Stack-Navigator für die Import/Export-Funktionalität
 */
export const ImportExportStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="ImportExportHome"
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
        name="ImportExportHome"
        component={ImportExportHomeScreen}
        options={{ title: "Import & Export" }}
      />
      <Stack.Screen
        name="ImportData"
        component={ImportDataScreen}
        options={{ title: "Karten importieren" }}
      />
      <Stack.Screen
        name="ExportData"
        component={ExportDataScreen}
        options={{ title: "Karten exportieren" }}
      />
    </Stack.Navigator>
  );
};
