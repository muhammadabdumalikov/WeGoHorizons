import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import {GilroyBoldText, GilroyMediumText} from '../components/StyledText';
import {appColors} from '../shared/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Switch from '../components/Switch';

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
  icon,
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

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/profile-background.png')}
        style={styles.headerBackground}
        resizeMode="cover">
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.avatar}
            />
            <GilroyBoldText style={styles.name}>Ross Adkins</GilroyBoldText>
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
          <GilroyBoldText style={styles.vipTitle}>VIP Member</GilroyBoldText>
          <GilroyMediumText style={styles.vipPoints}>
            4685 points
          </GilroyMediumText>
        </View>
        <Icon name="crown" size={24} color="#FFD700" />
      </View>

      <View style={styles.section}>
        <GilroyBoldText style={styles.sectionTitle}>Account</GilroyBoldText>
        <SettingItem title="Personal informations" onPress={() => {}} />
        <SettingItem title="Change Password" onPress={() => {}} />
        <SettingItem title="Social Connect" onPress={() => {}} />
        <SettingItem title="Switch to localguide" onPress={() => {}} />
      </View>

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
        <GilroyBoldText style={styles.sectionTitle}>Other</GilroyBoldText>
        <SettingItem
          title="Language"
          rightContent={
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.flag}
            />
          }
          onPress={() => {}}
        />
        <SettingItem
          title="Currency"
          rightContent={
            <GilroyMediumText style={styles.currency}>
              USD - US Dollar
            </GilroyMediumText>
          }
          onPress={() => {}}
        />
      </View>

      <Pressable style={styles.logoutButton}>
        <GilroyMediumText style={styles.logoutText}>Log out</GilroyMediumText>
      </Pressable>
    </ScrollView>
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
});
