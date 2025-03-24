import React from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useConfig } from '@contexts/ConfigContext';
import type { Props } from './types';
import { useLogic } from './use-logic';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Base = ({
  children,
  style,
  contentStyle,
  mode = 'elevated',
  onPress,
  accessibility,
  testID,
  title,
  isLoading = false,
  backContent,
  enableFlip = false,
  enableSwipe = false,
  enableHaptics = false,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold,
  rotationFactor,
  flipDuration,
}: Props) => {
  const config = useConfig();
  const { card } = config.components;

  const styles = StyleSheet.create({
    container: {
      width: SCREEN_WIDTH - 32, // Calculate actual width
      margin: card.dimensions.margin,
      borderRadius: card.style.borderRadius,
      elevation: card.style.elevation,
      shadowColor: card.style.shadow.color,
      shadowOffset: card.style.shadow.offset,
      shadowOpacity: card.style.shadow.opacity,
      shadowRadius: card.style.shadow.radius,
    },
    content: {
      padding: card.style.content.padding,
    },
    loadingPlaceholder: {
      height: card.style.loading.height,
      backgroundColor: card.style.loading.backgroundColor,
    },
  });

  const {
    isFlipped,
    frontStyle,
    backStyle,
    cardStyle,
    handlePress,
    panHandlers,
    a11yProps,
    titleA11yProps,
  } = useLogic({
    children,
    title,
    accessibility,
    enableFlip,
    enableSwipe,
    enableHaptics,
    onPress,
    onSwipeLeft,
    onSwipeRight,
    swipeThreshold: swipeThreshold || card.animation.swipeThreshold,
    rotationFactor: rotationFactor || card.animation.rotationFactor,
    flipDuration: flipDuration || card.animation.flipDuration,
  });

  if (isLoading) {
    return (
      <PaperCard
        mode={mode}
        style={[styles.container, style]}
        testID={testID ? `${testID}-loading` : 'card-loading'}
      >
        <View style={styles.loadingPlaceholder} />
      </PaperCard>
    );
  }

  if (!children && !title) {
    console.warn('Card: Either children or title prop must be provided');
    return null;
  }

  const cardContent =
    isFlipped && backContent ? (
      backContent
    ) : (
      <>
        {title && <PaperCard.Title title={title} {...titleA11yProps} />}
        {children && (
          <PaperCard.Content style={[styles.content, contentStyle]}>{children}</PaperCard.Content>
        )}
      </>
    );

  const animatedStyle = StyleSheet.flatten([
    styles.container,
    style,
    enableSwipe && cardStyle,
    enableFlip && (isFlipped ? backStyle : frontStyle),
  ]);

  return (
    <Animated.View style={animatedStyle}>
      <PaperCard
        mode={mode}
        onPress={handlePress}
        testID={testID}
        {...a11yProps}
        {...(enableSwipe ? panHandlers : {})}
      >
        {cardContent}
      </PaperCard>
    </Animated.View>
  );
};
