import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/theme-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface EmptyStateProps {
  title: string;
  message: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={64}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
