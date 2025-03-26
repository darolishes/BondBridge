import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStackParamList } from "./types";
import { useTheme } from "@theme/hooks";
import CardListScreen from "@features/cards/screens/CardListScreen";
import CardDetailScreen from "@features/cards/screens/CardDetailScreen";
import CardCreateScreen from "@features/cards/screens/CardCreateScreen";
import CardEditScreen from "@features/cards/screens/CardEditScreen";

/**
 * CardStack
 * ---------
 * Stack-Navigation für die Karten-Funktionalität.
 * Ermöglicht das Anzeigen, Erstellen und Bearbeiten von Karten.
 *
 * @component
 * @navigation
 */

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
        animation: "slide_from_right",
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
