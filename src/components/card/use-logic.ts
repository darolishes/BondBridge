import { useTranslation } from 'react-i18next';
import { AccessibilityRole, ViewProps, Animated, ViewStyle } from 'react-native';
import { useConfig } from '@contexts/ConfigContext';
import { useAccessibility } from '@utils/accessibility';
import { useCardFlip } from '@hooks/useCardFlip';
import { useCardSwipe } from '@hooks/useCardSwipe';
import { useHapticFeedback } from '@hooks/useHapticFeedback';
import type { Props, LogicResult } from './types';

export const useLogic = (props: Props): LogicResult => {
  const { t } = useTranslation();
  const config = useConfig();
  const { card } = config.components;

  const {
    title,
    accessibility,
    enableFlip = false,
    enableSwipe = false,
    enableHaptics = false,
    onPress,
    onSwipeLeft,
    onSwipeRight,
    swipeThreshold = card.animation.swipeThreshold,
    rotationFactor = card.animation.rotationFactor,
    flipDuration = card.animation.flipDuration,
  } = props;

  const a11yProps: ViewProps = useAccessibility({
    role: 'none' as AccessibilityRole,
    label: title || accessibility?.label,
    hint: accessibility?.hint,
    ...accessibility,
  });

  const titleA11yProps: ViewProps = useAccessibility({
    role: 'header' as AccessibilityRole,
    isHeading: true,
    label: t('accessibility.cardTitle', { title: title || '' }),
  });

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

  return {
    isFlipped,
    frontStyle: frontStyle as Animated.AnimatedProps<ViewStyle>,
    backStyle: backStyle as Animated.AnimatedProps<ViewStyle>,
    cardStyle: cardStyle as Animated.AnimatedProps<ViewStyle>,
    handlePress,
    panHandlers: panResponder.panHandlers,
    a11yProps,
    titleA11yProps,
  };
};
