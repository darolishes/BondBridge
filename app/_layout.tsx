import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@theme/theme-context';
import Header from '@components/layout/header';

const screens = {
  index: { title: 'BondBridge' },
  'cardview/[id]': { title: 'Kartenset' },
  settings: { title: 'Einstellungen' },
} as const;

export default function Layout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          header: ({ route }) => (
            <Header
              title={
                route.name === 'index'
                  ? 'BondBridge'
                  : screens[route.name as keyof typeof screens].title
              }
              showBack={route.name !== 'index'}
              showMenu={route.name === 'index'}
            />
          ),
        }}
      >
        {Object.entries(screens).map(([name, options]) => (
          <Stack.Screen key={name} name={name} options={options} />
        ))}
      </Stack>
    </ThemeProvider>
  );
}
