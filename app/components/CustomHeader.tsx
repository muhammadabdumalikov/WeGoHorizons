import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {appColors} from '../shared/constants';
import {ViewProps} from './Themed';

const {width} = Dimensions.get('screen');

export const GoBackButtonAbsolute = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[
        styles.goBackButton,
        {
          position: 'absolute',
          zIndex: 3,
          top: 48,
          left: 5,
          padding: 10,
        },
      ]}
      onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </Pressable>
  );
};

export const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </Pressable>
  );
};

export const CustomHeader = (props: ViewProps & {title: string}) => {
  return (
    <View style={{backgroundColor: appColors.backgroundBlur}}>
      <View style={[styles.headerContainer, props?.style]}>
        <GoBackButton />
        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width - 32,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: appColors.pureWhite,
    // borderBottomWidth: 1,
    // borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
