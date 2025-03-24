import { StyleProp, ViewStyle, AccessibilityRole, ViewProps, Animated } from 'react-native';
import { AccessibilityProps } from '@utils/accessibility';

interface BaseProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
  accessibility?: AccessibilityProps;
  testID?: string;
  isLoading?: boolean;
  enableFlip?: boolean;
  enableSwipe?: boolean;
  enableHaptics?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
  rotationFactor?: number;
  flipDuration?: number;
}

interface WithChildrenProps extends BaseProps {
  children: React.ReactNode;
  title?: string;
  backContent?: React.ReactNode;
}

interface WithTitleProps extends BaseProps {
  title: string;
  children?: React.ReactNode;
  backContent?: React.ReactNode;
}

export type Props = WithChildrenProps | WithTitleProps;

type AnimatedStyle = Animated.AnimatedProps<ViewStyle>;

export interface LogicResult {
  isFlipped: boolean;
  frontStyle: AnimatedStyle;
  backStyle: AnimatedStyle;
  cardStyle: AnimatedStyle;
  handlePress: () => void;
  panHandlers: any;
  a11yProps: ViewProps;
  titleA11yProps: ViewProps;
}
