import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStackParamList } from "./types";
import CardScreen from "@features/card-management/screens/CardScreen";
import CardListScreen from "@features/card-management/screens/CardListScreen";
import { useTheme } from "@theme/ThemeProvider";

/**
 * CardStack
 * ---------
 * Stack-Navigation für die Karten-Funktionalität.
 * Ermöglicht das Anzeigen, Erstellen und Bearbeiten von Karten.
 *
 * @component
 * @navigation
 */

// Placeholder-Komponenten, bis die tatsächlichen Screens implementiert sind
const CardDetailScreen = () => null;
const CardCreateScreen = () => null;
const CardEditScreen = () => null;

const Stack = createNativeStackNavigator<CardStackParamList>();

/**
 * Stack-Navigator für die Karten-Funktionalität
 */
export const CardStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="CardList"
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
        name="CardList"
        component={CardListScreen}
        options={{ title: "Meine Karten" }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={{ title: "Kartendetails" }}
      />
      <Stack.Screen
        name="CardCreate"
        component={CardCreateScreen}
        options={{ title: "Neue Karte erstellen" }}
      />
      <Stack.Screen
        name="CardEdit"
        component={CardEditScreen}
        options={{ title: "Karte bearbeiten" }}
      />
    </Stack.Navigator>
  );
};
