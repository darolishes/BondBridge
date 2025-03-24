import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated } from 'react-native';
import { Card } from '../card';

const styles = StyleSheet.create({
  memoryCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  memorySymbol: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  flashcard: {
    padding: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answerText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4dabf7',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#868e96',
  },
  form: {
    padding: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  taskCard: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 14,
    color: '#868e96',
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskPriority: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  taskHint: {
    fontSize: 12,
    color: '#868e96',
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dee2e6',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#868e96',
    marginBottom: 12,
  },
  profileHint: {
    fontSize: 12,
    color: '#adb5bd',
  },
  profileDetails: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4dabf7',
  },
  statLabel: {
    fontSize: 14,
    color: '#868e96',
  },
  wizardCard: {
    padding: 20,
    alignItems: 'center',
  },
  wizardIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  progressDots: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e9ecef',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4dabf7',
    transform: [{ scale: 1.2 }],
  },
  wizardHint: {
    fontSize: 14,
    color: '#868e96',
    marginTop: 8,
  },
  expandableContent: {
    overflow: 'hidden',
  },
  expandableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expandableText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  expandIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  expandHint: {
    fontSize: 14,
    color: '#4dabf7',
  },
  stackedCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  stackedCardContent: {
    padding: 20,
    alignItems: 'center',
  },
  stackedCardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#495057',
  },
  accessibleContent: {
    padding: 20,
    alignItems: 'center',
  },
  accessibleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#495057',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  metricsContainer: {
    padding: 20,
  },
  metricsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  metricsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#495057',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 16,
    color: '#495057',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4dabf7',
  },
});

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 16, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    notes: 'A versatile card component with flip, swipe, and haptic feedback features.',
  },
};

export const Basic = () => (
  <Card title="Basic Card">
    <Text>This is a basic card with simple content.</Text>
  </Card>
);

export const WithCustomStyling = () => (
  <Card title="Custom Styled Card" style={{ backgroundColor: '#e7f5ff', borderRadius: 16 }}>
    <Text>A card with custom background color and border radius.</Text>
  </Card>
);

export const LoadingState = () => (
  <Card title="Loading Card" isLoading>
    <Text>This content will be hidden while loading.</Text>
  </Card>
);

export const FlippableCard = () => (
  <Card
    title="Flip Me!"
    enableFlip
    backContent={
      <View style={styles.flashcard}>
        <Text style={styles.answerText}>This is the back of the card!</Text>
      </View>
    }
  >
    <View style={styles.flashcard}>
      <Text style={styles.questionText}>Click to see what's on the back!</Text>
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
      <View style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>Swipe Task</Text>
          <Text style={styles.taskTime}>Now</Text>
        </View>
        <Text style={styles.taskDescription}>Swipe right to complete or left to dismiss</Text>
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
        <View style={styles.profileDetails}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>
      }
    >
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileTitle}>Senior Developer</Text>
        <Text style={styles.profileHint}>Tap to flip, swipe to dismiss</Text>
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
    }}
  >
    <View style={styles.form}>
      <Text style={styles.formTitle}>Contact Form</Text>
      <TextInput style={styles.input} placeholder="Name" accessibilityLabel="Name input field" />
      <TextInput style={styles.input} placeholder="Email" accessibilityLabel="Email input field" />
      <Button title="Submit" onPress={() => {}} accessibilityLabel="Submit form button" />
    </View>
  </Card>
);

export const MemoryGameCard = () => (
  <Card
    enableFlip
    enableHaptics
    style={{ width: 120, height: 160 }}
    backContent={
      <View style={styles.memoryCard}>
        <Text style={styles.memorySymbol}>🌟</Text>
      </View>
    }
  >
    <View style={styles.memoryCard}>
      <Text style={styles.memorySymbol}>❓</Text>
    </View>
  </Card>
);

export const TaskCard = () => (
  <Card
    title="Project Review"
    enableSwipe
    onSwipeLeft={() => console.log('Task postponed')}
    onSwipeRight={() => console.log('Task completed')}
  >
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>Code Review</Text>
        <Text style={styles.taskTime}>2:30 PM</Text>
      </View>
      <Text style={styles.taskDescription}>
        Review pull request #123: Add card animation features
      </Text>
      <View style={styles.taskFooter}>
        <View style={[styles.taskPriority, { backgroundColor: '#ff6b6b' }]} />
        <Text style={styles.taskHint}>High Priority</Text>
      </View>
    </View>
  </Card>
);

export const ProgressCard = () => (
  <Card title="Course Progress">
    <View style={styles.flashcard}>
      <Text style={styles.questionText}>React Native Animations</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '75%' }]} />
      </View>
      <Text style={styles.progressText}>15 of 20 lessons completed</Text>
    </View>
  </Card>
);

export const FormCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Card title="Contact Form">
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          accessibilityLabel="Name input field"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          accessibilityLabel="Email input field"
        />
        <Button
          title="Submit"
          onPress={() => console.log('Form submitted:', { name, email })}
          accessibilityLabel="Submit form button"
        />
      </View>
    </Card>
  );
};

