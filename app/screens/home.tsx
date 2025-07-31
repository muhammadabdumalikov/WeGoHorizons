import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  Animated,
  StatusBar,
  FlatList,
  View,
  Text,
  Pressable,
  InteractionManager,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColors} from '../shared/constants';
import {Tours} from '../components/Tour';
import {Organizers} from '../components/Organizers';
import {useQuery} from '@tanstack/react-query';
import {fetchOrganizers, fetchTours} from '../api/cities';
import {SearchBar} from '../components/SearchBar';
import {Stories} from '../components/Stories';
import Geolocation from '@react-native-community/geolocation';
import {TourCardsSmall} from './all-tours';
import {CustomNavigationProp} from '../types/stack';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useLocalization} from '../shared/hooks/useLocalization';

const mockStories = [
  {
    id: '1',
    username: 'John',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    viewed: false,
  },
  {
    id: '2',
    username: 'Sarah',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    viewed: false,
  },
  {
    id: '3',
    username: 'Mike',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    viewed: true,
  },
  {
    id: '4',
    username: 'Emma',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    viewed: false,
  },
  {
    id: '5',
    username: 'David',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    viewed: true,
  },
];

export function HomeScreen() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 80; // Approximate height of SearchBar
  const insets = useSafeAreaInsets();
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;
  const {t} = useLocalization();
  const navigation = useNavigation<CustomNavigationProp>();

  const {data: tours} = useQuery({
    queryKey: ['destinations'],
    queryFn: () => fetchTours(),
  });

  const {data: organizers} = useQuery({
    queryKey: ['organizers'],
    queryFn: fetchOrganizers,
  });

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('all-tours-screen', {title: t('home.tours')});
  }, [navigation, t]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather App Location Permission',
            message:
              'Weather App needs access to your location to provide weather data',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  };

  useEffect(() => {
    const getWeatherData = (latitude: number, longitude: number) => {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=407534e110aa4e0a95b75611251602&q=${latitude},${longitude}&aqi=no`,
      )
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setLocationError(null);
        })
        .catch(err => {
          console.error('Weather fetch error:', err);
          setWeatherData(null);
          setLocationError('Failed to fetch weather data');
        });
    };

    const getUserLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setWeatherData(null);
        setLocationError('Location permission denied');
        return;
      }
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          getWeatherData(latitude, longitude);
        },
        error => {
          console.error('Location error:', error);
          setWeatherData(null);
          setLocationError('Failed to get location');
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
      );
    };

    getUserLocation();
  }, []);

  // Add performance monitoring
  useEffect(() => {
    const startTime = performance.now();

    InteractionManager.runAfterInteractions(() => {
      const endTime = performance.now();
      console.log(
        `⚡ Home Screen Load Time: ${(endTime - startTime).toFixed(2)}ms`,
      );
    });
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDirection =
          currentScrollY > lastScrollY.current ? 'down' : 'up';

        const isScrolling = Math.abs(currentScrollY - lastScrollY.current);
        // Only trigger animation if scroll position changed significantly
        if (isScrolling > 4) {
          if (
            scrollDirection === 'down' &&
            currentScrollY > HEADER_HEIGHT &&
            isScrolling > 8
          ) {
            // Hide header when scrolling down
            Animated.timing(headerTranslateY, {
              toValue: -HEADER_HEIGHT - STATUS_BAR_HEIGHT,
              duration: 350,
              useNativeDriver: true,
            }).start();
          } else if (scrollDirection === 'up') {
            // Show header when scrolling up
            Animated.timing(headerTranslateY, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }).start();
          }
        }

        lastScrollY.current = currentScrollY;
      },
    },
  );

  const renderTourItem = useCallback(
    ({item}: {item: any}) => (
      <TourCardsSmall item={item} navigation={navigation} />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  // Create sections for the FlatList
  const sections = useCallback(() => {
    const sectionsData = [];

    // Add error section if exists
    if (locationError) {
      sectionsData.push({
        type: 'error',
        data: [{id: 'error', message: locationError}],
      });
    }

    // Add stories section
    sectionsData.push({
      type: 'stories',
      data: mockStories,
    });

    // Add tours section
    if (tours) {
      sectionsData.push({
        type: 'tours',
        data: tours,
      });
    }

    // Add organizers section
    if (organizers) {
      sectionsData.push({
        type: 'organizers',
        data: organizers,
      });
    }

    // Add tours grid section
    if (tours) {
      sectionsData.push({
        type: 'toursGrid',
        data: tours,
      });
    }

    return sectionsData;
  }, [locationError, tours, organizers]);

  const renderSection = useCallback(
    ({item}: {item: any}) => {
      switch (item.type) {
        case 'error':
          return (
            <View style={{padding: 16, backgroundColor: '#fffbe6'}}>
              <Text style={{color: 'red'}}>{item.data[0].message}</Text>
            </View>
          );

        case 'stories':
          return (
            <Stories
              stories={item.data}
              onStoryPress={storyId => {
                Alert.alert(
                  t('home.storyPressed'),
                  `${t('home.openingStory')} ${storyId}`,
                );
              }}
            />
          );

        case 'tours':
          return <Tours tourData={item.data} title={t('home.upcomingTours')} />;

        case 'organizers':
          return <Organizers listings={item.data} />;

        case 'toursGrid':
          return (
            <View style={{padding: 16, marginTop: 16}}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{t('home.tours')}</Text>
                <Pressable
                  onPress={handleSeeAllPress}
                  style={styles.showAllButton}>
                  <Text style={styles.showAllText}>{t('home.seeAll')}</Text>
                  <Entypo
                    name="chevron-right"
                    size={18}
                    color={appColors.mainColor}
                  />
                </Pressable>
              </View>
              <FlatList
                data={item.data}
                renderItem={renderTourItem}
                keyExtractor={keyExtractor}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={6}
                scrollEnabled={false} // This FlatList is now properly nested
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {t('home.noToursFound')}
                    </Text>
                  </View>
                }
              />
            </View>
          );

        default:
          return null;
      }
    },
    [t, handleSeeAllPress, renderTourItem, keyExtractor],
  );

  return (
    <View style={[styles.viewBox]}>
      <View style={styles.stickyHeader}>
        <SearchBar weatherData={weatherData} />
      </View>

      <FlatList
        data={sections()}
        renderItem={renderSection}
        keyExtractor={item => item.type}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        // onScroll={handleScroll}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBox: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  container: {
    marginHorizontal: 16,
  },
  headingTxt: {
    fontSize: 28,
    fontFamily: 'Gilroy-Bold',
    marginVertical: 15,
    marginHorizontal: 16,
    color: appColors.navyBlack,
  },
  headerRightPressable: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: appColors.pureWhite,
  },
  stickyHeader: {
    paddingHorizontal: 16,
    backgroundColor: appColors.pureWhite,
    borderBottomColor: appColors.grey2,
    borderBottomWidth: 0.5,
  },
  scrollContent: {
    paddingTop: 5,
  },
  gridContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  showAllText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#FFC107',
  },
});
