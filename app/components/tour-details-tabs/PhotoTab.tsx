import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import {appColors} from '../../shared/constants';
import {TFunction} from 'i18next';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const columnWidth = (width - 24) / 2; // 16 padding horizontal, 8 gap

// Mock data for photo gallery
const mockPhotos = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/picsum1/400/600',
    height: columnWidth * 1.5,
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/picsum2/400/500',
    height: columnWidth * 1.25,
  },
  {
    id: '3',
    url: 'https://picsum.photos/seed/picsum3/400/700',
    height: columnWidth * 1.75,
  },
  {
    id: '4',
    url: 'https://picsum.photos/seed/picsum4/400/450',
    height: columnWidth * 1.1,
  },
  {
    id: '5',
    url: 'https://picsum.photos/seed/picsum5/400/550',
    height: columnWidth * 1.4,
  },
  {
    id: '6',
    url: 'https://picsum.photos/seed/picsum6/400/650',
    height: columnWidth * 1.6,
  },
  {
    id: '7',
    url: 'https://picsum.photos/seed/picsum7/400/400',
    height: columnWidth * 1.0,
  },
  {
    id: '8',
    url: 'https://picsum.photos/seed/picsum8/400/620',
    height: columnWidth * 1.55,
  },
  {
    id: '9',
    url: 'https://picsum.photos/seed/picsum9/400/520',
    height: columnWidth * 1.3,
  },
  {
    id: '10',
    url: 'https://picsum.photos/seed/picsum10/400/720',
    height: columnWidth * 1.8,
  },
];

// Separate photos into two columns for masonry layout
const leftColumnPhotos = mockPhotos.filter((_, index) => index % 2 === 0);
const rightColumnPhotos = mockPhotos.filter((_, index) => index % 2 !== 0);

const PhotoTabFC = ({t: _t}: {t: TFunction}) => {
  const navigation = useNavigation<any>();

  const handlePhotoPress = (photoUrl: string) => {
    // Navigate to a full-screen image viewer, passing the URL
    // This screen needs to be created, e.g., 'gallery-carousel-screen'
    navigation.navigate('gallery-carousel-screen', {
      photos: mockPhotos.map(p => p.url),
      initialPhoto: photoUrl,
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.masonryContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftColumnPhotos.map(photo => (
            <Pressable
              key={photo.id}
              onPress={() => handlePhotoPress(photo.url)}>
              <Image
                source={{uri: photo.url}}
                style={[styles.image, {height: photo.height}]}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightColumnPhotos.map(photo => (
            <Pressable
              key={photo.id}
              onPress={() => handlePhotoPress(photo.url)}>
              <Image
                source={{uri: photo.url}}
                style={[styles.image, {height: photo.height}]}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export const PhotoTab = React.memo(PhotoTabFC);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16,
    backgroundColor: appColors.pureWhite,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  image: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: appColors.grey5,
  },
});
