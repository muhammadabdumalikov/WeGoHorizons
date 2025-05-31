import React from 'react';
import FastImage, { FastImageProps } from '@d11/react-native-fast-image';
import {StyleSheet} from 'react-native';

interface CachedImageProps extends Omit<FastImageProps, 'source'> {
  uri: string;
  style?: any;
}

export const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  style,
  ...props
}) => {  
  return (
    <FastImage
      style={[styles.image, style]}
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.contain}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
