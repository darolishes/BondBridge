import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'BondBridge',
  showBack = false,
  showMenu = true,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
            testID="back-button"
          >
            <Ionicons name="chevron-back" size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {showMenu && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.iconButton}
              testID="settings-button"
            >
              <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.iconButton}
              testID="profile-button"
            >
              <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});

export default Header;
