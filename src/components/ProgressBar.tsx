import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';

interface ProgressBarProps {
  progress: number;
  testID?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, testID }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]} testID={testID}>
      <View
        style={[
          styles.progress,
          {
            backgroundColor: theme.colors.primary,
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    flex: 1,
    height: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressBar;
