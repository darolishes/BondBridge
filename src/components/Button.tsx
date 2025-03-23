import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAccessibility, AccessibilityProps } from '../utils/accessibility';
import { StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  accessibility?: AccessibilityProps;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  mode = 'contained',
  style,
  labelStyle,
  disabled = false,
  loading = false,
  children,
  accessibility,
  testID,
}) => {
  const { t } = useTranslation();
  const a11yProps = useAccessibility({
    role: 'button',
    label: typeof children === 'string' ? children : undefined,
    ...accessibility,
  });

  return (
    <PaperButton
      onPress={onPress}
      mode={mode}
      style={style}
      labelStyle={labelStyle}
      disabled={disabled}
      loading={loading}
      testID={testID}
      {...a11yProps}
    >
      {children}
    </PaperButton>
  );
};

export default Button;
