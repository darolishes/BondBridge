import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsButton } from '@components/settings/settings-button';

// Import screens
import HomeScreen from '@app';
import CardViewScreen from '@screens/card-view-screen';
import SettingsScreen from '@screens/settings-screen';
import { ImportModal } from '@screens/import-modal';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <SettingsButton
              title="Settings"
              icon="cog"
              onPress={() => {}}
              testID="settings-button"
            />
          ),
        }}
      />
      <Stack.Screen name="CardView" component={CardViewScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="ImportModal"
        component={(props: NativeStackScreenProps<RootStackParamList, 'ImportModal'>) => (
          <ImportModal {...props} onClose={() => props.navigation.goBack()} />
        )}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
