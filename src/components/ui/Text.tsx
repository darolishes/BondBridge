import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '@/theme';

type TypographyVariant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = React.memo(({
  variant = 'body1',
  style,
  color,
  align,
  ...props
}: TextProps) => {
  return (
    <RNText
      {...props}
      style={[
        typography[variant],
        color && { color },
        align && { textAlign: align },
        style,
      ]}
    />
  );
});