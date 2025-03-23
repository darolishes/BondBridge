import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number;
  testID?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      <View
        style={[
          styles.progress,
          {
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF9999', // accent2 color from the design
    borderRadius: 2,
  },
});

export default ProgressBar;
