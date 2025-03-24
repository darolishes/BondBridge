import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Styles = {
  container: ViewStyle;
  listContent: ViewStyle;
  columnWrapper: ViewStyle;
  importButton: ViewStyle;
  buttonText: TextStyle;
  themeToggleContainer: ViewStyle;
  header: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  importButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
});
