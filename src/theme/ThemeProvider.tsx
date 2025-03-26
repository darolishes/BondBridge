import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./themes";
import { Theme, ThemeContextType, ThemeType } from "./types";

// Storage key for theme preference
const THEME_STORAGE_KEY = "@BondBridge:theme";

// Create the theme context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: "system",
  isDark: false,
  setThemeType: () => {},
  toggleTheme: () => {},
});

// ThemeProvider props interface
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Manages theme state and provides theme context to the application
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Theme type state (light, dark, or system)
  const [themeType, setThemeType] = useState<ThemeType>("system");
  // Current theme object
  const [theme, setTheme] = useState<Theme>(lightTheme);
  // Get device color scheme
  const colorScheme = useColorScheme();

  // Update theme when themeType or system color scheme changes
  useEffect(() => {
    const applyTheme = () => {
      if (themeType === "system") {
        // Use system preference if set to 'system'
        setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
      } else {
        // Otherwise use explicitly selected theme
        setTheme(themeType === "dark" ? darkTheme : lightTheme);
      }
    };

    applyTheme();
  }, [themeType, colorScheme]);

  // Load saved theme preference on app start
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedThemeType = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeType) {
          setThemeType(savedThemeType as ThemeType);
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  const saveThemePreference = async (newThemeType: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  // Handler for theme type changes
  const handleSetThemeType = (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    saveThemePreference(newThemeType);
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newType = theme.isDark ? "light" : "dark";
    handleSetThemeType(newType);
  };

  // Prepare context value
  const contextValue: ThemeContextType = {
    theme,
    themeType,
    isDark: theme.isDark,
    setThemeType: handleSetThemeType,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
