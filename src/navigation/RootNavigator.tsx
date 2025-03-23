import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import SettingsButton from '../components/SettingsButton';

// Import screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import CardViewScreen from '../screens/CardViewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ImportModal from '../screens/ImportModal';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}
    >
      {/* Main Stack */}
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'BondBridge',
            headerRight: () => <SettingsButton />,
          }}
        />
        <Stack.Screen
          name="CardView"
          component={CardViewScreen}
          options={({ route }) => ({
            title: route.params.initialCategory || 'Cards',
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Group>

      {/* Modal Stack */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ImportModal"
          component={ImportModal}
          options={{
            title: 'Import Card Set',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
