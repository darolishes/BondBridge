import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { colors, spacing, radius } from '@/theme';

interface CardProps {
  variant?: 'basic' | 'interactive' | 'elevated';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Card = React.memo(({
  variant = 'basic',
  children,
  style,
  onPress,
}: CardProps) => {
  const Component = onPress || variant === 'interactive' ? TouchableOpacity : View;

  return (
    <Component
      style={[
        styles.base,
        styles[variant],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {children}
    </Component>
  );
});

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.background.paper,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  basic: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  interactive: {
    borderWidth: 1,
    borderColor: colors.border.light,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: [{ scale: 1.02 }],
        },
      },
      default: {},
    }),
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});