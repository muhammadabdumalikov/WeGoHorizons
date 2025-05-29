import React from 'react';
import {View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const SemiFilledStar = ({
  rating,
  iconSize = 18,
}: {
  rating: number;
  iconSize?: number;
}) => {
  let percentage = (rating / 5) * 100; // Calculate the percentage

  if (rating >= 3.5) {
    percentage = percentage - 6;
  }

  return (
    <View style={styles.starContainer}>
      {/* Background Star (Full Color) */}
      <AntDesign
        name="star"
        size={iconSize}
        color="#ddd"
        style={styles.backgroundStar}
      />

      {/* Foreground Star (Clipped by percentage) */}
      <View style={[styles.foregroundStar, {width: `${percentage}%`}]}>
        <AntDesign name="star" size={iconSize} color="#FFA500" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    position: 'relative',
    width: 18,
    height: 18,
  },
  backgroundStar: {
    position: 'absolute',
  },
  foregroundStar: {
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