export const MultiStepCard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: 'Personal Info', icon: '👤' },
    { title: 'Preferences', icon: '⚙️' },
    { title: 'Confirmation', icon: '✅' },
  ];

  const handleSwipeLeft = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSwipeRight = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  return (
    <Card
      title={`Step ${currentStep + 1}: ${steps[currentStep].title}`}
      enableSwipe
      enableHaptics
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    >
      <View style={styles.wizardCard}>
        <Text style={styles.wizardIcon}>{steps[currentStep].icon}</Text>
        <View style={styles.progressDots}>
          {steps.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentStep && styles.activeDot]} />
          ))}
        </View>
        <Text style={styles.wizardHint}>
          {currentStep === 0
            ? 'Swipe right to continue'
            : currentStep === steps.length - 1
            ? 'Swipe left to go back'
            : 'Swipe left or right to navigate'}
        </Text>
      </View>
    </Card>
  );
};

export const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
    Animated.spring(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [isExpanded, animatedHeight]);

  const maxHeight = 200;
  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [80, maxHeight],
  });

  return (
    <Card title="Expandable Content" onPress={toggleExpand} enableHaptics>
      <Animated.View style={[styles.expandableContent, { height: contentHeight }]}>
        <Text style={styles.expandableTitle}>Project Overview</Text>
        <Text style={styles.expandableText} numberOfLines={isExpanded ? undefined : 2}>
          This is a detailed project description that contains multiple lines of text. When
          collapsed, it will show only the first two lines. When expanded, it will smoothly animate
          to show the full content. The card uses spring animation for a natural feel and haptic
          feedback for better user interaction.
        </Text>
        <View style={styles.expandIndicator}>
          <Text style={styles.expandHint}>
            {isExpanded ? 'Tap to collapse ↑' : 'Tap to expand ↓'}
          </Text>
        </View>
      </Animated.View>
    </Card>
  );
};

export const CardStack = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'First Card', color: '#4dabf7' },
    { id: 2, title: 'Second Card', color: '#51cf66' },
    { id: 3, title: 'Third Card', color: '#ffd43b' },
  ]);

  const handleSwipeLeft = useCallback((id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
    console.log('Card removed:', id);
  }, []);

  const handleSwipeRight = useCallback((id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
    console.log('Card accepted:', id);
  }, []);

  return (
    <View style={{ height: 400 }}>
      {cards.map((card, index) => (
        <Animated.View
          key={card.id}
          style={[
            styles.stackedCard,
            {
              zIndex: cards.length - index,
              transform: [{ scale: 1 - index * 0.05 }, { translateY: index * 10 }],
            },
          ]}
        >
          <Card
            title={card.title}
            enableSwipe
            enableHaptics
            style={{ backgroundColor: card.color }}
            onSwipeLeft={() => handleSwipeLeft(card.id)}
            onSwipeRight={() => handleSwipeRight(card.id)}
          >
            <View style={styles.stackedCardContent}>
              <Text style={styles.stackedCardText}>Swipe right to accept, left to reject</Text>
            </View>
          </Card>
        </Animated.View>
      ))}
    </View>
  );
};

export const ReducedMotionCard = () => {
  const prefersReducedMotion = false; // In real app, get from system settings

  return (
    <Card
      title="Accessibility First"
      enableFlip={!prefersReducedMotion}
      enableSwipe={!prefersReducedMotion}
      enableHaptics
      accessibility={{
        label: 'Card with reduced motion support',
        hint: prefersReducedMotion ? 'Use buttons to navigate' : 'Swipe or tap to interact',
      }}
      backContent={
        <View style={styles.accessibleContent}>
          <Text style={styles.accessibleText}>This card respects reduced motion preferences</Text>
          {prefersReducedMotion && (
            <View style={styles.buttonContainer}>
              <Button
                title="Previous"
                onPress={() => console.log('Previous')}
                accessibilityLabel="Go to previous card"
              />
              <Button
                title="Next"
                onPress={() => console.log('Next')}
                accessibilityLabel="Go to next card"
              />
            </View>
          )}
        </View>
      }
    >
      <View style={styles.accessibleContent}>
        <Text style={styles.accessibleText}>Front content with accessibility in mind</Text>
      </View>
    </Card>
  );
};

export const PerformanceMonitoredCard = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    flipDuration: 0,
    swipeDuration: 0,
    frameDrops: 0,
  });

  const onFlip = useCallback(() => {
    const startTime = performance.now();
    // Simulate performance monitoring
    setTimeout(() => {
      const duration = performance.now() - startTime;
      setPerformanceMetrics(prev => ({
        ...prev,
        flipDuration: duration,
      }));
    }, 400);
  }, []);

  return (
    <Card
      title="Performance Metrics"
      enableFlip
      enableSwipe
      onPress={onFlip}
      backContent={
        <View style={styles.metricsContainer}>
          <Text style={styles.metricsTitle}>Animation Metrics</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Flip Duration:</Text>
            <Text style={styles.metricValue}>{performanceMetrics.flipDuration.toFixed(2)}ms</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Swipe Duration:</Text>
            <Text style={styles.metricValue}>{performanceMetrics.swipeDuration.toFixed(2)}ms</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Frame Drops:</Text>
            <Text style={styles.metricValue}>{performanceMetrics.frameDrops}</Text>
          </View>
        </View>
      }
    >
      <View style={styles.metricsContainer}>
        <Text style={styles.metricsText}>Flip card to view performance metrics</Text>
      </View>
    </Card>
  );
};
