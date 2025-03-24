import React from 'react';
import { View, Text } from 'react-native';
import type { SettingsScreenProps } from '@types';
import { useTheme } from '@theme/ThemeContext';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;
