import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { CardViewScreenProps } from '@types';
import { Layout } from '@/components/layout';
import { useTheme } from '@theme/ThemeContext';

const CardViewScreen: React.FC<CardViewScreenProps> = ({ route }) => {
  const { theme } = useTheme();
  const { setId } = route.params;

  return (
    <Layout title="Card Set">
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Viewing card set: {setId}</Text>
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

export default CardViewScreen;
