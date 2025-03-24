import React, { memo } from 'react';
import { Card as PaperCard } from 'react-native-paper';
import {
  StyleProp,
  ViewStyle,
  AccessibilityRole,
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAccessibility, AccessibilityProps } from '@utils/accessibility';
import { useCardFlip } from '@hooks/useCardFlip';
import { useCardSwipe } from '@hooks/useCardSwipe';
import { useHapticFeedback } from '@hooks/useHapticFeedback';
import ErrorBoundary from '../common/ErrorBoundary';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32; // Full width minus margins
const CARD_MARGIN = 8;

interface BaseCardProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
  accessibility?: AccessibilityProps;
  testID?: string;
  isLoading?: boolean;
  // Animation related props
  enableFlip?: boolean;
  enableSwipe?: boolean;
  enableHaptics?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
  rotationFactor?: number;
  flipDuration?: number;
}

interface CardWithChildrenProps extends BaseCardProps {
  children: React.ReactNode;
  title?: string;
  backContent?: React.ReactNode; // Content for card back when flipped
}

interface CardWithTitleProps extends BaseCardProps {
  title: string;
  children?: React.ReactNode;
  backContent?: React.ReactNode; // Content for card back when flipped
}

export type CardProps = CardWithChildrenProps | CardWithTitleProps;

const CardComponent: React.FC<CardProps> = ({
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
}) => {
  const { t } = useTranslation();

  // Move all hook calls to the top level
  const a11yProps = useAccessibility({
    role: 'none' as AccessibilityRole,
    label: title || accessibility?.label,
    hint: accessibility?.hint,
    ...accessibility,
  });

  // Title-specific accessibility props
  const titleA11yProps = useAccessibility({
    role: 'header' as AccessibilityRole,
    isHeading: true,
    label: t('accessibility.cardTitle', { title: title || '' }),
  });

  // Initialize animation hooks
  const { isFlipped, flipCard, frontStyle, backStyle } = useCardFlip({
    duration: flipDuration,
  });

  const { panResponder, cardStyle } = useCardSwipe({
    swipeThreshold,
    rotationFactor,
    onSwipeLeft: enableSwipe ? onSwipeLeft : undefined,
    onSwipeRight: enableSwipe ? onSwipeRight : undefined,
  });

  const { trigger: triggerHaptic } = useHapticFeedback();

  const handlePress = () => {
    if (onPress) {
      onPress();
    }

    if (enableFlip) {
      flipCard();
    }

    if (enableHaptics) {
      triggerHaptic('medium');
    }
  };

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

  const baseStyle = [styles.container, style];
  if (enableSwipe) {
    Object.assign(baseStyle, cardStyle);
  }
  if (enableFlip) {
    Object.assign(baseStyle, isFlipped ? backStyle : frontStyle);
  }

  const cardProps = {
    mode,
    onPress: handlePress,
    testID,
    ...a11yProps,
    ...(enableSwipe ? panResponder.panHandlers : {}),
  };

  return (
    <Animated.View style={baseStyle}>
      <PaperCard {...cardProps}>{cardContent}</PaperCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
  },
  loadingPlaceholder: {
    height: 100,
    backgroundColor: '#f0f0f0',
  },
});

export const Card = memo((props: CardProps) => (
  <ErrorBoundary testID={props.testID}>
    <CardComponent {...props} />
  </ErrorBoundary>
));

export default Card;
