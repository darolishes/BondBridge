import { ThemeType } from "@common/types";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  border: string;
  card: {
    background: string;
    border: string;
    shadow: string;
  };
}

export interface Theme {
  name: string;
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    warning: string;
    success: string;
    card: {
      border: string;
      shadow: string;
    };
  };
  typography: {
    fontSizes: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    fontWeights: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}

export const lightTheme: Theme = {
  name: "light",
  isDark: false,
  colors: {
    primary: "#4A6FA5",
    secondary: "#9BB1D3",
    accent: "#FF6B6B",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#212529",
    textSecondary: "#495057",
    error: "#DC3545",
    warning: "#FFC107",
    success: "#28A745",
    card: {
      border: "#E9ECEF",
      shadow: "rgba(0, 0, 0, 0.1)",
    },
  },
  typography: {
    fontSizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeights: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

export const darkTheme: Theme = {
  name: "dark",
  isDark: true,
  colors: {
    primary: "#6889BA",
    secondary: "#7F95B7",
    accent: "#FF8080",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#E9ECEF",
    textSecondary: "#ADB5BD",
    error: "#F44336",
    warning: "#FFC107",
    success: "#4CAF50",
    card: {
      border: "#2A2A2A",
      shadow: "rgba(0, 0, 0, 0.3)",
    },
  },
  typography: {
    fontSizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeights: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};
