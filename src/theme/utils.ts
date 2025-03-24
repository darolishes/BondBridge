import { Theme } from '@types';
import { lightTheme } from './constants';

/**
 * Adjusts the opacity of a HEX color
 * @param color HEX color string
 * @param opacity Opacity value between 0 and 1
 * @returns RGBA color string with the specified opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Handle invalid input
  if (!color || opacity < 0 || opacity > 1) {
    return color;
  }

  // Return the original color if already in rgba format or not in HEX format
  if (color.startsWith('rgba') || !color.startsWith('#')) {
    return color;
  }

  // Convert HEX to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Creates a style with theme-dependent properties
 * @param styleFactory Function that returns a style object based on the theme
 * @returns Style object with theme-specific properties
 */
export const createThemedStyle = <T>(styleFactory: (theme: Theme) => T): T => {
  const theme = lightTheme; // Default to light theme, real theme will be used in components via useTheme
  return styleFactory(theme);
};

/**
 * Returns a value based on the current theme mode
 * @param isDark Whether dark mode is active
 * @param lightValue Value to return in light mode
 * @param darkValue Value to return in dark mode
 * @returns The appropriate value based on the theme
 */
export const themedValue = <T>(isDark: boolean, lightValue: T, darkValue: T): T => {
  return isDark ? darkValue : lightValue;
};

/**
 * Lightens a HEX color by the specified amount
 * @param color HEX color string
 * @param amount Amount to lighten (0-1)
 * @returns Lightened HEX color
 */
export const lighten = (color: string, amount: number): string => {
  // Handle invalid input
  if (!color || amount < 0 || amount > 1) {
    return color;
  }

  // Return the original color if not in HEX format
  if (!color.startsWith('#')) {
    return color;
  }

  // Convert HEX to RGB
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  // Lighten the color
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));

  // Convert back to HEX
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
};

/**
 * Darkens a HEX color by the specified amount
 * @param color HEX color string
 * @param amount Amount to darken (0-1)
 * @returns Darkened HEX color
 */
export const darken = (color: string, amount: number): string => {
  // Handle invalid input
  if (!color || amount < 0 || amount > 1) {
    return color;
  }

  // Return the original color if not in HEX format
  if (!color.startsWith('#')) {
    return color;
  }

  // Convert HEX to RGB
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  // Darken the color
  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));

  // Convert back to HEX
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
};
