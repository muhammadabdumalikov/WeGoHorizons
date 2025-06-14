import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {appColors} from '../shared/constants';
import {GilroyBoldText} from '../components/StyledText';

export function SplashScreen({navigation}: {navigation: any}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('onboarding-screen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <GilroyBoldText style={styles.appName}>trippo</GilroyBoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 32,
    color: appColors.pureWhite,
    marginTop: 16,
  },
});
