/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  SectionList as DefaultSectionList,
  useColorScheme,
} from 'react-native';
import {SafeAreaView as DefaultSafeAreaView} from 'react-native-safe-area-context';
import {colors as Colors} from '../shared/constants';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type SectionListProps = ThemeProps & DefaultSectionList['props'];

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function SafeAreaView(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return (
    <DefaultSafeAreaView style={[{backgroundColor}, style]} {...otherProps} />
  );
}

export function ScrollView(props: ScrollViewProps) {
  const {contentContainerStyle, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return (
    <DefaultScrollView
      contentContainerStyle={[{backgroundColor}, contentContainerStyle]}
      {...otherProps}
    />
  );
}

export function SectionList(props: SectionListProps) {
  const {contentContainerStyle, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return (
    <DefaultSectionList
      contentContainerStyle={[{backgroundColor}, contentContainerStyle]}
      {...otherProps}
    />
  );
}
