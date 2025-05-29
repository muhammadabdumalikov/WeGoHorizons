import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {appColors} from '../shared/constants';
import {Tours} from '../components/Tour';
import {GroupListings} from '../components/GroupListings';
import {useQuery} from '@tanstack/react-query';
import {fetchOrganizers, fetchTours} from '../api/cities';
import {SearchBar} from '../components/SearchBar';
import {Stories} from '../components/Stories';
import Geolocation from '@react-native-community/geolocation';

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

  return (
    <SafeAreaView style={styles.viewBox}>
      <SearchBar weatherData={weatherData} />
      {/* <Pressable style={styles.headerRightPressable}>
          <Ionicons
            name="notifications"
            size={28}
            color={appColors.mainColor}
          />
        </Pressable> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        // bounces={false}
        scrollEventThrottle={16}>
        {/* <Text style={styles.headingTxt}>Explore The Beautiful World!</Text> */}

        <Stories
          stories={mockStories}
          onStoryPress={storyId => {
            Alert.alert('Story Pressed', `Opening story ${storyId}`);
          }}
        />

        <Tours
          tourData={tours}
        />

        <GroupListings listings={organizers} />

        <Tours
          tourData={tours}
        />
      </ScrollView>
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
    // shadowColor: appColors.mainColor,
    // shadowOffset: {width: 2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
});
