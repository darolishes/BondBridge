import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/layout';
import { useTheme } from '@theme/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Layout title="Settings">
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Settings coming soon...</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default SettingsScreen;
