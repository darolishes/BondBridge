import React from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { StyleProp, ViewStyle, AccessibilityRole } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAccessibility, AccessibilityProps } from '@utils/accessibility';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
  accessibility?: AccessibilityProps;
  testID?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  contentStyle,
  mode = 'elevated',
  onPress,
  accessibility,
  testID,
  title,
}) => {
  const { t } = useTranslation();
  const a11yProps = useAccessibility({
    role: 'none' as AccessibilityRole,
    label: title || accessibility?.label,
    hint: accessibility?.hint,
    ...accessibility,
  });

  return (
    <PaperCard style={style} mode={mode} onPress={onPress} testID={testID} {...a11yProps}>
      {title && (
        <PaperCard.Title
          title={title}
          {...useAccessibility({
            role: 'header' as AccessibilityRole,
            isHeading: true,
            label: t('accessibility.cardTitle', { title }),
          })}
        />
      )}
      <PaperCard.Content style={contentStyle}>{children}</PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
