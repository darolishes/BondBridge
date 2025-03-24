import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '@theme/theme-context';

export interface ThemeToggleProps {
  onPress: () => void;
  testID?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onPress, testID }) => {
  const { theme, isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceHighlight,
        },
      ]}
      testID={testID}
    >
      <MaterialCommunityIcons
        name={isDark ? 'weather-night' : 'weather-sunny'}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
