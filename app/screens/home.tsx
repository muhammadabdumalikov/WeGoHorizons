import React, {useEffect, useState, useRef} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  Animated,
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColors} from '../shared/constants';
import {Tours} from '../components/Tour';
import {GroupListings} from '../components/GroupListings';
import {useQuery} from '@tanstack/react-query';
import {fetchOrganizers, fetchTours} from '../api/cities';
import {SearchBar} from '../components/SearchBar';
import {Stories} from '../components/Stories';
import Geolocation from '@react-native-community/geolocation';
import {TourCardsSmall} from './all-tours';
import { CustomNavigationProp } from '../types/stack';
import { useNavigation } from '@react-navigation/native';

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
  const [weatherData, setWeatherData] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 80; // Approximate height of SearchBar
  const insets = useSafeAreaInsets();
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  const {data: tours} = useQuery({
    queryKey: ['destinations'],
    queryFn: () => fetchTours(),
  });

  const {data: organizers} = useQuery({
    queryKey: ['organizers'],
    queryFn: fetchOrganizers,
  });

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
        })
        .catch(err => {
          console.error(err);
        });
    };

    const getUserLocation = async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          getWeatherData(latitude, longitude);
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
      );
    };

    getUserLocation();
  }, []);
  
  const navigation = useNavigation<CustomNavigationProp>();

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

  const renderContent = () => {
    return (
      <>
        <Stories
          stories={mockStories}
          onStoryPress={storyId => {
            Alert.alert('Story Pressed', `Opening story ${storyId}`);
          }}
        />

        <Tours tourData={tours} />

        <GroupListings listings={organizers} />

        <View style={{padding: 16, marginTop: 16}}>
          <FlatList
            data={tours}
            renderItem={({item}) => TourCardsSmall({item, navigation})}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tours found</Text>
              </View>
            }
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.viewBox}>
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            transform: [{translateY: headerTranslateY}],
            top: STATUS_BAR_HEIGHT,
          },
        ]}>
        <SearchBar weatherData={weatherData} />
      </Animated.View>

      <FlatList
        data={[1]} // Single item since we're using renderItem to render all content
        renderItem={() => renderContent()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={[styles.scrollContent]}
        keyExtractor={() => 'main-content'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewBox: {
    flex: 1,
    paddingHorizontal: 16,
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
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    backgroundColor: appColors.pureWhite,
    borderBottomColor: appColors.grey2,
    borderBottomWidth: 0.5,
  },
  scrollContent: {
    paddingTop: 60,
  },
  gridContainer: {
    padding: 16,
    backgroundColor: 'red',
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
});
