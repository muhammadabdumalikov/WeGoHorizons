import React, {useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Tour} from '../types/tour';
import {appColors} from '../shared/constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addDotsToNumber} from '../shared/helpers';
// import {HeartLike} from './CustomHeartLike';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  tourData: any[];
  title?: string;
};

function Component({tourData, title = 'Tours'}: Props) {
  const navigation = useNavigation<NavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = 290 + 16; // Item width + marginRight

  // Show up to 5 tours
  const visibleListings = tourData?.slice(0, 5) || [];

  const onPressHandler = (item: Tour) => {
    navigation.navigate('tour-details-screen', {tour: item});
  };

  const handleSeeAllPress = () => {
    navigation.navigate('all-tours-screen', {title});
  };

  const renderItem: ListRenderItem<Tour> = ({item}) => {
    return (
      <Pressable onPress={() => onPressHandler(item)}>
        <View style={styles.item}>
          <ImageBackground
            source={{uri: item.files?.find(f => f.type === 'extra')?.url}}
            style={styles.imgBackground}>
            <View style={styles.discountBox}>
              <Text style={styles.discountTxt}>25% OFF</Text>
            </View>

            <View style={styles.organizerLogoBox}>
              <Image
                source={{uri: item.organizer_logo}}
                style={styles.organizerLogo}
              />
            </View>

            <View style={styles.heartBox}>
              <FontAwesome
                name="heart-o"
                size={28}
                color={appColors.pureWhite}
              />
              {/* <HeartLike /> */}
            </View>
          </ImageBackground>

          <View>
            <Text style={styles.tagBox}>Cultural • Coffee</Text>
            <View style={styles.infoBox}>
              <Text style={styles.titleTxt} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.ratingPriceBox}>
                <View style={styles.ratingBox}>
                  <Text style={styles.rateTxt}>{item.rating || 0}</Text>
                  <FontAwesome
                    size={12}
                    name="star"
                    color={appColors.pureWhite}
                  />
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.priceTxt}>
                    {addDotsToNumber(+item.price)}
                  </Text>
                  <Text style={styles.personTxt}>/person</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Pressable onPress={handleSeeAllPress} style={styles.showAllButton}>
          <Text style={styles.showAllText}>See all</Text>
          {/* <FontAwesome name="angle-right" size={16} color={appColors.mainColor} /> */}
        </Pressable>
      </View>

      <Animated.FlatList
        renderItem={renderItem}
        data={visibleListings}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  showAllText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#FFC107',
  },
  container: {paddingHorizontal: 16},
  item: {
    width: 290,
    height: 260,
    marginRight: 16,
  },
  discountBox: {
    width: 60,
    height: 28,
    backgroundColor: appColors.mainColor,
    borderRadius: 30,
    position: 'absolute',
    left: 12,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountTxt: {
    color: appColors.pureWhite,
    fontSize: 10,
    fontFamily: 'Gilroy-Semibold',
  },
  imgBackground: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
    height: 180,
    justifyContent: 'flex-end',
  },
  organizerLogoBox: {
    width: 34,
    height: 34,
    backgroundColor: appColors.pureWhite,
    borderRadius: 30,
    position: 'absolute',
    right: 12,
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  organizerLogo: {
    width: 32,
    height: 32,
    borderRadius: 28,
  },
  heartBox: {
    width: 36,
    height: 36,
    backgroundColor: 'transparency',
    borderRadius: 18,
    position: 'absolute',
    right: 12,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTxt: {
    maxWidth: 210,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 22,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
  },
  ratingPriceBox: {
    width: 80,
    alignItems: 'flex-end',
    gap: 5,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.green2,
    width: 48,
    height: 24,
    borderRadius: 7,
    marginBottom: 2,
  },
  tagBox: {
    marginVertical: 8,
    fontSize: 12,
    fontWeight: '400',
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Medium',
  },
  rateTxt: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 2,
    marginRight: 3,
    color: appColors.pureWhite,
    fontFamily: 'Gilroy-Semibold',
  },
  priceBox: {
    flexDirection: 'row',
  },
  priceTxt: {
    fontFamily: 'Gilroy-Semibold',
    color: appColors.mainColor,
  },
  personTxt: {
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
    fontSize: 12,
  },
});

export const Tours = React.memo(Component);
