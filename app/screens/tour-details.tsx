import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {addDotsToNumber} from '../shared/helpers';
import {openDialer} from '../components/PhoneCall';
import ReviewCard from '../components/ReviewCard';
import {useLocalization} from '../shared/hooks/useLocalization';

type RoutePointType = 'location' | 'destination' | 'transport';

interface RoutePoint {
  type: RoutePointType;
  title: string;
  transport_type?: string;
  duration?: string;
  activities?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

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
  // Add state for user rating
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [animatingRating, setAnimatingRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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

  const heartColorStyle = useAnimatedStyle(() => {
    return {
      color: heartColor.value,
    };
  });

  const handleRating = (rating: number) => {
    // First animate the stars filling up
    setIsAnimating(true);
    setHoverRating(0);
    setAnimatingRating(0);

    // Animate stars filling up one by one
    let currentStar = 0;
    const animationInterval = setInterval(() => {
      currentStar++;
      setAnimatingRating(currentStar);

      if (currentStar >= rating) {
        clearInterval(animationInterval);
        setIsAnimating(false);
        setUserRating(rating);

        // Then simulate submitting the rating
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setHasRated(true);
        }, 1000);
      }
    }, 150); // 150ms delay between each star
  };

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
    heartScale.value = withSequence(withSpring(1.2), withSpring(1));
    heartColor.value = withSpring(
      isLiked ? appColors.navyBlack : appColors.redVelvet,
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>
              {tour?.title || t('tour.empty')}
            </Text>
            <View style={styles.starReviewWrapper}>
              <View style={styles.starAndRate}>
                <View style={styles.ratingBox}>
                  <Text style={styles.rateTxt}>{tour.rating || 0}</Text>
                  <FontAwesome
                    size={12}
                    name="star"
                    color={appColors.pureWhite}
                  />
                </View>
                <Text style={styles.itemReview}>
                  (3123 {t('tour.reviews')})
                </Text>
              </View>
            </View>

            <View style={styles.startHourItemBox}>
              <View style={styles.startHourItemTitleBox}>
                <AntDesign
                  name="calendar"
                  size={22}
                  color={appColors.navyBlack}
                  style={styles.calendarIcon}
                />
                <Text style={styles.startHourTitleTxt}>
                  Sun, March 22, 2025
                </Text>
              </View>
              <Text style={styles.startHourDescriptionTxt}>
                8:30 PM - 9:00 PM
              </Text>
              <Pressable style={styles.reminderBtn}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={18}
                  color={appColors.mainColor}
                />
                <Text style={styles.reminderTxt}>{t('tour.reminder')}</Text>
              </Pressable>
            </View>

            <View style={styles.startHourItemBox}>
              <View style={styles.startHourItemTitleBox}>
                <SimpleLineIcons
                  name="location-pin"
                  size={22}
                  color={appColors.navyBlack}
                  style={styles.calendarIcon}
                />
                <Text style={styles.startHourTitleTxt}>
                  Metro Buyuk Ipak Yuli
                </Text>
              </View>
              <Text style={styles.startHourDescriptionTxt}>
                Dagestan Street, Tashkent
              </Text>
              <Pressable style={styles.reminderBtn}>
                <Fontisto name="map" size={16} color={appColors.mainColor} />
                <Text style={styles.reminderTxt}>{t('tour.directions')}</Text>
              </Pressable>
            </View>

            {/* ABOUT TOUR SECTION */}
            <Text style={styles.infoTitle}>{t('tour.aboutTour')}</Text>

            <Text style={styles.descriptionTxt}>
              {tour?.description || t('tour.empty')}
            </Text>

            {/* WHAT'S INCLUDED SECTION */}
            <Text style={styles.infoTitle}>{t('tour.whatsIncluded')}</Text>

            <View style={styles.includedList}>
              {tour.includes.map((item, index) => {
                return item.included ? (
                  <View style={styles.includedItem} key={index}>
                    <View style={styles.includedIconContainer}>
                      <Feather name="check" size={20} color="#4CAF50" />
                    </View>
                    <Text style={styles.includedText}>{item.title}</Text>
                  </View>
                ) : (
                  <View style={styles.includedItem} key={index}>
                    <View style={styles.includedIconContainer}>
                      <Feather name="x" size={20} color="#FF3B30" />
                    </View>
                    <Text style={styles.includedText}>
                      Entrance fees to Delphi's archaeological site and museum
                      (€20)
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.aboutTourItemBox}>
              <View style={styles.aboutTourItemTitleBox}>
                <MaterialCommunityIcons
                  name="clock-check-outline"
                  size={24}
                  color={appColors.navyBlack}
                />
                <Text style={styles.aboutTourItemTitleTxt}>
                  {t('tour.duration')}
                </Text>
              </View>
              <Text style={styles.aboutTourItemDescriptionTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </Text>
            </View>

            <View style={styles.aboutTourItemBox}>
              <View style={styles.aboutTourItemTitleBox}>
                <MaterialCommunityIcons
                  name="comment-account-outline"
                  size={24}
                  color={appColors.navyBlack}
                />
                <Text style={styles.aboutTourItemTitleTxt}>
                  {t('tour.speakingLanguage')}
                </Text>
              </View>
              <Text style={styles.aboutTourItemDescriptionTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </Text>
            </View>

            <View style={styles.aboutTourItemBox}>
              <View style={styles.aboutTourItemTitleBox}>
                <MaterialCommunityIcons
                  name="car-outline"
                  size={24}
                  color={appColors.navyBlack}
                />
                <Text style={styles.aboutTourItemTitleTxt}>
                  {t('tour.transfer')}
                </Text>
              </View>
              <Text style={styles.aboutTourItemDescriptionTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </Text>
            </View>

            <View style={styles.aboutTourItemBox}>
              <View style={styles.aboutTourItemTitleBox}>
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color={appColors.navyBlack}
                />
                <Text style={styles.aboutTourItemTitleTxt}>
                  {t('tour.groupTrip')}
                </Text>
              </View>
              <Text style={styles.aboutTourItemDescriptionTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </Text>
            </View>

            <View style={styles.aboutTourItemBox}>
              <View style={styles.aboutTourItemTitleBox}>
                <Ionicons
                  name="fast-food-outline"
                  size={24}
                  color={appColors.navyBlack}
                />
                <Text style={styles.aboutTourItemTitleTxt}>
                  {t('tour.breakfast')}
                </Text>
              </View>
              <Text style={styles.aboutTourItemDescriptionTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </Text>
            </View>
          </View>
        );
      case 'Itinerary':
        return (
          <View style={styles.contentWrapper}>
            <Text style={styles.sectionTitle}>{t('tour.tourItinerary')}</Text>

            {/* Itinerary List */}
            <View style={styles.itineraryList}>
              {tour?.route_json?.map((point: RoutePoint, index: number) => {
                let icon = 'map-marker';
                const isLocation = point.type === 'location';
                const isDestination = point.type === 'destination';

                // Determine icon based on point type
                if (point.type === 'transport') {
                  icon = 'bus';
                }

                return (
                  <View key={index} style={styles.itineraryItem}>
                    <View style={styles.itineraryContent}>
                      <View style={styles.itineraryIconContainer}>
                        <MaterialCommunityIcons
                          name={icon}
                          size={24}
                          color="#FFB800"
                        />
                      </View>
                      <View style={styles.itineraryTextContent}>
                        <Text style={styles.itineraryTitle}>
                          {isLocation
                            ? index === 0
                              ? t('tour.pickupLocation')
                              : t('tour.arriveBackAt')
                            : isDestination
                            ? point.title
                            : point.transport_type}
                        </Text>
                        <Text style={styles.itineraryDescription}>
                          {isLocation || isDestination
                            ? point.title
                            : `(${point.duration})`}
                        </Text>
                        {isDestination && point.activities && (
                          <Text
                            style={[
                              styles.itineraryDescription,
                              styles.activityText,
                            ]}>
                            {point.activities}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      case 'Photo':
        return (
          <View style={styles.contentWrapper}>
            <Text style={styles.comingSoonText}>
              {t('tour.photoGalleryComingSoon')}
            </Text>
          </View>
        );
      case 'Review':
        return (
          <View style={styles.contentWrapper}>
            <View style={styles.ratingSection}>
              <Text style={styles.ratingTitle}>{t('tour.yourRating')}</Text>

              {isSubmitting ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={appColors.mainColor} />
                </View>
              ) : hasRated ? (
                <View style={styles.thankYouContainer}>
                  <Text style={styles.thankYouText}>
                    {t('tour.thankYouForRating')}
                  </Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <FontAwesome
                        key={star}
                        name={star <= userRating ? 'star' : 'star-o'}
                        size={36}
                        color={star <= userRating ? '#FFC107' : appColors.grey5}
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingValueText}>
                    {t('tour.youRatedThisTour')} {userRating}{' '}
                    {t('tour.outOf5Stars')}
                  </Text>
                  <Pressable
                    style={styles.rateAgainButton}
                    onPress={() => setHasRated(false)}>
                    <Text style={styles.rateAgainText}>
                      {t('tour.rateAgain')}
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Pressable
                        key={star}
                        onPress={() => !isAnimating && handleRating(star)}
                        onPressIn={() => !isAnimating && setHoverRating(star)}
                        onPressOut={() => !isAnimating && setHoverRating(0)}
                        style={[
                          styles.starButton,
                          star <= userRating && styles.selectedStarButton,
                          star <= hoverRating && styles.hoverStarButton,
                          star <= animatingRating && styles.animatingStarButton,
                          isAnimating && styles.disabledStar,
                        ]}>
                        <FontAwesome
                          name={
                            star <= userRating ||
                            star <= hoverRating ||
                            star <= animatingRating
                              ? 'star'
                              : 'star-o'
                          }
                          size={48}
                          color={
                            star <= animatingRating
                              ? '#FFC107'
                              : star <= userRating || star <= hoverRating
                              ? '#FFC107'
                              : appColors.grey5
                          }
                        />
                      </Pressable>
                    ))}
                  </View>
                  <Text style={styles.ratingHelperText}>
                    {isAnimating
                      ? t('tour.rating')
                      : hoverRating > 0
                      ? getRatingText(hoverRating)
                      : t('tour.tapStarToRate')}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.reviewsList}>
              <ReviewCard
                userImage="https://picsum.photos/200"
                userName="Lela Peterson"
                rating={4.5}
                postedTime="3 hours ago"
                review="A nice quaint cafe with a good view of the lower city and mountains. Good to visit even when cloudy or raining because they have a friendly pupper"
                images={[
                  'https://picsum.photos/300',
                  'https://picsum.photos/301',
                  'https://picsum.photos/302',
                ]}
              />
              <ReviewCard
                userImage="https://picsum.photos/201"
                userName="Madeline Bush"
                rating={4.5}
                postedTime="3 hours ago"
                review="A nice quaint cafe with a good view of the lower city and mountains. Good to visit even when cloudy or raining because they have a friendly pupper"
                images={[
                  'https://picsum.photos/303',
                  'https://picsum.photos/304',
                  'https://picsum.photos/305',
                ]}
              />
            </View>
          </View>
        );
      case 'Community':
        return (
          <View style={styles.contentWrapper}>
            <Text style={styles.comingSoonText}>
              {t('tour.communityComingSoon')}
            </Text>
          </View>
        );
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
          <View style={styles.headerLeftIcon}>
            <Feather name="arrow-left" size={20} color={appColors.navyBlack} />
          </View>
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Animated.Text
            style={[styles.headerTxt, animatedTextStyle]}
            numberOfLines={1}>
            {tour?.title}
          </Animated.Text>
        </View>

        <View style={styles.headerRightBox}>
          <Pressable style={styles.headerLeftBox} onPress={handleHeartPress}>
            <Animated.View style={[styles.headerLeftIcon, heartAnimatedStyle]}>
              <Animated.Text style={heartColorStyle}>
                <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={20} />
              </Animated.Text>
            </Animated.View>
          </Pressable>
          <Pressable
            style={styles.headerLeftBox}
            onPress={() => navigation.goBack()}>
            <View style={styles.headerLeftIcon}>
              <Feather name="share-2" size={20} color={appColors.navyBlack} />
            </View>
          </Pressable>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        onScroll={onScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}>
        <Pressable
          onPress={() => navigation.navigate('gallery-carousel-screen')}>
          <ImageBackground
            source={{uri: tour?.files?.find(f => f.type === 'extra')?.url}}
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
                    {tour?.organizer_title}
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
          </ImageBackground>
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

// Helper function to get rating text based on rating value
function getRatingText(rating: number): string {
  switch (rating) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
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
    padding: 4,
    borderRadius: 10,
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
  contentWrapper: {
    padding: 16,
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
  listingName: {
    fontSize: 24,
    letterSpacing: 0.2,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Bold',
  },
  starReviewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  descriptionTxt: {
    fontSize: 14,
    color: appColors.navyBlack,
    letterSpacing: 0.3,
    lineHeight: 20,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 12,
  },
  starAndRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemReview: {
    fontSize: 14,
    color: '#606060',
    fontFamily: 'Gilroy-Regular',
    textDecorationLine: 'underline',
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
  reviewSectionTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
    marginHorizontal: 16,
  },
  infoTitle: {
    fontSize: 19,
    color: appColors.navyBlack,
    marginBottom: 16,
    marginTop: 10,
    fontFamily: 'Gilroy-Bold',
  },
  aboutTourItemBox: {
    marginBottom: 20,
  },
  aboutTourItemTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  aboutTourItemTitleTxt: {
    fontSize: 16,
    marginLeft: 16,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
  },
  startHourItemBox: {
    marginBottom: 20,
  },
  startHourTitleTxt: {
    fontSize: 14,
    marginLeft: 16,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Regular',
  },
  startHourDescriptionTxt: {
    fontSize: 12,
    marginLeft: 38,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Regular',
  },
  startHourItemTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutTourItemDescriptionTxt: {
    fontSize: 14,
    marginLeft: 38,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Semibold',
    lineHeight: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.green2,
    width: 48,
    height: 24,
    marginRight: 6,
    borderRadius: 7,
  },
  rateTxt: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 2,
    marginRight: 3,
    color: appColors.pureWhite,
    fontFamily: 'Gilroy-Semibold',
  },
  calendarIcon: {
    marginTop: 3,
  },
  reminderBtn: {
    marginTop: 8,
    flexDirection: 'row',
    marginLeft: 38,
    gap: 6,
    alignItems: 'center',
  },
  reminderTxt: {
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
    color: appColors.mainColor,
    textDecorationLine: 'underline',
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
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
    textAlign: 'center',
    marginTop: 32,
  },
  ratingSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
    marginBottom: 16,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsList: {
    marginTop: 8,
    gap: 24,
  },
  itineraryContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  itineraryList: {
    gap: 16,
  },
  itineraryItem: {
    flexDirection: 'row',
    position: 'relative',
  },
  itineraryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itineraryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: appColors.mainColor,
    borderWidth: 1,
  },
  locationIcon: {
    backgroundColor: '#F97316', // orange-500
  },
  destinationIcon: {
    backgroundColor: '#2563EB', // blue-600
  },
  transportIcon: {
    backgroundColor: '#F3F4F6', // gray-100
    borderWidth: 2,
    borderColor: '#E5E7EB', // gray-200
  },
  itineraryTextContent: {
    flex: 1,
    marginLeft: 12,
  },
  itineraryTitle: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
    marginBottom: 4,
  },
  itineraryDescription: {
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
    color: appColors.darkGrey,
    lineHeight: 20,
  },
  activityText: {
    fontSize: 13,
    marginTop: 4,
  },
  includedList: {
    gap: 16,
    marginBottom: 24,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  includedIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  includedText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#1A1A1A',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
    marginBottom: 16,
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  thankYouContainer: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#F8F8F8',
    padding: 24,
    borderRadius: 12,
    width: '100%',
  },
  thankYouText: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
    marginBottom: 8,
  },
  ratingValueText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
    marginBottom: 24,
  },
  rateAgainButton: {
    backgroundColor: appColors.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rateAgainText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.pureWhite,
  },
  starButton: {
    padding: 8,
  },
  selectedStarButton: {
    transform: [{scale: 1.1}],
  },
  hoverStarButton: {
    transform: [{scale: 1.2}],
  },
  animatingStarButton: {
    transform: [{scale: 1.3}],
  },
  disabledStar: {
    opacity: 0.7,
  },
  ratingHelperText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
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
});
