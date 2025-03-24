import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showBack, showMenu }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title={title} showBack={showBack} showMenu={showMenu} />
      <View style={styles.content}>{children}</View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Layout;
