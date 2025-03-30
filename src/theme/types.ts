export interface CardStyle {
  shadow: string;
  background: string;
  backgroundActive: string;
  backgroundError: string;
  borderActive: string;
  borderError: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textOnPrimary: string;
  error: string;
  warning: string;
  success: string;
  card: CardStyle;
  button: {
    primary: {
      background: string;
      text: string;
    };
    secondary: {
      background: string;
      text: string;
    };
    destructive: {
      background: string;
      text: string;
    };
  };
}

export interface ThemeSpacing {
  tiny: number;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export interface ThemeBorderRadius {
  small: number;
  medium: number;
  large: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
}
