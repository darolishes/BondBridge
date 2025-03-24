import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '@components/common/empty-state';
import ThemeToggle from '@components/common/theme-toggle';
import { styles } from '../styles';

interface WelcomeStateProps {
  title: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  showThemeToggle?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({
  title,
  message,
  icon = 'heart-outline',
  showThemeToggle = true,
  style,
}) => (
  <View style={style}>
    <EmptyState title={title} message={message} icon={icon} />
    {showThemeToggle && (
      <View style={styles.themeToggleContainer}>
        <ThemeToggle showLabels enableSystemTheme />
      </View>
    )}
  </View>
);
