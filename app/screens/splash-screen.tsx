import React, {useEffect} from 'react';
import {View, StyleSheet, Image, ImageBackground, Dimensions} from 'react-native';
import {appColors} from '../shared/constants';
import { GilroyBoldText } from '../components/StyledText';

const width = Dimensions.get('window').width;

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
    width: width * 0.8,
    height: width * 0.8,
  },
  appName: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    fontSize: 26,
    color: appColors.pureWhite,
    marginTop: 16,
  },
});
