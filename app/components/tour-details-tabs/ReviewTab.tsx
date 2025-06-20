import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../../shared/constants';
import ReviewCard from '../ReviewCard';
import {TFunction} from 'i18next';

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

const ReviewTabFC = ({t}: {t: TFunction}) => {
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [animatingRating, setAnimatingRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
              {t('tour.youRatedThisTour')} {userRating} {t('tour.outOf5Stars')}
            </Text>
            <Pressable
              style={styles.rateAgainButton}
              onPress={() => setHasRated(false)}>
              <Text style={styles.rateAgainText}>{t('tour.rateAgain')}</Text>
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
};

export const ReviewTab = React.memo(ReviewTabFC);

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
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
});
