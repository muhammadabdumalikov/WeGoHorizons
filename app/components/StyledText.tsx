import {Text, TextInput, TextInputProps} from 'react-native';
import { TextProps } from './Themed';

export function GilroyMediumText(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'Gilroy-Medium'}]} />;
}

export function GilroySemiboldText(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'Gilroy-Semibold'}]} />;
}

export function GilroyBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'Gilroy-Bold'}]} />;
}

export function GilroyRegularText(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'Gilroy-Regular'}]} />;
}

export function GilroySemiboldTextInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'Gilroy-Semibold'}]}
    />
  );
}
