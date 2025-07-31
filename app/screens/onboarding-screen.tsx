import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import {appColors} from '../shared/constants';
import {GilroyBoldText, GilroyMediumText} from '../components/StyledText';

const {width, height} = Dimensions.get('screen');

type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const data: OnboardingItem[] = [
  {
    id: '1',
    title: 'Discover Amazing Place',
    description:
      'Plan Your Trip, choose your desination. Pick the best localguide for your holiday',
    image: require('../../assets/images/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Book a Local',
    description:
      'You can book private city tours with locals on-the-go and experience a new place like never before',
    image: require('../../assets/images/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Share Your Adventures',
    description:
      "Enjoy your holiday! don't forget to take a photo and share to the world",
    image: require('../../assets/images/onboarding3.png'),
  },
];

const AnimatedFlatList =
  Animated.createAnimatedComponent<
    React.ComponentProps<typeof FlatList<OnboardingItem>>
  >(FlatList);

const OnboardingSlide = React.memo(
  ({
    item,
    index,
    scrollX,
    currentIndex,
    handleNext,
    handleSkip,
  }: {
    item: OnboardingItem;
    index: number;
    scrollX: SharedValue<number>;
    currentIndex: number;
    handleNext: () => void;
    handleSkip: () => void;
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageAnimatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      );
      return {
        transform: [{scale}],
      };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        scrollX.value,
        inputRange,
        [width * 0.5, 0, -width * 0.5],
        Extrapolation.CLAMP,
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      return {
        transform: [{translateX}],
        opacity,
      };
    });

    return (
      <View style={styles.slide}>
        <ImageBackground
          source={require('../../assets/images/onboarding-blackwall.png')}
          style={styles.imageWrapper}
          resizeMode="cover">
          <View style={styles.imageContainer}>
            <Animated.Image
              source={item.image}
              style={[styles.image, imageAnimatedStyle]}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
        <Animated.View style={[styles.contentBox, textAnimatedStyle]}>
          <View style={styles.contentContainer}>
            <GilroyBoldText style={styles.title}>{item.title}</GilroyBoldText>
            <GilroyMediumText style={styles.description} numberOfLines={3}>
              {item.description}
            </GilroyMediumText>
            <View style={styles.pagination}>
              {data.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.paginationDot,
                    idx === currentIndex && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
            <Pressable style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>
                {currentIndex === data.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </Pressable>
            <Pressable onPress={handleSkip}>
              <GilroyMediumText style={styles.skipText}>
                Skip for now
              </GilroyMediumText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  },
);

export function OnboardingScreen({navigation}: {navigation: any}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('tab-navigator');
    }
  };

  const handleSkip = () => {
    navigation.replace('tab-navigator');
  };

  const renderItem: React.ComponentProps<
    typeof FlatList<OnboardingItem>
  >['renderItem'] = ({item, index}) => (
    <OnboardingSlide
      item={item}
      index={index}
      scrollX={scrollX}
      currentIndex={currentIndex}
      handleNext={handleNext}
      handleSkip={handleSkip}
    />
  );

  const handleMomentumScrollEnd = (
    ev: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  slide: {
    width,
    height,
    flex: 1,
  },
  imageWrapper: {
    height: 500,
    marginTop: -120,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 350,
  },
  image: {
    width: 310,
    height: 330,
    backgroundColor: 'transparent',
  },
  contentBox: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 65,
    left: 20,
    right: 20,
    backgroundColor: appColors.grey1,
    borderRadius: 30,
    padding: 24,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: appColors.mainBlack,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: appColors.mainColor,
  },
  button: {
    backgroundColor: appColors.mainBlack,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: appColors.pureWhite,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
  },
  skipText: {
    color: appColors.mainBlack,
    fontSize: 16,
  },
});
