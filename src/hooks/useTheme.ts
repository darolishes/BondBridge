import { useCallback } from 'react';
import { theme, Theme } from '@/theme';

export function useTheme() {
  const getSpacing = useCallback((value: keyof Theme['spacing']) => {
    return theme.spacing[value];
  }, []);

  const getColor = useCallback((path: string) => {
    return path.split('.').reduce((obj, key) => obj[key], theme.colors);
  }, []);

  return {
    theme,
    getSpacing,
    getColor,
  };
}