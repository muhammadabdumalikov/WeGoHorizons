import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {RootStackParamList} from '../types/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../shared/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {addDotsToNumber} from '../shared/helpers';
import {openDialer} from '../components/PhoneCall';
import {useLocalization} from '../shared/hooks/useLocalization';
import {CachedImageBackground} from '../components/CachedImageBackground';
import {
  OverviewTab,
  ItineraryTab,
  PhotoTab,
  ReviewTab,
  CommunityTab,
} from '../components/tour-details-tabs';

type Props = NativeStackScreenProps<RootStackParamList, 'tour-details-screen'>;

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

type TabType = 'Overview' | 'Photo' | 'Review' | 'Community' | 'Itinerary';

export function TourDetailsScreen({navigation, route}: Props) {
  const {t} = useLocalization();
  const {top} = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const {params} = route;
  const tour = params.tour;

  const scrollY = useSharedValue(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const heartScale = useSharedValue(1);
  const heartColor = useSharedValue(appColors.navyBlack);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [IMG_HEIGHT - 70, IMG_HEIGHT - 68],
        ['transparent', appColors.pureWhite],
        'RGB',
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [IMG_HEIGHT - 70, IMG_HEIGHT - 68],
        [0, 1],
      ),
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: heartScale.value}],
    };
  });

  const handleHeartPress = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    heartScale.value = withSequence(withSpring(1.2), withSpring(1));
    heartColor.value = withSpring(
      newLikedState ? appColors.redVelvet : appColors.navyBlack,
    );

    // Show tooltip
    setTooltipMessage(
      newLikedState
        ? t('tour.addedToFavorites')
        : t('tour.removedFromFavorites'),
    );
    setShowTooltip(true);

    // Hide tooltip after 2 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab tour={tour} t={t} />;
      case 'Itinerary':
        return <ItineraryTab tour={tour} t={t} />;
      case 'Photo':
        return <PhotoTab t={t} />;
      case 'Review':
        return <ReviewTab t={t} />;
      case 'Community':
        return <CommunityTab tour={tour} t={t} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.headerStyle, animatedHeaderStyle, {paddingTop: top}]}>
        <Pressable
          style={styles.headerLeftBox}
          onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="chevron-left"
            size={20}
            color={appColors.navyBlack}
          />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Animated.Text
            style={[styles.headerTxt, animatedTextStyle]}
            numberOfLines={1}>
            {typeof tour?.title === 'string' ? tour.title : ''}
          </Animated.Text>
        </View>

        <View style={styles.headerRightBox}>
          <Pressable onPress={handleHeartPress}>
            <View style={styles.headerLeftBox}>
              <Animated.View style={[heartAnimatedStyle]}>
                <FontAwesome
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={22}
                  color={isLiked ? appColors.redVelvet : appColors.navyBlack}
                />
              </Animated.View>
            </View>
          </Pressable>
          <Pressable
            style={styles.headerLeftBox}
            onPress={() => navigation.goBack()}>
            <Feather name="share-2" size={20} color={appColors.navyBlack} />
          </Pressable>
        </View>

        {/* Tooltip */}
        {showTooltip && (
          <Animated.View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{tooltipMessage}</Text>
          </Animated.View>
        )}
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        onScroll={onScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}>
        <Pressable
          onPress={() =>
            navigation.navigate('gallery-carousel-screen', {
              photos: tour?.files?.map(f => f.url) || [],
              initialPhoto:
                tour?.files?.find(f => f.type === 'extra')?.url || '',
            })
          }>
          <CachedImageBackground
            uri={tour?.files?.find(f => f.type === 'extra')?.url as string}
            style={styles.image}>
            {/* Image content wrapper with organizer info */}
            <View style={styles.imgContentWrapper}>
              <BlurView
                blurAmount={15}
                blurType="light"
                style={styles.blurContent}
              />

              <View style={styles.organizerContentWrapper}>
                <Image
                  source={{uri: tour?.organizer_logo}}
                  style={styles.organizerPhoto}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.organizerTopTxtOnImg}>
                    {t('tour.organizer')}
                  </Text>
                  <Text
                    style={styles.organizerBottomTxtOnImg}
                    numberOfLines={1}>
                    {typeof tour?.organizer_title === 'string' ? tour.organizer_title : ''}
                  </Text>
                </View>
              </View>
            </View>

            {/* Image counter indicator */}
            {tour?.files && tour.files.length > 1 && (
              <View style={styles.imageCounterContainer}>
                <FontAwesome6
                  name="images"
                  size={14}
                  color={appColors.pureWhite}
                />
                <Text style={styles.imageCounterText}>{tour.files.length}</Text>
              </View>
            )}
          </CachedImageBackground>
        </Pressable>

        <View style={styles.tabContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}>
            {(
              [
                'Overview',
                'Itinerary',
                'Photo',
                'Review',
                'Community',
              ] as TabType[]
            ).map(tab => (
              <Pressable
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}>
                  {t(`tour.${tab.toLowerCase()}`)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {renderTabContent()}
      </Animated.ScrollView>
      <View style={styles.bookingFooter}>
        <View style={styles.bookingPriceBox}>
          <Text style={styles.bookingPriceTxt}>
            {addDotsToNumber(+tour.price)} sum
          </Text>
        </View>
        <Pressable
          style={styles.bookBtn}
          onPress={() => openDialer(tour.organizer_phone)}>
          <Text style={styles.bookBtnTxt}>{t('hotel.bookNow')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  headerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 1,
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },
  headerTxt: {
    color: appColors.navyBlack,
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
  },
  headerLeftBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerLeftIcon: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: appColors.pureWhite,
  },
  headerRightBox: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
    position: 'relative',
  },
  imgContentWrapper: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  blurContent: {
    height: 44,
    width: 180,
    borderRadius: 22,
  },
  organizerContentWrapper: {
    height: 44,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 5,
  },
  organizerPhoto: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginRight: 5,
  },
  organizerTopTxtOnImg: {
    color: appColors.pureWhite,
    fontSize: 12,
    fontFamily: 'gilroy-Semibold',
  },
  organizerBottomTxtOnImg: {
    color: appColors.pureWhite,
    fontSize: 14,
    width: 120,
    fontFamily: 'Gilroy-Semibold',
  },
  bookingFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 8,
    height: 84,
    width: '100%',
  },
  bookingPriceBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    flex: 1,
  },
  bookingPriceTxt: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  bookBtn: {
    width: 210,
    height: 45,
    backgroundColor: appColors.mainColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookBtnTxt: {
    fontSize: 14,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  tabContainer: {
    backgroundColor: appColors.pureWhite,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: appColors.mainColor,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  activeTabText: {
    color: appColors.mainColor,
    fontFamily: 'Gilroy-Bold',
  },
  imageCounterContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    zIndex: 2,
  },
  imageCounterText: {
    color: appColors.pureWhite,
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
  tooltipContainer: {
    position: 'absolute',
    top: 60,
    right: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    maxWidth: 200,
    zIndex: 1000,
  },
  tooltipText: {
    color: appColors.pureWhite,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    textAlign: 'center',
  },
});
