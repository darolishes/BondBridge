import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  return (
    <View style={styles.container} testID={testID}>
      <Ionicons name={icon} size={64} color="#FF9999" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default EmptyState;
