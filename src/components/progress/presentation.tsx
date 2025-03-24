import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { styles, createStyles } from './styles';
import { ProgressPresentationProps } from './types';
import { useTheme } from '@theme/theme-context';

export const ProgressPresentation: React.FC<ProgressPresentationProps> = ({
  progress,
  percentage,
  isLoading,
  error,
  onRetry,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { theme } = useTheme();
  const baseStyles = styles(theme);
  const dynamicStyles = createStyles(theme, percentage);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withSpring(percentage, {
      damping: 15,
      stiffness: 100,
    });
  }, [percentage]);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  if (isLoading) {
    return (
      <View
        style={[baseStyles.container, style]}
        testID={testID}
        accessibilityLabel={accessibilityLabel || 'Loading progress'}
        accessibilityHint={accessibilityHint}
      >
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  const progressLabel = `${Math.round(percentage)}% complete`;

  return (
    <View testID={testID}>
      <View
        style={[baseStyles.container, style]}
        accessibilityLabel={accessibilityLabel || progressLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: percentage,
        }}
      >
        <Animated.View style={[baseStyles.progressBar, animatedStyles]} />
      </View>
      {error && (
        <View style={baseStyles.errorContainer} accessibilityRole="alert">
          <Text style={baseStyles.errorText}>{error.message}</Text>
          {onRetry && (
            <TouchableOpacity
              style={baseStyles.retryButton}
              onPress={onRetry}
              accessibilityRole="button"
              accessibilityLabel="Retry loading progress"
            >
              <Text style={baseStyles.retryText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
