import React from 'react';
import {Dimensions, Pressable, PressableProps, StyleSheet} from 'react-native';
import { appColors } from '../shared/constants';
import { GilroySemiboldText } from './StyledText';
import { View } from './Themed';

const {width} = Dimensions.get('screen');

export default function BottomButton(props: PressableProps & {text: string}) {
  return (
      <Pressable
        style={[
          {
            width: width - 32,
            marginBottom: 5,
            // position: 'absolute',
            // zIndex: 4,
            // bottom: 36,
          },
          props.style,
        ]}>
        <View style={styles.updateButton}>
          <GilroySemiboldText style={styles.updateButtonText}>
            {props.text}
          </GilroySemiboldText>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  updateButton: {
    width: width - 32,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.secondMainColor,
  },
  updateButtonText: {
    color: appColors.pureWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
