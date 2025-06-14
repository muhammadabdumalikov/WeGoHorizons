import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  Pressable,
  Image,
} from 'react-native';
import {GroupType} from '../types/group';
import {appColors} from '../shared/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CachedImage} from './CachedImage';

interface Props {
  listings: (GroupType & {tags?: string[]; price?: number})[];
  onShowAll?: () => void;
}

type GuideListItemProps = {
  item: GroupType & {tags?: string[]; price?: number};
  fallbackTags: string[];
  fallbackPrice: number;
};

function GuideListItem({
  item,
  fallbackTags,
  fallbackPrice,
}: GuideListItemProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageUrl = item.files?.find((f: any) => f.type === 'logo')?.url;
  return (
    <View style={styles.itemRow}>
      <View style={styles.imageWrapper}>
        {!imageLoaded && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>trippo</Text>
          </View>
        )}
        {imageUrl && (
          <CachedImage
            uri={imageUrl}
            style={[styles.image, !imageLoaded && {display: 'none'}]}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        )}
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.name} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.tags} numberOfLines={1}>
          {(item.tags || fallbackTags).join(' • ')}
        </Text>
        <Text style={styles.priceRow}>
          <Text style={styles.price}>${item.price || fallbackPrice}</Text>
          <Text style={styles.perHour}> /hour</Text>
        </Text>
      </View>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>
          {item.rating?.toFixed(1) || '4.5'}
        </Text>
        <FontAwesome
          name="star"
          size={12}
          color={appColors.pureWhite}
          style={{marginLeft: 2}}
        />
      </View>
    </View>
  );
}

function Component({listings, onShowAll}: Props) {
  // Example fallback tags and price for demo
  const fallbackTags = ['Sport', 'Music', 'Nightlife'];
  const fallbackPrice = 10;

  const renderItem: ListRenderItem<
    GroupType & {tags?: string[]; price?: number}
  > = ({item}) => {
    return (
      <GuideListItem
        item={item}
        fallbackTags={fallbackTags}
        fallbackPrice={fallbackPrice}
      />
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Localguides</Text>
        <Pressable onPress={onShowAll} style={styles.showAllBtn} hitSlop={8}>
          <Text style={styles.showAllText}>See all</Text>
          <FontAwesome
            name="angle-right"
            size={18}
            color={appColors.mainColor}
          />
        </Pressable>
      </View>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
    </View>
  );
}

export const Organizers = React.memo(Component);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 0,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
  },
  showAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  showAllText: {
    color: appColors.mainColor,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    marginRight: 2,
  },
  container: {
    paddingHorizontal: 0,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 8,
    padding: 8,
  },
  imageWrapper: {
    width: 84,
    height: 84,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 1.5,
    textTransform: 'lowercase',
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
    marginBottom: 2,
  },
  tags: {
    fontSize: 14,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    color: appColors.mainColor,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
  },
  perHour: {
    color: appColors.darkGrey,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  ratingBadge: {
    backgroundColor: appColors.green2,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
    minWidth: 40,
    justifyContent: 'center',
    marginBottom: 28,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Gilroy-Bold',
    marginRight: 2,
  },
});
