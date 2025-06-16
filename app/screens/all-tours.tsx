import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/stack';
import {appColors} from '../shared/constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addDotsToNumber} from '../shared/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterComponent from '../components/FilterComponent';

// Sample tours data - in a real app this would come from an API
import tourData from '../shared/dummy-data/tours.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CachedImageBackground} from '../components/CachedImageBackground';

type Props = NativeStackScreenProps<RootStackParamList, 'all-tours-screen'>;

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Two columns with padding

// Define proper type for RBSheet ref
interface RBSheetRefType {
  open: () => void;
  close: () => void;
}

export const TourCardsSmall = ({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const backgroundImageUrl = item.files?.find(
    (f: any) => f.type === 'extra',
  )?.url;

  return (
    <Pressable
      style={styles.tourCard}
      onPress={() => navigation.navigate('tour-details-screen', {tour: item})}>
      {!imageLoaded && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>trippo</Text>
        </View>
      )}
      {backgroundImageUrl && (
        <CachedImageBackground
          uri={backgroundImageUrl}
          style={styles.imgBackground}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        >
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
            <FontAwesome name="heart-o" size={24} color={appColors.pureWhite} />
          </View>
        </CachedImageBackground>
      )}

      <View>
        <Text style={styles.tagBox}>
          {item.categoryName || 'Cultural Tour'}
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.titleTxt} numberOfLines={2}>
            {item.title.en || item.title}
          </Text>
          <View style={styles.ratingPriceBox}>
            <View style={styles.ratingBox}>
              <Text style={styles.rateTxt}>{item.rating || 0}</Text>
              <FontAwesome size={12} name="star" color={appColors.pureWhite} />
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceTxt}>
                {addDotsToNumber(+item.price)}
              </Text>
              <Text style={styles.personTxt} numberOfLines={1}>
                /person
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const SmallToursFlatList = ({filteredTours, navigation}: {filteredTours: any[], navigation?: any}) => {
  return (
     <FlatList
          data={filteredTours}
          renderItem={({item}) => TourCardsSmall({item, navigation})}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tours found</Text>
            </View>
          }
        />
  );
};

