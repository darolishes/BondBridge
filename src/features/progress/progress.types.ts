import { StyleProp, ViewStyle } from 'react-native';
import { Progress, ProgressError } from '@types';

export interface BaseProgressProps {
  /** Custom styles for the progress container */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing purposes */
  testID?: string;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint providing additional context */
  accessibilityHint?: string;
}

export interface ProgressPresentationProps extends BaseProgressProps {
  /** Current progress data */
  progress: Progress | null;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error state if any */
  error: ProgressError | null;
  /** Callback for retry action when error occurs */
  onRetry?: () => void;
}

export interface ProgressContainerProps extends BaseProgressProps {
  /** Unique identifier for the progress tracking */
  id: string;
  /** Callback fired when progress is updated */
  onProgressUpdate?: (progress: Progress) => void;
  /** Callback fired when an error occurs */
  onError?: (error: ProgressError) => void;
}
