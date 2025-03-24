import { StyleProp, ViewStyle } from 'react-native';
import { AccessibilityProps } from '@utils/accessibility';

export interface BaseCardProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
  accessibility?: AccessibilityProps;
  testID?: string;
  isLoading?: boolean;
  loading?: boolean;
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

export interface CardWithChildrenProps extends BaseCardProps {
  children: React.ReactNode;
  title?: never;
  backContent?: React.ReactNode; // Content for card back when flipped
}

export interface CardWithTitleProps extends BaseCardProps {
  title: string;
  children?: never;
  backContent?: React.ReactNode; // Content for card back when flipped
}

export type CardProps = CardWithChildrenProps | CardWithTitleProps;

export interface CardStylesConfig {
  width: number;
  margin: number;
  borderRadius: number;
  elevation: number;
  shadow: {
    color: string;
    offset: { width: number; height: number };
    opacity: number;
    radius: number;
  };
}
