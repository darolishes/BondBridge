import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No card sets found',
  message = 'Import a card set to start your relationship journey',
  icon = 'heart-outline',
  testID = 'empty-state',
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.xl }]} testID={testID}>
      <Ionicons name={icon} size={64} color={theme.colors.primary} />
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
});

export default EmptyState;
