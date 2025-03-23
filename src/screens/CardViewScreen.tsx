import React from 'react';
import { View, Text } from 'react-native';
import type { CardViewScreenProps } from '../types/navigation';

const CardViewScreen: React.FC<CardViewScreenProps> = ({ route }) => {
  return (
    <View>
      <Text>Card View Screen</Text>
      <Text testID="set-id">{route.params.setId}</Text>
    </View>
  );
};

export default CardViewScreen;
