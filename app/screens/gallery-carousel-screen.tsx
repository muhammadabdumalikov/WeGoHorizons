import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  Text,
} from 'react-native';
import {RootStackParamList} from '../types/stack';
import {appColors} from '../shared/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<
  RootStackParamList,
  'gallery-carousel-screen'
>;

export function GalleryCarouselScreen({navigation, route}: Props) {
  const {photos, initialPhoto} = route.params;
  const {top, bottom} = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(
    photos.findIndex(p => p === initialPhoto),
  );
  const flatListRef = useRef<FlatList>(null);

  const headerOpacity = useSharedValue(1);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const toggleHeader = () => {
    headerOpacity.value = withTiming(headerOpacity.value === 1 ? 0 : 1, {
      duration: 300,
    });
  };

  const renderItem = ({item}: {item: string}) => (
    <Pressable onPress={toggleHeader} style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} resizeMode="contain" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[styles.header, {paddingTop: top + 10}, animatedHeaderStyle]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesome6
            name="chevron-left"
            size={22}
            color={appColors.pureWhite}
          />
        </Pressable>
        <Text style={styles.headerText}>
          {currentIndex + 1} / {photos.length}
        </Text>
        <View style={{width: 40}} />
      </Animated.View>

      <FlatList
        ref={flatListRef}
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIndex}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        getItemLayout={(_data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Animated Footer with Thumbnails */}
      <Animated.View
        style={[
          styles.footer,
          {paddingBottom: bottom + 10},
          animatedHeaderStyle,
        ]}>
        <FlatList
          data={photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `thumb-${item}`}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                flatListRef.current?.scrollToIndex({index});
                setCurrentIndex(index);
              }}>
              <Image
                source={{uri: item}}
                style={[
                  styles.thumbnail,
                  currentIndex === index && styles.activeThumbnail,
                ]}
              />
            </Pressable>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.navyBlack,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    color: appColors.pureWhite,
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
  },
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: appColors.mainColor,
  },
});
