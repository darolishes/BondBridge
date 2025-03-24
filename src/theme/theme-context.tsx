import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, ThemeState, ThemeAction, ThemeActionType } from '@types';
import { lightTheme, darkTheme } from '@theme/constants';

// Storage key for the theme preference
const THEME_STORAGE_KEY = 'bondbridge:theme_mode';

// Initial theme state
const initialState: ThemeState = {
  theme: lightTheme,
  themeMode: 'system',
  isDark: false,
  isTransitioning: false,
};

/**
 * Theme reducer to handle all theme-related state updates
 */
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionType.SET_THEME_MODE: {
      const themeMode = action.payload;
      const systemPreference = Appearance.getColorScheme() || 'light';
      const effectiveMode = themeMode === 'system' ? systemPreference : themeMode;
      const isDark = effectiveMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      // Persist theme preference to storage
      AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode).catch(error => {
        console.error('Error saving theme preference:', error);
      });

      return { ...state, themeMode, isDark, theme };
    }

    case ThemeActionType.TOGGLE_THEME: {
      const newMode = state.themeMode === 'light' ? 'dark' : 'light';
      const isDark = newMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      // Persist theme preference to storage
      AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch(error => {
        console.error('Error saving theme preference:', error);
      });

      return { ...state, themeMode: newMode, isDark, theme };
    }

    case ThemeActionType.SET_SYSTEM_THEME: {
      // Only update if we're using system theme
      if (state.themeMode !== 'system') {
        return state;
      }

      const effectiveMode = action.payload;
      const isDark = effectiveMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      return { ...state, isDark, theme };
    }

    case ThemeActionType.START_TRANSITION:
      return { ...state, isTransitioning: true };

    case ThemeActionType.END_TRANSITION:
      return { ...state, isTransitioning: false };

    default:
      return state;
  }
};

// Context interface
interface ThemeContextValue extends ThemeState {
  /**
   * Set the theme mode (light, dark, or system)
   */
  setThemeMode: (themeMode: ThemeMode) => void;

  /**
   * Toggle between light and dark themes
   */
  toggleTheme: () => void;
}

// Create the Theme Context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider component for managing theme state
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const colorScheme = useColorScheme();

  // Handle setting theme mode
  const setThemeMode = useCallback(
    (themeMode: ThemeMode) => {
      dispatch({ type: ThemeActionType.SET_THEME_MODE, payload: themeMode });
    },
    [dispatch]
  );

  // Handle toggling between light and dark themes
  const toggleTheme = useCallback(() => {
    dispatch({ type: ThemeActionType.TOGGLE_THEME });
  }, []);

  // Initialize theme on component mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        } else {
          // Default to system preference if no saved theme
          setThemeMode('system');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Default to system preference on error
        setThemeMode('system');
      }
    };

    loadTheme();
  }, [setThemeMode]);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      if (state.themeMode === 'system' && newColorScheme) {
        dispatch({
          type: ThemeActionType.SET_SYSTEM_THEME,
          payload: newColorScheme as 'light' | 'dark',
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [state.themeMode]);

  // Update theme when system color scheme changes and we're using system theme
  useEffect(() => {
    if (state.themeMode === 'system' && colorScheme) {
      dispatch({
        type: ThemeActionType.SET_SYSTEM_THEME,
        payload: colorScheme as 'light' | 'dark',
      });
    }
  }, [colorScheme, state.themeMode]);

  // Context value
  const contextValue: ThemeContextValue = {
    ...state,
    setThemeMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

/**
 * Hook for accessing the theme context
 * @returns Theme context value
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

/**
 * Hook for creating themed styles
 * @param styleCreator Function that creates styles based on the theme
 * @returns Memoized styles
 */
export function useThemedStyles<T extends object>(
  styleCreator: (theme: Theme, isDark: boolean) => T
): T {
  const { theme, isDark } = useTheme();
  return React.useMemo(() => styleCreator(theme, isDark), [styleCreator, theme, isDark]);
}

/**
 * Hook for accessing theme-specific values
 * @param lightValue Value to use in light mode
 * @param darkValue Value to use in dark mode
 * @returns The appropriate value based on the current theme
 */
export function useThemedValue<T>(lightValue: T, darkValue: T): T {
  const { isDark } = useTheme();
  return isDark ? darkValue : lightValue;
}
