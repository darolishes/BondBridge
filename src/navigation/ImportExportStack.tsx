import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImportExportStackParamList } from "./types";
import { useTheme } from "@theme/ThemeProvider";
import ImportScreen from "@features/data-import-export/screens/ImportScreen";

/**
 * ImportExportStack
 * -----------------
 * Stack-Navigation für die Import/Export-Funktionalität.
 * Ermöglicht Datenaustausch mit externen Quellen und anderen Nutzern.
 *
 * @component
 * @navigation
 */

// Placeholder-Komponenten, bis die tatsächlichen Screens implementiert sind
const ImportExportHomeScreen = () => null;
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
        component={ImportScreen}
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
