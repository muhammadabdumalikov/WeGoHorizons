import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {GilroyBoldText, GilroyMediumText} from '../components/StyledText';
import {appColors} from '../shared/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Switch from '../components/Switch';
import LanguageSelector from '../components/LanguageSelector';
import {useLanguage} from '../shared/contexts/LanguageContext';
import {useLocalization} from '../shared/hooks/useLocalization';
import {AvatarSvg} from '../../assets/images/avatar/avatar';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { BASE_URL } from '../api/cities';

const StatBox = ({count, label}: {count: string; label: string}) => (
  <View style={styles.statBox}>
    <GilroyBoldText style={styles.statCount}>{count}</GilroyBoldText>
    <GilroyMediumText style={styles.statLabel}>{label}</GilroyMediumText>
  </View>
);

const ActionIcon = ({
  color,
  icon,
  stars,
}: {
  color: string;
  icon: string;
  stars: number;
}) => (
  <View style={[styles.actionIcon, {backgroundColor: color}]}>
    <Icon name={icon} size={24} color="white" />
    <View style={styles.starsContainer}>
      {[...Array(3)].map((_, index) => (
        <Icon
          key={index}
          name="star"
          size={8}
          color="white"
          style={[styles.star, {opacity: index < stars ? 1 : 0.5}]}
        />
      ))}
    </View>
  </View>
);

const SettingItem = ({
  icon: _icon,
  title,
  rightContent,
  onPress,
}: {
  icon?: string;
  title: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
}) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <GilroyMediumText style={styles.settingTitle}>{title}</GilroyMediumText>
    <View style={styles.settingRight}>
      {rightContent}
      {onPress && <Icon name="chevron-right" size={24} color="#9E9E9E" />}
    </View>
  </Pressable>
);

