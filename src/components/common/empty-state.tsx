import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  testID?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No card sets found',
  message = 'Import a card set to start your relationship journey',
  icon = 'heart-outline',
  testID = 'empty-state',
  buttonTitle,
  onButtonPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.xl }, style]} testID={testID}>
      <Ionicons name={icon} size={64} color={theme.colors.primary} />
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="primary"
          style={styles.button}
        />
      )}
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
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
