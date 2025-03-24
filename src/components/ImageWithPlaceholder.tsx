import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ImageWithPlaceholderProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: Error) => void;
}

export const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  onLoadStart,
  onLoadEnd,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    onLoadEnd?.();
  };

  const handleError = (error: Error) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {isLoading && (
        <View style={[styles.placeholder, style]} testID="image-placeholder">
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}

      {hasError ? (
        <View style={[styles.errorContainer, style]} testID="image-error">
          <View style={styles.errorIcon} />
        </View>
      ) : (
        <Animated.Image
          source={source}
          style={[style, { opacity }]}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={({ nativeEvent: { error } }) => handleError(new Error(error))}
          testID="image"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  placeholder: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff5252',
  },
});
