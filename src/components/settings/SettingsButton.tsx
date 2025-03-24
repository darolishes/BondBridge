import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';

interface SettingsButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  title,
  onPress,
  icon,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.colors.text }, textStyle]}>{title}</Text>
      {icon && <Ionicons name={icon} size={24} color={theme.colors.text} style={styles.icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
});

export default SettingsButton;
