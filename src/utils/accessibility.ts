import { AccessibilityInfo, AccessibilityRole } from 'react-native';

export interface AccessibilityProps {
  role?: AccessibilityRole;
  label?: string;
  hint?: string;
  isHeading?: boolean;
  isSelected?: boolean;
}

export const useAccessibility = ({
  role,
  label,
  hint,
  isHeading = false,
  isSelected = false,
}: AccessibilityProps = {}) => {
  return {
    accessible: true,
    accessibilityRole: role,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityHeading: isHeading,
    accessibilityState: {
      selected: isSelected,
    },
  };
};

export const announceForAccessibility = (announcement: string) => {
  AccessibilityInfo.announceForAccessibility(announcement);
};

export const isScreenReaderEnabled = async () => {
  return await AccessibilityInfo.isScreenReaderEnabled();
};
