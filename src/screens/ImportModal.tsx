import React from 'react';
import { View, Text } from 'react-native';
import type { ImportModalProps } from '@types';
import { useTheme } from '@theme/ThemeContext';

const ImportModal: React.FC<ImportModalProps> = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Import Modal</Text>
    </View>
  );
};

export default ImportModal;
