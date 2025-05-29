import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Switch from '../components/Switch';
import {BottomSheetRefType} from '../shared/helpers';
import {appColors} from '../shared/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GilroyBoldText,
  GilroyMediumText,
  GilroySemiboldText,
} from '../components/StyledText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {removeData} from '../shared/store';
import {IS_ADMIN_KEY} from '../shared/storage';
import {useAuth} from '../navigation/auth-context';

const profileData = [
  {
    icon: (
      <Ionicons
        name="person-circle-outline"
        size={34}
        color={appColors.navyBlack}
      />
    ),
    label: 'Редактировать профиль',
    screen: 'edit-profile-screen',
  },
  {
    icon: (
      <Ionicons name="language-outline" size={26} color={appColors.navyBlack} />
    ),
    label: 'Язык',
    value: 'Русский (RU)',
    screen: 'screens/adresses-screen',
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="hiking"
        size={24}
        color={appColors.navyBlack}
      />
    ),
    label: `Travelchi bo'lish`,
    value: 'Русский (RU)',
    screen: 'screens/adresses-screen',
  },
  {
    icon: (
      <Ionicons name="moon-outline" size={26} color={appColors.navyBlack} />
    ),
    label: 'Темный режим',
    switch: true,
  },
  {
    icon: <AntDesign name="logout" size={24} color={appColors.redVelvet} />,
    label: 'Выйти',
    exit: true,
  },
];

export function ProfileScreen({navigation}) {
  const [darkMode, setDarkMode] = React.useState(false);
  const refRBSheet = useRef<BottomSheetRefType>(null);

  const {toggleAdmin} = useAuth();

  const handleOnProfileMenuClick = (screen: string) => {
    navigation.navigate(screen);
  };

  const switchAccount = () => {
    toggleAdmin();
  };

  const openBottomSheet = () => {
    refRBSheet.current?.open();
  };

  const handleSwitchChange = () => setDarkMode(prev => !prev);

  const renderItem = ({item}: {item: any}) => {
    if (item?.switch) {
      return (
        <View style={styles.optionRow}>
          {item.icon}
          <GilroyMediumText style={styles.optionText}>
            {item.label}
          </GilroyMediumText>
          <GilroySemiboldText style={styles.optionValue}>
            {item.value}
          </GilroySemiboldText>

          <Switch
            activeColor={appColors.mainColor}
            inActiveColor={appColors.grey2}
            handleOnChange={handleSwitchChange}
          />
        </View>
      );
    } else if (item?.screen) {
      return (
        <Pressable
          style={styles.optionRow}
          onPress={() => handleOnProfileMenuClick(item.screen)}>
          {item.icon}
          <GilroyMediumText style={styles.optionText}>
            {item.label}
          </GilroyMediumText>
          <FontAwesome name="angle-right" size={28} color="black" />
        </Pressable>
      );
    } else {
      return (
        <Pressable style={styles.exitOptionRow} onPress={openBottomSheet}>
          {item.icon}
          <GilroySemiboldText style={styles.exitOptionText}>
            {item.label}
          </GilroySemiboldText>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GilroyBoldText style={styles.headerText}>Кабинет</GilroyBoldText>
        <Pressable style={styles.headerRight}>
          <Ionicons name="ellipsis-horizontal-circle" size={28} color="black" />
        </Pressable>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.profileContainer}>
            <View>
              <Image
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.profileImage}
              />
              {/* <Link href="screens/welcome-screen" asChild> */}
              <Pressable
                style={styles.editIconBox}
                onPress={() => navigation.navigate('welcome-screen')}>
                <View style={styles.editIcon}>
                  <FontAwesome name="pencil" size={18} color="white" />
                </View>
              </Pressable>
            </View>
            <GilroyBoldText style={styles.profileName}>
              Аббос Хазратов
            </GilroyBoldText>
            <GilroySemiboldText style={styles.profilePhone}>
              +998 94 678 97 58
            </GilroySemiboldText>
          </View>
        }
        data={profileData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.label}
        contentContainerStyle={styles.listContainer}
      />

      <RBSheet
        ref={refRBSheet}
        height={280}
        openDuration={300}
        draggable
        dragOnContent
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            gap: 15,
            paddingBottom: 48,
            paddingHorizontal: 16,
          },
        }}>
        <GilroyBoldText style={styles.title}>Выйти</GilroyBoldText>
        <GilroyBoldText style={styles.titleDescription}>
          Вы уверены, что хотите выйти из системы?
        </GilroyBoldText>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.resetButton}>
            <Text style={styles.resetText}>Отменить</Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={async () => {
              await removeData(IS_ADMIN_KEY);
              refRBSheet.current?.close();
              // setTimeout(() => {
              //   navigation.replace('screens/enter-phone-login.screen');
              // }, 1000);
            }}>
            <Pressable style={styles.applyButton} onPress={switchAccount}>
              <Text style={styles.applyText}>Да, выйти</Text>
            </Pressable>
          </Pressable>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: 50,
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  headerRight: {
    padding: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120,
    overflow: 'hidden',
  },
  editIconBox: {
    padding: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editIcon: {
    height: 26,
    width: 26,
    backgroundColor: appColors.secondMainColor,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    letterSpacing: 0.2,
  },
  profilePhone: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    fontSize: 18,
  },
  optionValue: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: '600',
    color: appColors.navyBlack,
  },
  exitOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  exitOptionText: {
    flex: 1,
    color: appColors.redVelvet,
    marginLeft: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: appColors.redVelvet,
    alignSelf: 'center',
    letterSpacing: 0.5,
  },
  titleDescription: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.5,
    marginBottom: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  resetButton: {
    flex: 1,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.grey5,
    borderRadius: 30,
    marginRight: 10,
  },
  resetText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: appColors.redVelvet,
  },
  applyText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
