import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../shared/constants';
import { CachedImage } from './CachedImage';

interface ReviewCardProps {
  single?: boolean;
  userImage: string;
  userName: string;
  rating: number;
  postedTime: string;
  review: string;
  images?: string[];
}

const ReviewCard = ({
  single = false,
  userImage,
  userName,
  rating,
  postedTime,
  review,
  images,
}: ReviewCardProps) => {
  return (
    <View
      style={[
        styles.card,
        single
          ? {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }
          : {},
      ]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: userImage,
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.date}>{postedTime}</Text>
        </View>
        {/* Star Rating */}
        <View style={styles.rating}>
          <View style={styles.ratingBox}>
            <Text style={styles.rateTxt}>{rating}</Text>
            <FontAwesome size={12} name="star" color={appColors.pureWhite} />
          </View>
        </View>
      </View>

      {/* Review Text */}
      <Text style={styles.reviewText} numberOfLines={4}>
        {review}
      </Text>

      {/* Review Images */}
      {images && images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}>
          {images.map((image, index) => (
            <CachedImage
              key={index}
              uri={image}
              style={styles.reviewImage}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Gilroy-Semibold',
    color: '#8E8E93',
  },
  rating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 13,
    color: appColors.darkGrey,
    lineHeight: 18,
    fontFamily: 'Gilroy-Semibold',
    marginBottom: 12,
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
  imagesContainer: {
    marginTop: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default ReviewCard;
