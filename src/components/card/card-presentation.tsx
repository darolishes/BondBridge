import React from 'react';
import { View, Animated } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { BaseCardProps, CardWithChildrenProps, CardWithTitleProps } from './card-types';
import { styles } from './card-styles';

type PresentationProps = BaseCardProps & {
  children?: React.ReactNode;
  title?: string;
  backContent?: React.ReactNode;
  cardProps: {
    titleA11yProps?: object;
    [key: string]: any;
  };
  animatedStyle: any;
  isFlipped: boolean;
};

export const CardPresentation: React.FC<PresentationProps> = ({
  children,
  style,
  contentStyle,
  mode = 'elevated',
  testID,
  title,
  isLoading = false,
  backContent,
  isFlipped,
  cardProps,
  animatedStyle,
}) => {
  if (isLoading) {
    return (
      <PaperCard
        mode={mode}
        style={[styles.container, style]}
        testID={testID ? `${testID}-loading` : 'card-loading'}
      >
        <View style={styles.loadingPlaceholder} />
      </PaperCard>
    );
  }

  if (!children && !title) {
    console.warn('Card: Either children or title prop must be provided');
    return null;
  }

  const cardContent =
    isFlipped && backContent ? (
      backContent
    ) : (
      <>
        {title && <PaperCard.Title title={title} {...cardProps.titleA11yProps} />}
        {children && (
          <PaperCard.Content style={[styles.content, contentStyle]}>{children}</PaperCard.Content>
        )}
      </>
    );

  return (
    <Animated.View style={animatedStyle}>
      <PaperCard {...cardProps}>{cardContent}</PaperCard>
    </Animated.View>
  );
};

export default CardPresentation;
