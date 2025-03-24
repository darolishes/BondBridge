import React, { memo } from 'react';
import { AccessibilityRole } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '@utils/accessibility';
import { useCardFlip } from '@hooks/useCardFlip';
import { useCardSwipe } from '@hooks/useCardSwipe';
import { useHapticFeedback } from '@hooks/useHapticFeedback';
import { CardProps } from './types';
import { styles, combineAnimationStyles } from './styles';
import CardPresentation from './presentation';
import ErrorBoundary from '../common/ErrorBoundary';

const CardContainer: React.FC<CardProps> = ({
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

  // Accessibility setup
  const a11yProps = useAccessibility({
    role: 'none' as AccessibilityRole,
    label: title || accessibility?.label,
    hint: accessibility?.hint,
    ...accessibility,
  });

  const titleA11yProps = useAccessibility({
    role: 'header' as AccessibilityRole,
    isHeading: true,
    label: t('accessibility.cardTitle', { title: title || '' }),
  });

  // Animation hooks
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

  // Event handlers
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

  // Combine animation styles
  const animatedStyle = combineAnimationStyles([styles.container, style], {
    enableSwipe,
    enableFlip,
    isFlipped,
    cardStyle,
    frontStyle,
    backStyle,
  });

  // Prepare props for presentation component
  const cardProps = {
    mode,
    onPress: handlePress,
    testID,
    titleA11yProps,
    ...a11yProps,
    ...(enableSwipe ? panResponder.panHandlers : {}),
  };

  return (
    <ErrorBoundary testID={testID}>
      <CardPresentation
        children={children}
        style={style}
        contentStyle={contentStyle}
        mode={mode}
        testID={testID}
        title={title}
        isLoading={isLoading}
        backContent={backContent}
        isFlipped={isFlipped}
        cardProps={cardProps}
        animatedStyle={animatedStyle}
      />
    </ErrorBoundary>
  );
};

export default memo(CardContainer);
