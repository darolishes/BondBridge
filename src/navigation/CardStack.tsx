import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStackParamList } from "./types";
import { useTheme } from "@theme/hooks";
import { CardScreen } from "@features/conversation-cards/screens";

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
        component={CardScreen}
        options={{ title: "Meine Karten" }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardScreen}
        options={{ title: "Kartendetails" }}
      />
      <Stack.Screen
        name="CardCreate"
        component={CardScreen}
        options={{ title: "Neue Karte erstellen" }}
      />
      <Stack.Screen
        name="CardEdit"
        component={CardScreen}
        options={{ title: "Karte bearbeiten" }}
      />
    </Stack.Navigator>
  );
};
