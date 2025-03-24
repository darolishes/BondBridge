import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import type { ImportResult } from '@types';

interface ImportButtonProps {
  onPress: () => Promise<ImportResult>;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onPress }) => {
  const { theme } = useTheme();

  const handlePress = async () => {
    await onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: theme.colors.surface }]}>Import Card Set</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImportButton;
