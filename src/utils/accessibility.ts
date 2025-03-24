import { AccessibilityInfo, AccessibilityRole } from 'react-native';

export interface AccessibilityProps {
  role?: AccessibilityRole;
  label?: string;
  hint?: string;
  isHeading?: boolean;
  isButton?: boolean;
  isSelected?: boolean;
  liveRegion?: 'none' | 'polite' | 'assertive';
}

export const useAccessibility = (props: AccessibilityProps = {}) => {
  const { role, label, hint, isHeading, isButton, isSelected, liveRegion } = props;

  return {
    accessible: true,
    accessibilityRole: role,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityLiveRegion: liveRegion,
    ...(isHeading && { accessibilityRole: 'header' as AccessibilityRole }),
    ...(isButton && { accessibilityRole: 'button' as AccessibilityRole }),
    ...(isSelected && { accessibilityState: { selected: true } }),
  };
};

export const announceForAccessibility = (announcement: string) => {
  AccessibilityInfo.announceForAccessibility(announcement);
};

export const isScreenReaderEnabled = async () => {
  return await AccessibilityInfo.isScreenReaderEnabled();
};
