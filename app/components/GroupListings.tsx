import React from 'react';
import {FlatList, StyleSheet, Text, View, ListRenderItem} from 'react-native';
import {GroupType} from '../types/group';
import {appColors} from '../shared/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CachedImage} from './CachedImage';

interface Props {
  listings: GroupType[];
}

function Component({listings}: Props) {
  const renderItem: ListRenderItem<GroupType> = ({item}) => {
    return (
      <View style={styles.item}>
        <CachedImage
          uri={item.files?.find(f => f.type === 'logo')?.url}
          style={styles.image}
        />
        <View style={styles.infoBox}>
          <Text style={styles.itemTxt}>{item.title}</Text>
          <View style={styles.reviewsRow}>
            <FontAwesome
              name="star"
              size={18}
              color={appColors.secondMainColor}
            />
            <Text style={styles.itemRating}>{item.rating || 0}</Text>
            <Text style={styles.itemReview}>({item.reviews || 323})</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Top Travel Groups</Text>
      <FlatList
        data={listings}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      />
    </View>
  );
}

export const GroupListings = React.memo(Component);

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: appColors.navyBlack,
    marginBlock: 10,
    marginLeft: 16,
    fontFamily: 'Gilroy-Semibold',
  },
  item: {
    width: 120,
    height: 140,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 25,
    borderWidth: 0.3,
    borderColor: appColors.grey5,
    marginRight: 20,
    alignItems: 'center',
  },
  infoBox: {justifyContent: 'center', alignItems: 'center'},
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 0.3,
    borderColor: appColors.grey6,
  },
  itemTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.navyBlack,
    marginBottom: 8,
    fontFamily: 'Gilroy-Semibold',
  },
  reviewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRating: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.secondMainColor,
    marginLeft: 5,
    fontFamily: 'Gilroy-Semibold',
  },
  itemReview: {
    fontSize: 14,
    fontFamily: 'Gilroy-Semibold',
    color: '#999',
  },
});
