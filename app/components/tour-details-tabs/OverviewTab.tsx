import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../shared/constants';
import {Tour} from '../../types/tour';
import {TFunction} from 'i18next';

const OverviewTabFC = ({tour, t}: {tour: Tour; t: TFunction}) => {
  return (
    <View style={styles.contentWrapper}>
      <Text style={styles.listingName}>{tour?.title || t('tour.empty')}</Text>
      <View style={styles.starReviewWrapper}>
        <View style={styles.starAndRate}>
          <View style={styles.ratingBox}>
            <Text style={styles.rateTxt}>{tour.rating || 0}</Text>
            <FontAwesome size={12} name="star" color={appColors.pureWhite} />
          </View>
          <Text style={styles.itemReview}>(3123 {t('tour.reviews')})</Text>
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
          <Text style={styles.startHourTitleTxt}>Sun, March 22, 2025</Text>
        </View>
        <Text style={styles.startHourDescriptionTxt}>8:30 PM - 9:00 PM</Text>
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
          <Text style={styles.startHourTitleTxt}>Metro Buyuk Ipak Yuli</Text>
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
                Entrance fees to Delphi's archaeological site and museum (€20)
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
          <Text style={styles.aboutTourItemTitleTxt}>{t('tour.duration')}</Text>
        </View>
        <Text style={styles.aboutTourItemDescriptionTxt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
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
          industry. Lorem Ipsum has been the industry's standard dummy text
        </Text>
      </View>

      <View style={styles.aboutTourItemBox}>
        <View style={styles.aboutTourItemTitleBox}>
          <MaterialCommunityIcons
            name="car-outline"
            size={24}
            color={appColors.navyBlack}
          />
          <Text style={styles.aboutTourItemTitleTxt}>{t('tour.transfer')}</Text>
        </View>
        <Text style={styles.aboutTourItemDescriptionTxt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
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
          industry. Lorem Ipsum has been the industry's standard dummy text
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
          industry. Lorem Ipsum has been the industry's standard dummy text
        </Text>
      </View>
    </View>
  );
};

export const OverviewTab = React.memo(OverviewTabFC);

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
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
});
