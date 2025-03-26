import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme, Theme } from "./themes";
import { useColorScheme } from "react-native";
import { ThemeType } from "@common/types";

// Konstante für den AsyncStorage-Schlüssel
const THEME_STORAGE_KEY = "@BondBridge:theme";

// Context für das Theme
interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  isDark: boolean;
  setThemeType: (type: ThemeType) => void;
  toggleTheme: () => void;
}

// Erstelle den Context mit Default-Werten
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: "system",
  isDark: false,
  setThemeType: () => {},
  toggleTheme: () => {},
});

// Props für den ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Komponente
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State für den Theme-Typ (light, dark, system)
  const [themeType, setThemeType] = useState<ThemeType>("system");
  // State für das aktuelle Theme-Objekt
  const [theme, setTheme] = useState<Theme>(lightTheme);
  // System-Theme vom Gerät
  const colorScheme = useColorScheme();

  // Aktualisiere das Theme basierend auf dem Theme-Typ und System-Theme
  useEffect(() => {
    const applyTheme = () => {
      if (themeType === "system") {
        // Wenn 'system' gewählt ist, verwende das System-Theme
        setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
      } else {
        // Sonst verwende das explizit gewählte Theme
        setTheme(themeType === "dark" ? darkTheme : lightTheme);
      }
    };

    applyTheme();
  }, [themeType, colorScheme]);

  // Lade die Theme-Präferenz beim App-Start
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedThemeType = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeType) {
          setThemeType(savedThemeType as ThemeType);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Theme-Präferenz:", error);
      }
    };

    loadThemePreference();
  }, []);

  // Speichere die Theme-Präferenz bei Änderungen
  const saveThemePreference = async (newThemeType: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error("Fehler beim Speichern der Theme-Präferenz:", error);
    }
  };

  // Handler für Theme-Wechsel
  const handleSetThemeType = (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    saveThemePreference(newThemeType);
  };

  // Handler für Theme-Toggle (zwischen Light und Dark)
  const toggleTheme = () => {
    const newType = theme.isDark ? "light" : "dark";
    handleSetThemeType(newType);
  };

  // Context-Wert zusammenstellen
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

/**
 * Hook für den Zugriff auf das aktuelle Theme und Theme-Funktionen
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
