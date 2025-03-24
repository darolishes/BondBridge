import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types';
import { useTheme } from '@theme/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}
      style={{ marginRight: 8 }}
      testID="settings-button"
    >
      <Icon name="settings-outline" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
