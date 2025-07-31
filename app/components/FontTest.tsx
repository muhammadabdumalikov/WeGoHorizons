import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const FontTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.gilroyRegular}>Gilroy Regular Font Test</Text>
      <Text style={styles.gilroyMedium}>Gilroy Medium Font Test</Text>
      <Text style={styles.gilroySemibold}>Gilroy Semibold Font Test</Text>
      <Text style={styles.gilroyBold}>Gilroy Bold Font Test</Text>
      <Text style={styles.quicksandRegular}>Quicksand Regular Font Test</Text>
      <Text style={styles.quicksandMedium}>Quicksand Medium Font Test</Text>
      <Text style={styles.quicksandBold}>Quicksand Bold Font Test</Text>
      <Text style={styles.systemFont}>System Font (Fallback)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  gilroyRegular: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  gilroyMedium: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  gilroySemibold: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  gilroyBold: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  quicksandBold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  systemFont: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
});

export default FontTest;
