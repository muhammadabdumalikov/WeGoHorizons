import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/stack';
import {appColors} from '../shared/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CachedImage} from '../components/CachedImage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ReviewCard from '../components/ReviewCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// Type for navigation props
type Props = NativeStackScreenProps<RootStackParamList, 'guide-detail-screen'>;

const HEADER_HEIGHT = 60;
const {width} = Dimensions.get('window');
export function GuideDetailScreen({route, navigation}: Props) {
  const {guideId} = route.params;
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [width-70, width-68],
        ['transparent', appColors.pureWhite],
        'RGB',
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [width-70, width-68], [0, 1]),
    };
  });

  const handleSeeAllPress = () => {
    navigation.navigate('all-tours-screen', {title: 'Tours'});
  };

  // Mock data fallback if guide is not provided
  const data = {
    name: 'V. Phuong Trang',
    location: 'Hanoi, Vietnam',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    about:
      'I stayed in U.K for one year and work as travel guide for 2 years and have a teahouse where travellers can meet and exchange travel tips in Vietnam and other countries.',
    interests: [
      {label: 'Tennis', icon: '🎾'},
      {label: 'Music', icon: '🎵'},
      {label: 'Fast food', icon: '🍔'},
      {label: 'Outdoor activities', icon: '🌳'},
      {label: 'Bicycle', icon: '🚴‍♂️'},
      {label: 'Basketball', icon: '🏀'},
      {label: 'Video game', icon: '🎮'},
      {label: 'Skis', icon: '🎿'},
    ],
    languages: [
      {label: 'English', level: 4},
      {label: 'Vietnamese', level: 5},
    ],
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[styles.header, animatedHeaderStyle, {paddingTop: top}]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome6 name="chevron-left" size={18} color={appColors.navyBlack} />
        </Pressable>
        <Animated.Text style={[styles.headerTitle, animatedTextStyle]}>
          {data.name}
        </Animated.Text>
        <View style={{width: 40}} />
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 32}}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <View style={styles.headerImageWrapper}>
          <CachedImage
            uri={data.photo}
            style={[styles.headerImage, {marginTop: top - 16}]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.locationRow}>
            <SimpleLineIcons
              name="location-pin"
              size={16}
              color={appColors.darkGrey}
            />
            <Text style={styles.locationText}>{data.location}</Text>
          </View>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.aboutText}>{data.about}</Text>
          <Text style={styles.sectionTitle}>Interested</Text>
          <View style={styles.interestsWrapper}>
            {data?.interests?.map((item: any, idx: any) => (
              <View key={idx} style={styles.interestItem}>
                <Text style={styles.interestText}>{item.icon}</Text>
                <Text style={styles.interestText}>{item.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesWrapper}>
            {data.languages?.map((lang: any, idx: any) => (
              <View key={idx} style={styles.languageRow}>
                <Text style={styles.languageLabel}>{lang.label}</Text>
                <View style={styles.languageBarBg}>
                  <View
                    style={[styles.languageBar, {width: `${lang.level * 10}%`}]}
                  />
                </View>
              </View>
            ))}
          </View>
          {/* Tours Section */}
          <View style={{marginTop: 24, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#F5F5F5'}}>
            <View style={styles.headerRow}>
              <Text style={styles.sectionTitle2}>Tours</Text>
              <Pressable
                onPress={handleSeeAllPress}
                style={styles.showAllBtn}
                hitSlop={8}>
                <Text style={styles.showAllText}>See all</Text>
                <FontAwesome
                  name="angle-right"
                  size={18}
                  color={appColors.mainColor}
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {[...Array(6)].map((_, idx) => (
                <View key={idx} style={{width: '48%', marginBottom: 16}}>
                  {/* Tour Card */}
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 16,
                      overflow: 'hidden',
                      elevation: 2,
                    }}>
                    <CachedImage
                      uri="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
                      style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                    <View style={{paddingVertical: 10, paddingHorizontal: 6}}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: 15,
                          color: appColors.navyBlack,
                        }}
                        numberOfLines={2}>
                        {idx % 2 === 0
                          ? 'Amazing Hanoi Tour'
                          : 'Amazing Hanoi Tour wwwwwwwwwwwwwwwwww'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Medium',
                          fontSize: 13,
                          color: appColors.darkGrey,
                          marginVertical: 2,
                        }}
                        numberOfLines={1}>
                        Cultural • Coffee
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: appColors.green2,
                            borderRadius: 7,
                            paddingHorizontal: 6,
                            height: 22,
                            marginRight: 6,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: appColors.pureWhite,
                              fontFamily: 'Gilroy-Semibold',
                              marginRight: 2,
                            }}>
                            4.5
                          </Text>
                          <FontAwesome
                            name="star"
                            size={12}
                            color={appColors.pureWhite}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Semibold',
                            color: appColors.mainColor,
                            fontSize: 13,
                          }}>
                          $25
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Medium',
                            color: appColors.darkGrey,
                            fontSize: 12,
                          }}>
                          /person
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* Reviews Section */}
        <View style={{paddingHorizontal: 20, marginTop: 8}}>
          <Text style={styles.sectionTitle}>Review (3)</Text>
          <ReviewCard
            userImage="https://randomuser.me/api/portraits/women/44.jpg"
            userName="Laurie Blair"
            rating={4.5}
            postedTime="Posted 3 hours ago"
            review="I had meet Linh for 5 hours in Hanoi old quarter it was a great tour and she know too much about Hanoi"
          />
          <ReviewCard
            userImage="https://randomuser.me/api/portraits/men/32.jpg"
            userName="Dana Cox"
            rating={4.5}
            postedTime="Posted 3 hours ago"
            review="What a joy to see all of the beautiful exhibits. My daughter especially enjoyed"
          />
          <ReviewCard
            userImage="https://randomuser.me/api/portraits/women/68.jpg"
            userName="Janet Mcdonald"
            rating={4.5}
            postedTime="Posted 3 hours ago"
            review="There is so much to see. The exhibits were spectacular. We ate small bites"
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
  },
  headerImageWrapper: {
    width: width,
    height: width,
    aspectRatio: 1,
    position: 'relative',
    marginBottom: 16,
    padding: 10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    overflow: 'hidden',
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Gilroy-SemiBold',
    color: appColors.navyBlack,
    marginBottom: 4,
    marginTop: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    color: appColors.navyBlack,
    marginBottom: 10,
    marginTop: 18,
    fontFamily: 'Gilroy-SemiBold',
  },
  sectionTitle2: {
    fontSize: 18,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-SemiBold',
  },
  aboutText: {
    fontSize: 14,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
    lineHeight: 22,
  },
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#F8F8F8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    gap: 6,
  },
  interestText: {
    fontSize: 15,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Medium',
  },
  languagesWrapper: {
    marginTop: 8,
    gap: 12,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  languageLabel: {
    width: 100,
    fontSize: 15,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Medium',
  },
  languageBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  languageBar: {
    height: 8,
    backgroundColor: appColors.mainColor,
    borderRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
  },
  showAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  showAllText: {
    color: appColors.mainColor,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    marginRight: 2,
  },
});
