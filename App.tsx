import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";
import CardViewScreen from "./src/screens/CardViewScreen";
import { RootStackParamList } from "./src/types/navigation";
import "./src/i18n/i18n";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.text,
        headerLargeStyle: {
          backgroundColor: theme.colors.background,
        },
        headerLargeTitleStyle: {
          color: theme.colors.text,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "BondBridge",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="CardView"
        component={CardViewScreen}
        options={{
          title: "Card Set",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <NavigationContent />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
