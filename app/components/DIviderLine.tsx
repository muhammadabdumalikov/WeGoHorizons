import React from 'react';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../shared/constants';

export function Component() {
  return <View style={style.container} />;
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: appColors.grey5,
    marginVertical: 16,
  },
});

export const Divider = React.memo(Component);
