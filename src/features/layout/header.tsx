import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/theme-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showMenu = false,
  onBackPress,
  onMenuPress,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      {showBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {showMenu && (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <MaterialCommunityIcons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
