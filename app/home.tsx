import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@components/Card';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Welcome to BondBridge">
        <Text>Your flashcard learning journey begins here!</Text>
      </Card>
    </View>
  );
}
