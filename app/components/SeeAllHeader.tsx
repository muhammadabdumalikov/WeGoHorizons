import {ViewStyle, Pressable, StyleSheet, View, Text} from 'react-native';
import { appColors } from '../shared/constants';
import { GilroyBoldText, GilroySemiboldText } from './StyledText';

export const SeeAllHeader = ({
  headerName,
  link,
  style,
  onPress,
  btnName,
}: {
  headerName: string;
  link?: string;
  style?: ViewStyle;
  onPress: () => void;
  btnName: string;
}) => {
  return (
    <View style={[styles.box, style]}>
      <GilroyBoldText style={styles.headerName}>{headerName}</GilroyBoldText>
      {link?.length ? (
        // <Link href={link as `${string}:${string}`} asChild>
        <Pressable onPress={onPress}>
          <Text style={styles.seeAll}>{btnName}</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onPress}>
          <Text style={styles.seeAll}>{btnName}</Text>
        </Pressable>
      )}
    </View>
  );
};

export const SectionHeader = ({
  headerName,
  style,
}: {
  headerName: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.box, style]}>
      <GilroySemiboldText style={styles.headerName}>
        {headerName}
      </GilroySemiboldText>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    backgroundColor: appColors.pureWhite,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  headerName: {
    fontSize: 18,
    color: appColors.mainColor,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: appColors.mainColor,
  },
});