export function ProfileScreen() {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [isLanguageSelectorVisible, setIsLanguageSelectorVisible] =
    useState(false);
  const {currentLanguage} = useLanguage();
  const {t} = useLocalization();
  // Placeholder for authentication state
  const [isSignedIn, setIsSignedIn] = useState(false); // Set to true to simulate signed-in

  // Static mapping of language codes to flag images
  const languageFlags: {[key: string]: any} = {
    en: require('../../assets/images/flags/uk.png'),
    es: require('../../assets/images/flags/es.png'),
    fr: require('../../assets/images/flags/fr.png'),
    ru: require('../../assets/images/flags/ru.png'),
    uz: require('../../assets/images/flags/uz.png'),
    kk: require('../../assets/images/flags/kz.png'),
    ky: require('../../assets/images/flags/ky.png'),
  };

  // Get the flag image based on the current language
  const getLanguageFlag = () => {
    return languageFlags[currentLanguage] || languageFlags.en;
  };

  // Google Sign-In configuration (move webClientId to your real value)
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '452906145986-h0celej6mnfcf5c7od1tnhbq1g8vme3o.apps.googleusercontent.com', // TODO: Replace with your real client ID
      iosClientId:
        '452906145986-e2jloo8tqvrsl8oqulm2ul1kf8nk1340.apps.googleusercontent.com', // TODO: Replace with your real iOS client ID
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;
      // Send to your backend
      const response = await fetch(
        `${BASE_URL}/traveler/google-auth`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id_token: idToken,
            token_type: 'id_token',
          }),
        },
      );
      const responseData = await response.json();
      console.log('responseData', responseData);
      if (responseData?.access_token) {
        setIsSignedIn(true);
      } else {
        // handle backend error
        console.error('Backend auth failed');
      }
    } catch (error) {
      if (typeof error === 'object' && error && 'code' in error) {
        // @ts-ignore
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isSignedIn ? (
          <View style={styles.profileHeaderBox}>
            {/* <GilroyBoldText style={styles.profileTitle}>Profile</GilroyBoldText> */}
            <View style={styles.avatar}>
              <AvatarSvg />
            </View>
            {/* <GilroyMediumText style={styles.profileDescription}>
              Access your bookings from any device{'
'}
              {'\n'}
              Sign up, sync your existing bookings, add activities to your
              wishlist, and checkout quicker thanks to stored information.
            </GilroyMediumText> */}
            <Pressable style={styles.loginButton} onPress={signIn}>
              <GilroyBoldText style={styles.loginButtonText}>
                Log in or sign up
              </GilroyBoldText>
            </Pressable>
          </View>
        ) : (
          <>
            <ImageBackground
              source={require('../../assets/images/profile-background.png')}
              style={styles.headerBackground}
              resizeMode="cover">
              <View style={styles.header}>
                <View style={styles.profileInfo}>
                  <View style={styles.avatar}>
                    <AvatarSvg />
                  </View>
                  <GilroyBoldText style={styles.name}>
                    Ross Adkins
                  </GilroyBoldText>
                  <Pressable>
                    <GilroyMediumText style={styles.showProfile}>
                      Show profiles
                    </GilroyMediumText>
                  </Pressable>
                </View>
                <View style={styles.stats}>
                  <StatBox count="2484" label="Photo" />
                  <StatBox count="2484" label="Photo" />
                  <StatBox count="2484" label="Photo" />
                </View>
                <View style={styles.actions}>
                  <ActionIcon color="#FF9B9B" icon="camera" stars={3} />
                  <ActionIcon color="#FFB571" icon="map-marker" stars={2} />
                  <ActionIcon color="#BC71FF" icon="message" stars={2} />
                  <ActionIcon color="#71A5FF" icon="gift" stars={1} />
                </View>
              </View>
            </ImageBackground>
            <View style={styles.vipCard}>
              <View>
                <GilroyBoldText style={styles.vipTitle}>
                  VIP Member
                </GilroyBoldText>
                <GilroyMediumText style={styles.vipPoints}>
                  4685 points
                </GilroyMediumText>
              </View>
              <Icon name="crown" size={24} color="#FFD700" />
            </View>
            <View style={styles.section}>
              <GilroyBoldText style={styles.sectionTitle}>
                Account
              </GilroyBoldText>
              <SettingItem title="Personal informations" onPress={() => {}} />
              <SettingItem title="Change Password" onPress={() => {}} />
              <SettingItem title="Social Connect" onPress={() => {}} />
              <SettingItem title="Switch to localguide" onPress={() => {}} />
            </View>
          </>
        )}

        <View style={styles.section}>
          <GilroyBoldText style={styles.sectionTitle}>
            Notifications
          </GilroyBoldText>
          <SettingItem
            title="Push notifications"
            rightContent={
              <Switch
                activeColor={appColors.mainColor}
                inActiveColor={appColors.grey1}
                handleOnChange={() => setPushEnabled(!pushEnabled)}
              />
            }
          />
          <SettingItem
            title="Email notifications"
            rightContent={
              <Switch
                activeColor={appColors.mainColor}
                inActiveColor={appColors.grey1}
                handleOnChange={() => setEmailEnabled(!emailEnabled)}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <GilroyBoldText style={styles.sectionTitle}>Support</GilroyBoldText>
          <SettingItem title="Contact support" onPress={() => {}} />
          <SettingItem title="Privacy policy" onPress={() => {}} />
          <SettingItem title="Terms of services" onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <GilroyBoldText style={styles.sectionTitle}>
            {t('profile.other')}
          </GilroyBoldText>
          <SettingItem
            title={t('profile.language')}
            rightContent={
              <Image source={getLanguageFlag()} style={styles.flag} />
            }
            onPress={() => setIsLanguageSelectorVisible(true)}
          />
          <SettingItem
            title={t('profile.currency')}
            rightContent={
              <GilroyMediumText style={styles.currency}>
                USD - US Dollar
              </GilroyMediumText>
            }
            onPress={() => {}}
          />
        </View>

        {isSignedIn && (
          <Pressable
            style={styles.logoutButton}
            onPress={() => setIsSignedIn(false)}>
            <GilroyMediumText style={styles.logoutText}>
              {t('profile.logout')}
            </GilroyMediumText>
          </Pressable>
        )}

        <LanguageSelector
          visible={isLanguageSelectorVisible}
          onClose={() => setIsLanguageSelectorVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  headerBackground: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    color: appColors.navyBlack,
    marginBottom: 4,
  },
  showProfile: {
    fontSize: 14,
    color: appColors.mainColor,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 20,
    color: appColors.navyBlack,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    marginHorizontal: 1,
  },
  vipCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  vipTitle: {
    fontSize: 18,
    color: appColors.pureWhite,
    marginBottom: 4,
  },
  vipPoints: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: appColors.mainBlack,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingTitle: {
    fontSize: 16,
    color: '#757575',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  currency: {
    fontSize: 16,
    color: '#757575',
    marginRight: 8,
  },
  logoutButton: {
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF5252',
  },
  profileHeaderBox: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 32,
    color: appColors.navyBlack,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileDescription: {
    fontSize: 16,
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: appColors.mainColor,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
