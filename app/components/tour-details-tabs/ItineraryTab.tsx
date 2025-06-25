import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../shared/constants';
import {Tour} from '../../types/tour';
import {TFunction} from 'i18next';

interface RoutePoint {
  type: 'location' | 'destination' | 'transport';
  title: string;
  transport_type?: string;
  duration?: string;
  activities?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const ItineraryTabFC = ({tour, t}: {tour: Tour; t: TFunction}) => {
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
          if (point.type === 'location') {
            icon = 'map-marker';
          } else if (point.type === 'destination') {
            icon = 'map-marker';
          } else if (point.type === 'transport') {
            icon = 'bus';
          }

          return (
            <View key={index}>
              <View key={index} style={styles.itineraryItem}>
                <View style={styles.itineraryContent}>
                  <View style={styles.itineraryIconContainer}>
                  <MaterialCommunityIcons
                    name={icon}
                    size={28}
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
                  {/* {isDestination && point.activities && (
                    <Text
                      style={[
                        styles.itineraryDescription,
                        styles.activityText,
                      ]}>
                      {point.activities}
                    </Text>
                  )} */}
                </View>
                </View>
              </View>
              {index !== tour?.route_json?.length! - 1 && (
                <View style={styles.itineraryLine} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const ItineraryTab = React.memo(ItineraryTabFC);

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
    marginBottom: 16,
  },
  itineraryList: {
    // gap: 16,
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
    borderWidth: 1.5,
  },
  itineraryTextContent: {
    flex: 1,
    marginLeft: 12,
  },
  itineraryTitle: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
    marginBottom: 2,
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
  itineraryLine: {
    marginVertical: 5,
    height: 20,
    marginLeft: 20,
    width: 1.5,
    backgroundColor: appColors.mainColor,
  },
});
