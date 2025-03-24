import React from 'react';
import { View, Text } from 'react-native';
import type { CardViewScreenProps } from '@types';
import { useTheme } from '@theme/ThemeContext';

const CardViewScreen: React.FC<CardViewScreenProps> = ({ route }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Card View Screen</Text>
      <Text testID="set-id">{route.params.setId}</Text>
    </View>
  );
};

export default CardViewScreen;
