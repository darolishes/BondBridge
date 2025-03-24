import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home', undefined)}
      >
        <Ionicons name="home-outline" size={24} color={theme.colors.primary} />
        <Text style={[styles.navText, { color: theme.colors.text }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('CardView', { setId: 'default' })}
      >
        <Ionicons name="card-outline" size={24} color={theme.colors.primary} />
        <Text style={[styles.navText, { color: theme.colors.text }]}>Cards</Text>
      </TouchableOpacity>

      <View style={styles.navItem}>
        <Text style={[styles.copyright, { color: theme.colors.textSecondary }]}>
          © 2024 BondBridge
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  copyright: {
    fontSize: 12,
  },
});

export default Footer;
