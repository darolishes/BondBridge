import React, { memo } from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { StyleProp, ViewStyle, AccessibilityRole, View, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAccessibility, AccessibilityProps } from '@utils/accessibility';
import { useCardFlip } from '../hooks/useCardFlip';
import { useCardSwipe } from '../hooks/useCardSwipe';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import ErrorBoundary from './ErrorBoundary';

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
  const a11yProps = useAccessibility({
    role: 'none' as AccessibilityRole,
    label: title || accessibility?.label,
    hint: accessibility?.hint,
    ...accessibility,
  });

  // Initialize animation hooks
  const { isFlipped, flipCard, frontStyle, backStyle } = useCardFlip({
    duration: flipDuration,
  });

  const { panResponder, cardStyle, swipeDirection, resetPosition } = useCardSwipe({
    swipeThreshold,
    rotationFactor,
    onSwipeLeft,
    onSwipeRight,
  });

  const { trigger: triggerHaptic } = useHapticFeedback({
    enabled: enableHaptics,
  });

  // Handle card press with haptic feedback
  const handlePress = () => {
    if (enableHaptics) {
      triggerHaptic('medium');
    }
    if (enableFlip) {
      flipCard();
    }
    onPress?.();
  };

  if (isLoading) {
    return (
      <PaperCard style={[style, { opacity: 0.7 }]} mode={mode} testID={`${testID}-loading`}>
        <PaperCard.Content style={contentStyle}>
          <View style={{ height: 100, backgroundColor: '#f0f0f0' }} />
        </PaperCard.Content>
      </PaperCard>
    );
  }

  if (!children && !title) {
    console.warn('Card: Either children or title prop must be provided');
    return null;
  }

  const cardContent = (isFlipped && backContent) ? backContent : (
    <>
      {title && (
        <PaperCard.Title
          title={title}
          {...useAccessibility({
            role: 'header' as AccessibilityRole,
            isHeading: true,
            label: t('accessibility.cardTitle', { title }),
          })}
        />
      )}
      {children && <PaperCard.Content style={contentStyle}>{children}</PaperCard.Content>}
    </>
  );

  const baseStyle = [style];
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
      <PaperCard {...cardProps}>
        {cardContent}
      </PaperCard>
    </Animated.View>
  );
};

export const Card = memo((props: CardProps) => (
  <ErrorBoundary testID={props.testID}>
    <CardComponent {...props} />
  </ErrorBoundary>
));

export default Card;

