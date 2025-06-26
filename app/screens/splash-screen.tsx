import React, {useEffect} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {appColors} from '../shared/constants';
import {GilroyBoldText} from '../components/StyledText';

export function SplashScreen({navigation}: {navigation: any}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('onboarding-screen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageBackground
          source={require('../../assets/images/wegohorizons.png')}
          style={styles.logo}
          resizeMode="contain"
        >
          <GilroyBoldText style={styles.appName}>WeGoHorizons</GilroyBoldText>
        </ImageBackground>
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
    marginBottom: 100,
  },
  logo: {
    width: 240,
    height: 240,
  },
  appName: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 32,
    color: appColors.pureWhite,
    marginTop: 16,
  },
});
