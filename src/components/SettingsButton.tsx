import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}
      accessibilityLabel="Settings"
      accessibilityRole="button"
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      <Icon name="settings-outline" size={24} color="#333333" />
    </TouchableOpacity>
  );
};

export default SettingsButton;
