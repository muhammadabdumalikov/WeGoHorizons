import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {appColors} from '../shared/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EditOrganizerProfileScreen from '../screens/edit-organizer-profile';
import { ProfileScreen } from '../screens/profile-screen';

const Tab = createBottomTabNavigator();

const TabbarBackground = () => (
  <BlurView blurAmount={15} style={styles.blurView} blurType="light" />
);

const FavoritesIcon = ({focused}: {color: string; focused: boolean}) => {
  switch (focused) {
    case true:
      return <Feather name="heart" size={34} color={appColors.mainColor} />;
    case false:
      return <Feather name="heart" size={28} color={appColors.grey6} />;
  }
};

const ProfileIcon = ({focused}: {color: string; focused: boolean}) => {
  switch (focused) {
    case true:
      return (
        // <View style={styles.profileIconOnFocus}>
        <Ionicons
          name="person-circle-outline"
          size={34}
          color={appColors.mainColor}
        />
        // </View>
      );
    case false:
      return (
        // <View style={styles.profileIcon}>
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={appColors.grey6}
        />
        // </View>
      );
  }
};

export function AdminTabNavigator() {
  // const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        tabBarBackground: TabbarBackground,
        tabBarStyle: {
          height: 80,
          backgroundColor: appColors.bottomBarBlur,
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
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: FavoritesIcon,
          headerStyle: {height: 100},
          headerTitleStyle: {
            color: appColors.mainColor,
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={EditOrganizerProfileScreen}
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

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
  },
  profileIconOnFocus: {
    backgroundColor: appColors.mainColor,
    height: '100%',
    width: '100%',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    backgroundColor: appColors.pureWhite,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconOnFocus: {
    backgroundColor: appColors.mainColor,
    height: '100%',
    width: '100%',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    backgroundColor: appColors.pureWhite,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
