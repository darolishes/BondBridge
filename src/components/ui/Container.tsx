import React from 'react';
import { View, ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { layout } from '@/theme';

interface ContainerProps extends ViewProps {
  variant?: 'screen' | 'section' | 'fluid';
  children: React.ReactNode;
}

export const Container = React.memo(({
  variant = 'screen',
  style,
  children,
  ...props
}: ContainerProps) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 1200;

  return (
    <View
      style={[
        styles.base,
        styles[variant],
        isWideScreen && variant !== 'fluid' && styles.wideScreen,
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  screen: {
    padding: layout.screenPadding,
  },
  section: {
    padding: layout.contentSpacing,
  },
  fluid: {
    width: '100%',
  },
  wideScreen: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
});