import React from 'react';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ClientTabNavigator } from './client-tab-navigator';
import {AdminTabNavigator} from './admin-tab-navigator';
import {TourDetailsScreen} from '../screens/tour-details';
import {RootStackParamList} from '../types/stack';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {appColors} from '../shared/constants';
import { GalleryCarousel } from '../components/GalleryCarousel';
import { SearchScreen } from '../screens/search-screen';
import {AllToursScreen} from '../screens/all-tours';
import {useAuth} from './auth-context';
import {SplashScreen} from '../screens/splash-screen';
import {OnboardingScreen} from '../screens/onboarding-screen';
import {GuideDetailScreen} from '../screens/guide-detail-screen';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// const isAdmin = getData(IS_ADMIN_KEY).then(data => data) || false;

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNavigation() {
  const navigation = useNavigation();

  const headerRight = () => (
    <View style={styles.headerRightBox}>{/* <SearchBar /> */}</View>
  );

  const headerLeft = () => (
    <Pressable style={styles.headerLeftBox} onPress={() => navigation.goBack()}>
      <View style={styles.headerLeftIcon}>
        <FontAwesome6
          name="chevron-left"
          size={20}
          color={appColors.navyBlack}
        />
      </View>
    </Pressable>
  );

  return (
    <Stack.Navigator
      initialRouteName="splash-screen"
      screenOptions={{headerShown: false, animation: 'simple_push'}}>
      <Stack.Screen
        name="splash-screen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="onboarding-screen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="tab-navigator"
        component={ClientTabNavigator}
        options={{title: ''}}
      />
      <Stack.Screen
        name="tour-details-screen"
        component={TourDetailsScreen}
        options={{
          title: '',
          headerShown: false,
          headerTransparent: true,
          headerLeft: headerLeft,
          headerRight: headerRight,
        }}
      />
      <Stack.Screen
        name="gallery-carousel-screen"
        component={GalleryCarousel}
        options={{
          title: '',
          headerLeft: headerLeft,
        }}
      />
      <Stack.Screen
        name="search-screen"
        component={SearchScreen}
        options={{
          title: '',
          headerLeft: headerLeft,
        }}
      />
      <Stack.Screen
        name="all-tours-screen"
        component={AllToursScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="guide-detail-screen"
        component={GuideDetailScreen}
        options={{
          title: '',
          headerShown: false,
          headerTransparent: true,
          headerLeft: headerLeft,
          headerRight: headerRight,
        }}
      />
    </Stack.Navigator>
  );
}

export function RootLayout() {
  const {isAdmin} = useAuth();

  if (isAdmin === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={appColors.navyBlack} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {isAdmin ? <AdminTabNavigator /> : <MainNavigation />}
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  headerLeftBox: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerLeftIcon: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: appColors.pureWhite,
  },
  headerRightBox: {
    flexDirection: 'row',
    gap: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