export function AllToursScreen({navigation, route}: Props) {
  const {top} = useSafeAreaInsets();
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {title = 'All Tours', categoryId} = route.params || {};

  // Filter sheet ref with correct type
  const filterSheetRef = useRef<RBSheetRefType>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 1200000,
  ]);
  const fixedPriceRange = [100000, 1200000];
  // Sort options
  const sortOptions = [
    {id: 'price_asc', label: 'Price: Low to High'},
    {id: 'price_desc', label: 'Price: High to Low'},
    {id: 'rating_desc', label: 'Rating: High to Low'},
    {id: 'latest', label: 'Latest'},
    {id: 'popular', label: 'Most Popular'},
  ];

  // Language options
  const languageOptions = [
    {id: 'en-uk', label: 'English / United Kingdom', icon: '🇬🇧'},
    {id: 'en-us', label: 'English / United States', icon: '🇺🇸'},
    {id: 'vi', label: 'Vietnamese / Vietnam', icon: '🇻🇳'},
    {id: 'de', label: 'Deutsch / Deutschland', icon: '🇩🇪'},
    {id: 'fr', label: 'Français / France', icon: '🇫🇷'},
    {id: 'ja', label: 'Japanese / Japan', icon: '🇯🇵'},
    {id: 'zh', label: 'Chinese / China', icon: '🇨🇳'},
  ];

  // Activity options
  const activityOptions = [
    {id: 'hiking', label: 'Hiking', icon: '🚶'},
    {id: 'biking', label: 'Biking', icon: '🚲'},
    {id: 'skiing', label: 'Skiing', icon: '⛷️'},
    {id: 'swimming', label: 'Swimming', icon: '🏊'},
    {id: 'foodtour', label: 'Food Tour', icon: '🍽️'},
    {id: 'citytour', label: 'City Tour', icon: '🏙️'},
    {id: 'museum', label: 'Museum', icon: '🏛️'},
    {id: 'concert', label: 'Concert', icon: '🎵'},
  ];

  // Gender options
  const genderOptions = [
    {id: 'male', label: 'Male'},
    {id: 'female', label: 'Female'},
    {id: 'mixed', label: 'Mixed'},
    {id: 'any', label: 'Any'},
  ];

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Filter by category if provided
      const initialTours = categoryId
        ? tourData.filter((tour: any) => tour.categoryId === categoryId)
        : tourData;

      setTours(initialTours);
      setFilteredTours(initialTours);
      setLoading(false);
    }, 500);
  }, [categoryId]);

  const handleFilterFocus = () => {
    filterSheetRef.current?.open();
  };

  const applyFilters = () => {
    // Start with all tours
    let filtered = [...tours];

    // Apply price filter
    filtered = filtered.filter(
      tour => +tour.price >= priceRange[0] && +tour.price <= priceRange[1],
    );

    // Apply language filter if any selected
    if (selectedLanguages.length > 0) {
      // In a real app, you would check tour.languages or similar
      // This is a mock implementation
      const langIds = selectedLanguages;
      filtered = filtered.filter(tour => {
        // Mock check: treat categoryId as language for demo
        return langIds.includes(tour.categoryId) || langIds.length === 0;
      });
    }

    // Apply activity filter if any selected
    if (selectedActivities.length > 0) {
      // Mock implementation
      const activityIds = selectedActivities;
      filtered = filtered.filter(tour => {
        // Check if any activities match
        return activityIds.some(
          act =>
            tour.categoryName?.toLowerCase().includes(act) ||
            activityIds.length === 0,
        );
      });
    }

    // Apply gender filter if selected
    if (selectedGender) {
      // Mock implementation - in real app would filter based on gender requirements
      // For demo, just keep the filter as is
    }

    // Apply sorting
    if (selectedSortOption) {
      switch (selectedSortOption) {
        case 'price_asc':
          filtered.sort((a, b) => +a.price - +b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => +b.price - +a.price);
          break;
        case 'rating_desc':
          filtered.sort((a, b) => +b.rating - +a.rating);
          break;
        // Other sorting options would go here
      }
    }

    setFilteredTours(filtered);
    filterSheetRef.current?.close();
  };

  const clearAllFilters = () => {
    setPriceRange([100000, 1200000]);
    setSelectedLanguages([]);
    setSelectedActivities([]);
    setSelectedGender('');
    setSelectedSortOption('');
    setFilteredTours(tours);
  };

  const toggleSelection = (
    id: string,
    type: 'language' | 'activity' | 'gender' | 'sort',
  ) => {
    switch (type) {
      case 'language':
        if (selectedLanguages.includes(id)) {
          setSelectedLanguages(
            selectedLanguages.filter(langId => langId !== id),
          );
        } else {
          setSelectedLanguages([...selectedLanguages, id]);
        }
        break;
      case 'activity':
        if (selectedActivities.includes(id)) {
          setSelectedActivities(
            selectedActivities.filter(actId => actId !== id),
          );
        } else {
          setSelectedActivities([...selectedActivities, id]);
        }
        break;
      case 'gender':
        setSelectedGender(selectedGender === id ? '' : id);
        break;
      case 'sort':
        setSelectedSortOption(selectedSortOption === id ? '' : id);
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, {paddingTop: top}]}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={appColors.navyBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity
          onPress={handleFilterFocus}
          style={[styles.searchIcon]}>
          <MaterialCommunityIcons
            name="tune-variant"
            size={24}
            color={appColors.pureWhite}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.mainColor} />
        </View>
      ) : (
        <SmallToursFlatList
          filteredTours={filteredTours}
          navigation={navigation}
        />
      )}

      {/* Filter Bottom Sheet */}
      <RBSheet
        ref={filterSheetRef as any}
        // closeOnPressMask={true}
        height={700}
        draggable
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
          },
        }}>
        <FilterComponent
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          fixedPriceRange={fixedPriceRange}
          sortOptions={sortOptions}
          languageOptions={languageOptions}
          activityOptions={activityOptions}
          genderOptions={genderOptions}
          selectedLanguages={selectedLanguages}
          selectedActivities={selectedActivities}
          selectedGender={selectedGender}
          selectedSortOption={selectedSortOption}
          toggleSelection={toggleSelection}
          clearAllFilters={clearAllFilters}
          applyFilters={applyFilters}
        />
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
  },
  searchIcon: {
    backgroundColor: appColors.navyBlack,
    padding: 5,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  tourCard: {
    width: CARD_WIDTH,
    height: 270,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imgBackground: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
    height: 180,
    justifyContent: 'flex-end',
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
    backgroundColor: 'transparent',
    borderRadius: 18,
    position: 'absolute',
    right: 12,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagBox: {
    marginBottom: 5,
    marginTop: 7,
    fontSize: 12,
    fontWeight: '400',
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Medium',
  },
  titleTxt: {
    maxWidth: CARD_WIDTH,
    height: 36,
    fontSize: 16,
    letterSpacing: 0.3,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Semibold',
    marginBottom: 5,
  },
  ratingPriceBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.green2,
    width: 48,
    height: 24,
    borderRadius: 7,
  },
  rateTxt: {
    fontSize: 12,
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
  infoBox: {
    // padding: 12,
  },
  placeholder: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 2,
    textTransform: 'lowercase',
  },
});
