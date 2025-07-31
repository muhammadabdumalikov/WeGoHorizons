import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {appColors} from '../shared/constants';
import {HomeScreen} from '../screens/home';
import {HomeActiveSvg} from '../../assets/images/home-active';
import {HomeInactiveSvg} from '../../assets/images/home-inactive';
import {WorldActiveSvg} from '../../assets/images/world-active';
import {WorldInactiveSvg} from '../../assets/images/world-inactive';
import {ProfileActiveSvg} from '../../assets/images/profile-active';
import {ProfileInactiveSvg} from '../../assets/images/profile-inactive';
import {ProfileScreen} from '../screens/profile-screen';
import {CalendarEventsScreen} from '../screens/calendar-events-screen';

const Tab = createBottomTabNavigator();

// const TabbarBackground = () => (
//   <BlurView blurAmount={15} style={styles.blurView} blurType="light" />
// );

const HomeIcon = ({focused}: {color: string; focused: boolean}) => {
  switch (focused) {
    case true:
      return (
        // <View style={styles.homeIconOnFocus}>
        <HomeActiveSvg width={34} height={34} color={appColors.mainColor} />
        // </View>
      );
    case false:
      return (
        // <View style={styles.homeIcon}>
        <HomeInactiveSvg width={32} height={32} color={appColors.grey6} />
        // </View>
      );
  }
};

const WorldIcon = ({focused}: {color: string; focused: boolean}) => {
  switch (focused) {
    case true:
      return (
        <WorldActiveSvg width={32} height={32} color={appColors.mainColor} />
      );
    case false:
      return (
        <WorldInactiveSvg width={30} height={30} color={appColors.grey6} />
      );
  }
};

const ProfileIcon = ({focused}: {color: string; focused: boolean}) => {
  switch (focused) {
    case true:
      return (
        // <View style={styles.profileIconOnFocus}>
        <ProfileActiveSvg width={32} height={32} color={appColors.mainColor} />
        // </View>
      );
    case false:
      return (
        // <View style={styles.profileIcon}>
        <ProfileInactiveSvg width={30} height={30} color={appColors.grey6} />
        // </View>
      );
  }
};

export function ClientTabNavigator() {
  // const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        // tabBarBackground: TabbarBackground,
        tabBarStyle: {
          height: 70  ,
          backgroundColor: appColors.pureWhite,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 80,
        },
        tabBarIconStyle: {
          height: 45,
          width: 45,
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Discover',
          tabBarIcon: HomeIcon,
          headerTitleStyle: {
            color: appColors.mainColor,
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={CalendarEventsScreen}
        options={{
          title: 'Profile',
          tabBarIcon: WorldIcon,
          headerStyle: {height: 100},
          headerTitleStyle: {
            color: appColors.mainColor,
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={ProfileScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ProfileIcon,
          headerStyle: {height: 100},
          headerTitleStyle: {
            color: appColors.mainColor,
          },
        }}
      />
    </Tab.Navigator>
  );
}
