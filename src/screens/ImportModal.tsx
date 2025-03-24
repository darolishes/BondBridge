import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ImportModalProps } from '@types';
import { useTheme } from '@theme/ThemeContext';

const ImportModal: React.FC<ImportModalProps> = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Import Card Set</Text>
      </View>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Import functionality coming soon...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default ImportModal;
