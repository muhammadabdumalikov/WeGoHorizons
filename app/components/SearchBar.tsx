import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {appColors} from '../shared/constants';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { RootStackParamList } from '../types/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
  };
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function Component({weatherData}: {weatherData: WeatherApiResponse | null}) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.searchHeader}>
      <View>
        <Text style={styles.locationTxt}>{weatherData?.location?.name}, {weatherData?.location?.region}</Text>
        <View style={styles.weatherBox}>
          <Feather name="cloud" size={24} color={appColors.grey6} />
          <Text style={styles.degreeTxt}>{weatherData?.current?.temp_c?.toFixed()}{'\u00B0'}C</Text>
        </View>
      </View>
      <Pressable
        style={styles.searchIconWrapper}
        onPress={() => navigation.navigate('search-screen')}>
        <Feather size={26} name="search" color={appColors.navyBlack} />
      </Pressable>
    </View>
  );
}

function ComponentInput() {
  const textInputRef = useRef<TextInput>(null);
  const borderWidth = useSharedValue(0.3);
  const scale = useSharedValue(1);
  const borderColorProgress = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 300);
    }, []),
  );

  // useEffect(() => {
  //   if (textInputRef.current) {
  //     setTimeout(() => {
  //       textInputRef.current?.focus();
  //     }, 300);
  //   }
  // }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderColorProgress.value,
      [0, 1],
      [appColors.mainColor, appColors.mainColor],
    );

    return {
      transform: [{scale: scale.value}],
      borderWidth: borderWidth.value,
      borderColor: borderColor,
    };
  });

  const handleFocus = () => {
    borderWidth.value = withTiming(2, {duration: 200});
    scale.value = withSpring(1.02);
  };

  const handleBlur = () => {
    borderWidth.value = withTiming(0.5, {duration: 200});
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.searchBarWrapper, animatedStyles]}>
      <TextInput
        style={styles.searchTxt}
        placeholder="Find your dreams"
        ref={textInputRef}
        autoFocus={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <View style={styles.searchIconWrapper}>
        <Feather size={24} name="search" color={appColors.pureWhite} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  locationTxt: {
    fontSize: 20,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
    marginBottom: 4,
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  degreeTxt: {
    marginLeft: 5,
    fontSize: 16,
    color: appColors.grey6,
    fontFamily: 'Gilroy-Semibold',
  },
  searchBarWrapper: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: appColors.grey5,
    backgroundColor: appColors.pureWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 5,
  },
  searchTxt: {
    color: appColors.grey6,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.3,
    flex: 1,
  },
  searchIconWrapper: {
    // backgroundColor: appColors.mainColor,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export const SearchBar = React.memo(Component);
export const SearchBarInput = React.memo(ComponentInput);
