import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';
import { ThemeMode } from '@types';

interface ThemeToggleProps {
  /**
   * Whether to show labels next to the icons
   */
  showLabels?: boolean;

  /**
   * Whether to enable the system theme option
   */
  enableSystemTheme?: boolean;

  /**
   * Custom size for the toggle
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * A reusable theme toggle component that allows switching between light, dark, and system themes
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabels = false,
  enableSystemTheme = true,
  size = 'medium',
}) => {
  const { theme, themeMode, setThemeMode } = useTheme();

  // Determine icon size based on the component size prop
  const iconSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  }, [size]);

  // Calculate dimensions based on size
  const dimensions = useMemo(() => {
    switch (size) {
      case 'small':
        return { height: 32, padding: 6 };
      case 'large':
        return { height: 48, padding: 12 };
      default:
        return { height: 40, padding: 8 };
    }
  }, [size]);

  // Handle theme change
  const handleThemeChange = useCallback(
    (newMode: ThemeMode) => {
      setThemeMode(newMode);
    },
    [setThemeMode]
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceHighlight, height: dimensions.height },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.option,
          themeMode === 'light' && { backgroundColor: theme.colors.primary },
          { padding: dimensions.padding },
        ]}
        onPress={() => handleThemeChange('light')}
        accessibilityLabel="Light theme"
        accessibilityHint="Switch to light theme"
      >
        <Ionicons
          name="sunny-outline"
          size={iconSize}
          color={themeMode === 'light' ? theme.colors.textOnPrimary : theme.colors.text}
        />
        {showLabels && (
          <Text
            style={[
              styles.label,
              { color: themeMode === 'light' ? theme.colors.textOnPrimary : theme.colors.text },
            ]}
          >
            Light
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          themeMode === 'dark' && { backgroundColor: theme.colors.primary },
          { padding: dimensions.padding },
        ]}
        onPress={() => handleThemeChange('dark')}
        accessibilityLabel="Dark theme"
        accessibilityHint="Switch to dark theme"
      >
        <Ionicons
          name="moon-outline"
          size={iconSize}
          color={themeMode === 'dark' ? theme.colors.textOnPrimary : theme.colors.text}
        />
        {showLabels && (
          <Text
            style={[
              styles.label,
              { color: themeMode === 'dark' ? theme.colors.textOnPrimary : theme.colors.text },
            ]}
          >
            Dark
          </Text>
        )}
      </TouchableOpacity>

      {enableSystemTheme && (
        <TouchableOpacity
          style={[
            styles.option,
            themeMode === 'system' && { backgroundColor: theme.colors.primary },
            { padding: dimensions.padding },
          ]}
          onPress={() => handleThemeChange('system')}
          accessibilityLabel="System theme"
          accessibilityHint="Use system theme preference"
        >
          <Ionicons
            name="settings-outline"
            size={iconSize}
            color={themeMode === 'system' ? theme.colors.textOnPrimary : theme.colors.text}
          />
          {showLabels && (
            <Text
              style={[
                styles.label,
                { color: themeMode === 'system' ? theme.colors.textOnPrimary : theme.colors.text },
              ]}
            >
              Auto
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ThemeToggle;
