import React from 'react';
import { Image, ImageProps, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@theme/theme-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface ImageWithPlaceholderProps extends Omit<ImageProps, 'source'> {
  source?: ImageProps['source'];
  width: number;
  height: number;
  borderRadius?: number;
  placeholderIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  testID?: string;
}

export const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  source,
  width,
  height,
  borderRadius = 8,
  placeholderIcon = 'image-outline',
  containerStyle,
  imageStyle,
  testID,
  ...imageProps
}) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.surfaceHighlight,
        },
        containerStyle,
      ]}
      testID={testID}
    >
      {source && !hasError && (
        <Image
          {...imageProps}
          source={source}
          style={[
            styles.image,
            {
              width,
              height,
              borderRadius,
            },
            imageStyle,
          ]}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      )}
      {(isLoading || hasError || !source) && (
        <View style={styles.placeholder}>
          <MaterialCommunityIcons
            name={placeholderIcon}
            size={width * 0.3}
            color={theme.colors.textSecondary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
