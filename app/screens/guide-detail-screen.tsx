import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/stack';
import {appColors} from '../shared/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CachedImage} from '../components/CachedImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ReviewCard from '../components/ReviewCard';

// Type for navigation props
type Props = NativeStackScreenProps<RootStackParamList, 'guide-detail-screen'>;

export function GuideDetailScreen({route, navigation}: Props) {
  const { guideId } = route.params;
   const handleSeeAllPress = () => {
     navigation.navigate('all-tours-screen', {title: 'Tours'});
   };
  guideId;
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 32}}>
      <View style={styles.headerImageWrapper}>
        <CachedImage
          uri={data.photo}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={28}
            color={appColors.navyBlack}
          />
        </Pressable>
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
        <View style={{marginTop: 24}}>
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
                      numberOfLines={1}>
                      Amazing Hanoi Tour
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
                        {' '}
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
      <View style={{paddingHorizontal: 20, marginTop: 16}}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  headerImageWrapper: {
    width: '100%',
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
  backButton: {
    position: 'absolute',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Gilroy-SemiBold',
    color: appColors.navyBlack,
    marginBottom: 4,
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
