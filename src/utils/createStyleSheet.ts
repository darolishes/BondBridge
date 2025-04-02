import { StyleSheet, Platform } from 'react-native';

type Style = Parameters<typeof StyleSheet.create>[0];
type StyleCreator<P> = (props: P) => Style;

export function createStyleSheet<P = void>(
  styleCreator: StyleCreator<P>
) {
  return (props: P) => {
    const styles = styleCreator(props);
    return StyleSheet.create(styles);
  };
}