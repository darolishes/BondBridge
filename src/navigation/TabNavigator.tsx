import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootTabParamList } from "./types";
import { CardStack } from "./CardStack";
import { ImportExportStack } from "./ImportExportStack";
import { SettingsStack } from "./SettingsStack";
import { useTheme } from "@theme/ThemeProvider";

/**
 * TabNavigator
 * ------------
 * Hauptnavigation der App mit Bottom-Tabs für die wichtigsten Funktionsbereiche.
 * Integriert die verschiedenen Feature-Stacks als Tabs.
 *
 * @component
 * @navigation
 */

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Bottom-Tab-Navigator als Hauptnavigation der App
 */
export const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="CardTab"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.card.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="CardTab"
        component={CardStack}
        options={{
          tabBarLabel: "Karten",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="layer-group" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ImportExportTab"
        component={ImportExportStack}
        options={{
          tabBarLabel: "Import/Export",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="exchange-alt" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: "Einstellungen",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" size={size - 2} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
