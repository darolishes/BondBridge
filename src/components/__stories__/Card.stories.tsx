import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Card } from '@components/card';
import type { Props as CardProps } from '@components/card/types';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default {
  title: 'Components/Card',
  component: Card,
};

export const Basic = () => (
  <Card title="Basic Card">
    <View style={styles.content}>
      <Text style={styles.text}>This is a basic card with simple content.</Text>
    </View>
  </Card>
);

export const WithCustomStyling = () => (
  <Card
    title="Custom Styled Card"
    style={{ backgroundColor: '#e7f5ff' }}
    contentStyle={{ padding: 20 }}
  >
    <Text style={styles.text}>A card with custom styling.</Text>
  </Card>
);

export const LoadingState = () => (
  <Card title="Loading Card" isLoading>
    <View style={styles.content}>
      <Text style={styles.text}>This content will be hidden while loading.</Text>
    </View>
  </Card>
);

export const FlippableCard = () => (
  <Card
    title="Flip Me!"
    enableFlip
    backContent={
      <View style={styles.content}>
        <Text style={styles.text}>This is the back of the card!</Text>
      </View>
    }
  >
    <View style={styles.content}>
      <Text style={styles.text}>Click to see what's on the back!</Text>
    </View>
  </Card>
);

export const SwipeableCard = () => {
  const handleSwipeLeft = useCallback(() => {
    console.log('Card swiped left');
  }, []);

  const handleSwipeRight = useCallback(() => {
    console.log('Card swiped right');
  }, []);

  return (
    <Card
      title="Swipe Me"
      enableSwipe
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Swipe right to accept or left to reject.</Text>
      </View>
    </Card>
  );
};

export const FullyInteractive = () => {
  const handleSwipeLeft = useCallback(() => {
    console.log('Card swiped left');
  }, []);

  const handleSwipeRight = useCallback(() => {
    console.log('Card swiped right');
  }, []);

  return (
    <Card
      title="Interactive Card"
      enableFlip
      enableSwipe
      enableHaptics
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      backContent={
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      }
    >
      <View style={styles.content}>
        <Text style={styles.text}>
          This card supports flipping, swiping, and haptic feedback. Tap to flip, swipe to dismiss.
        </Text>
      </View>
    </Card>
  );
};

export const AccessibleCard = () => (
  <Card
    title="Accessible Card"
    accessibility={{
      label: 'Interactive card example',
      hint: 'Double tap to flip the card',
      role: 'button',
    }}
  >
    <View style={styles.content}>
      <TextInput style={styles.input} placeholder="Name" accessibilityLabel="Name input field" />
      <TextInput style={styles.input} placeholder="Email" accessibilityLabel="Email input field" />
      <Button title="Submit" onPress={() => {}} accessibilityLabel="Submit form button" />
    </View>
  </Card>
);
