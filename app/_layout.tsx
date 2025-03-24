import { Stack } from 'expo-router';
import { ThemeProvider } from '@theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import Header from '@components/layout/Header';

export default function Layout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          header: props => (
            <Header
              title={props.route.name === 'index' ? 'BondBridge' : props.route.name}
              showBack={props.route.name !== 'index'}
              showMenu={props.route.name === 'index'}
            />
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'BondBridge',
          }}
        />
        <Stack.Screen
          name="cardview/[id]"
          options={{
            title: 'Kartenset',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Einstellungen',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
