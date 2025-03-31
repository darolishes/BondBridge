import { Tabs } from 'expo-router';
import { Heart, Settings, ChartBar as BarChart } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 0 : 20,
          left: Platform.OS === 'web' ? 0 : 20,
          right: Platform.OS === 'web' ? 0 : 20,
          backgroundColor:
            Platform.OS === 'web' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
          borderTopColor: 'transparent',
          height: 65,
          borderRadius: Platform.OS === 'web' ? 0 : 20,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontFamily: 'Roboto-Regular',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarBackground: () =>
          Platform.OS !== 'web' ? (
            <BlurView
              tint="light"
              intensity={80}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 20,
              }}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
