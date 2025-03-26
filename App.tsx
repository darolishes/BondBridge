import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CardScreen from "./src/screens/CardScreen";
import ImportScreen from "./src/screens/ImportScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CardScreen} />
        <Tab.Screen name="Import" component={ImportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
