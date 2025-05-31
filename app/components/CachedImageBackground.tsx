import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle,
} from '@d11/react-native-fast-image';

interface CachedImageBackgroundProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
}

export const CachedImageBackground: React.FC<CachedImageBackgroundProps> = ({
  uri,
  style,
  imageStyle,
  children,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={[StyleSheet.absoluteFill, imageStyle]}
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
        {...props}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
