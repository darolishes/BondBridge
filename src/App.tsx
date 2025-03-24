import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from '@theme/ThemeContext';
import CardViewScreen from './screens/CardViewScreen';
import { RootStackParamList } from './types';
import Layout from './components/layout/Layout';
import './i18n/i18n';
import { ConfigProvider } from './contexts/ConfigContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Assume HomeScreen exists
const HomeScreen = () => <></>;

const NavigationContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'BondBridge',
          }}
        />
        <Stack.Screen
          name="CardView"
          component={CardViewScreen}
          options={{
            title: 'Card Set',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <NavigationContainer>
          <NavigationContent />
        </NavigationContainer>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
