import {ViewStyle, Pressable, StyleSheet, View, Text} from 'react-native';
import { appColors } from '../shared/constants';
import { GilroySemiboldText } from './StyledText';

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
      <GilroySemiboldText style={styles.headerName}>{headerName}</GilroySemiboldText>
      {link?.length ? (
        // <Link href={link as `${string}:${string}`} asChild>
        <Pressable onPress={onPress}>
          <GilroySemiboldText style={styles.seeAll}>{btnName}</GilroySemiboldText>
        </Pressable>
      ) : (
        <Pressable onPress={onPress}>
          <GilroySemiboldText style={styles.seeAll}>{btnName}</GilroySemiboldText>
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
    color: appColors.navyBlack,
  },
  seeAll: {
    fontSize: 15,
    color: appColors.navyBlack,
  },
});
