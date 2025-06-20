import React, {useRef, useState, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {GilroyMediumText} from '../components/StyledText';
import {appColors} from '../shared/constants';
import {SeeAllHeader} from '../components/SeeAllHeader';
import {SearchInputBox} from '../components/Input';
import FilterComponent from '../components/FilterComponent';
import {fetchTours, TourFilters} from '../api/cities';
import {TourCardsSmall} from './all-tours';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useLocalization} from '../shared/hooks/useLocalization';

export interface MyRefType {
  open: () => void;
  close: () => void;
}

export function SearchScreen({navigation}: {navigation: any}) {
  const refRBSheet = useRef<MyRefType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 1200000,
  ]);
  const fixedPriceRange = useMemo<[number, number]>(
    () => [100000, 1200000],
    [],
  );
  const [lastSearches, setLastSearches] = useState([
    'sports',
    'phones',
    'apple',
  ]);
  const {t} = useLocalization();

  // Applied filters state (what's actually sent to API)
  const [appliedFilters, setAppliedFilters] = useState<TourFilters>({});

  // Sort options
  const sortOptions = [
    {id: 'price_asc', label: t('search.sortOptions.priceAsc')},
    {id: 'price_desc', label: t('search.sortOptions.priceDesc')},
    {id: 'rating_desc', label: t('search.sortOptions.ratingDesc')},
    {id: 'latest', label: t('search.sortOptions.latest')},
    {id: 'popular', label: t('search.sortOptions.popular')},
  ];

  // Language options
  const languageOptions = [
    {id: 'en-uk', label: t('search.languageOptions.enUk'), icon: '🇬🇧'},
    {id: 'en-us', label: t('search.languageOptions.enUs'), icon: '🇺🇸'},
    {id: 'ru', label: t('search.languageOptions.ru'), icon: '🇷🇺'},
    {id: 'uz', label: t('search.languageOptions.uz'), icon: '🇺🇿'},
    {id: 'de', label: t('search.languageOptions.de'), icon: '🇩🇪'},
    {id: 'fr', label: t('search.languageOptions.fr'), icon: '🇫🇷'},
    {id: 'ja', label: t('search.languageOptions.ja'), icon: '🇯🇵'},
    {id: 'zh', label: t('search.languageOptions.zh'), icon: '🇨🇳'},
  ];

  // Activity options
  const activityOptions = [
    {id: 'hiking', label: t('search.activityOptions.hiking'), icon: '🚶'},
    {id: 'biking', label: t('search.activityOptions.biking'), icon: '🚲'},
    {id: 'skiing', label: t('search.activityOptions.skiing'), icon: '⛷️'},
    {id: 'swimming', label: t('search.activityOptions.swimming'), icon: '🏊'},
    {id: 'foodtour', label: t('search.activityOptions.foodtour'), icon: '🍽️'},
    {id: 'citytour', label: t('search.activityOptions.citytour'), icon: '🏙️'},
    {id: 'museum', label: t('search.activityOptions.museum'), icon: '🏛️'},
    {id: 'concert', label: t('search.activityOptions.concert'), icon: '🎵'},
  ];

  // Gender options
  const genderOptions = [
    {id: 'male', label: t('search.genderOptions.male')},
    {id: 'female', label: t('search.genderOptions.female')},
    {id: 'mixed', label: t('search.genderOptions.mixed')},
    {id: 'any', label: t('search.genderOptions.any')},
  ];

  // Filter state
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState('');

  // Create filters object for API call
  const createFilters = useCallback((): TourFilters => {
    const filters: TourFilters = {};

    if (searchQuery) filters.search = searchQuery;
    if (startDate) filters.from_date = startDate;
    if (endDate) filters.to_date = endDate;
    if (priceRange) {
      filters.from_price = priceRange[0];
      filters.to_price = priceRange[1];
    }
    if (selectedLanguages.length > 0) filters.languages = selectedLanguages;
    if (selectedActivities.length > 0) filters.activities = selectedActivities;
    if (selectedGender) filters.gender = selectedGender;
    if (selectedSort) filters.sort_by = selectedSort;

    return filters;
  }, [
    searchQuery,
    startDate,
    endDate,
    priceRange,
    selectedLanguages,
    selectedActivities,
    selectedGender,
    selectedSort,
  ]);

  const toggleSelection = useCallback(
    (id: string, type: 'sort' | 'language' | 'activity' | 'gender') => {
      switch (type) {
        case 'sort':
          setSelectedSort(id);
          break;
        case 'language':
          setSelectedLanguages(prev =>
            prev.includes(id)
              ? prev.filter(item => item !== id)
              : [...prev, id],
          );
          break;
        case 'activity':
          setSelectedActivities(prev =>
            prev.includes(id)
              ? prev.filter(item => item !== id)
              : [...prev, id],
          );
          break;
        case 'gender':
          setSelectedGender(id);
          break;
      }
    },
    [],
  );

  const clearAllFilters = useCallback(() => {
    setSelectedSort('');
    setSelectedLanguages([]);
    setSelectedActivities([]);
    setSelectedGender('');
    setPriceRange(fixedPriceRange);
    setStartDate('');
    setEndDate('');
    setAppliedFilters({});
  }, [fixedPriceRange]);

  const applyFilters = useCallback(() => {
    // Apply current filters to the applied filters state
    setAppliedFilters(createFilters());
    refRBSheet.current?.close();
  }, [createFilters]);

  const {data: searchResults, isLoading} = useQuery({
    queryKey: [
      'search',
      appliedFilters.search || '',
      appliedFilters.from_date || '',
      appliedFilters.to_date || '',
      appliedFilters.from_price || 0,
      appliedFilters.to_price || 0,
      JSON.stringify(appliedFilters.languages || []),
      JSON.stringify(appliedFilters.activities || []),
      appliedFilters.gender || '',
      appliedFilters.sort_by || '',
    ],
    queryFn: () => fetchTours(appliedFilters),
    enabled: Object.keys(appliedFilters).length > 0,
    staleTime: 0,
    gcTime: 0,
  });

  const handleSearch = useCallback((input: string) => {
    setSearchQuery(input);
    // Apply search immediately
    setAppliedFilters(prev => ({...prev, search: input}));
  }, []);

  const handleFiltersChange = useCallback(
    (filters: {search: string; startDate: string; endDate: string}) => {
      setSearchQuery(filters.search);
      setStartDate(filters.startDate);
      setEndDate(filters.endDate);
      // Apply date filters immediately
      setAppliedFilters(prev => ({
        ...prev,
        search: filters.search,
        from_date: filters.startDate || undefined,
        to_date: filters.endDate || undefined,
      }));
    },
    [],
  );

  const handleClearAll = useCallback(() => {
    setLastSearches([]);
    setPriceRange([100000, 1200000]);
    setSelectedLanguages([]);
    setSelectedActivities([]);
    setSelectedGender('');
    setSelectedSort('');
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setAppliedFilters({});
  }, []);

  const handleDeleteLastSearch = useCallback((index: number) => {
    setLastSearches(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Check if any filters are applied
  const hasAppliedFilters = Object.keys(appliedFilters).length > 0;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <Pressable onPress={navigation.goBack} style={styles.goBackBtn}>
            <FontAwesome6
              name="chevron-left"
              size={20}
              color={appColors.navyBlack}
            />
          </Pressable>
          <SearchInputBox
            style={styles.inputBox}
            handleSearch={handleSearch}
            openBottomSheet={() => refRBSheet.current?.open()}
            onFiltersChange={handleFiltersChange}
          />
        </View>

        <RBSheet
          ref={refRBSheet}
          height={700}
          openDuration={300}
          draggable
          customStyles={{
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              // marginBottom: 16,
              // width: Dimensions.get('window').width - 20,
              // alignSelf: 'center',
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
            selectedSortOption={selectedSort}
            toggleSelection={toggleSelection}
            clearAllFilters={clearAllFilters}
            applyFilters={applyFilters}
          />
        </RBSheet>

        {!hasAppliedFilters ? (
          <>
            <SeeAllHeader
              headerName={t('search.lastSearch')}
              btnName={t('search.clearAll')}
              onPress={handleClearAll}
            />
            <View style={styles.lastSearchBox}>
              {lastSearches.map((item, index) => (
                <Pressable
                  style={styles.lastSearchElement}
                  key={index}
                  onPress={() => handleSearch(item)}>
                  <View style={styles.circleTxt}>
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      color={appColors.darkGrey}
                    />
                    <GilroyMediumText
                      style={styles.lastSearchTxt}
                      numberOfLines={1}>
                      {item}
                    </GilroyMediumText>
                  </View>
                  <Pressable
                    style={styles.removeSearchBox}
                    onPress={() => handleDeleteLastSearch(index)}>
                    <AntDesign
                      name="close"
                      size={14}
                      color={appColors.darkGrey}
                    />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          </>
        ) : (
          <>
            <SeeAllHeader
              headerName={
                appliedFilters.search
                  ? `"${appliedFilters.search}"`
                  : t('search.results')
              }
              btnName=""
              style={{marginVertical: 0}}
              onPress={() => {}}
            />

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={appColors.mainColor} />
              </View>
            ) : (
              <FlatList
                data={searchResults}
                renderItem={({item}) => (
                  <TourCardsSmall item={item} navigation={navigation} />
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {t('search.noToursFound')}
                    </Text>
                  </View>
                }
              />
            )}
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  headerBox: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  inputBox: {
    flex: 1,
    marginBottom: 0,
    marginLeft: 0,
  },
  lastSearchBox: {
    paddingHorizontal: 25,
  },
  lastSearchElement: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  circleTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastSearchTxt: {
    fontSize: 16,
    marginLeft: 10,
    color: appColors.grey6,
  },
  goBackBtn: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
  },
  removeSearchBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: appColors.grey6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tourCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: appColors.pureWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 280,
  },
  imgBackground: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  discountBox: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: appColors.mainColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountTxt: {
    color: appColors.pureWhite,
    fontSize: 12,
    fontFamily: 'Gilroy-Bold',
  },
  organizerLogoBox: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  organizerLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  heartBox: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  tagBox: {
    fontSize: 12,
    color: appColors.mainColor,
    marginTop: 8,
    marginLeft: 8,
    fontFamily: 'Gilroy-Medium',
  },
  infoBox: {
    padding: 8,
    height: 130,
  },
  titleTxt: {
    fontSize: 14,
    color: appColors.navyBlack,
    marginBottom: 8,
    fontFamily: 'Gilroy-Bold',
    height: 40,
  },
  ratingPriceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.green2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rateTxt: {
    color: appColors.pureWhite,
    fontSize: 12,
    marginRight: 4,
    fontFamily: 'Gilroy-Bold',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTxt: {
    fontSize: 14,
    color: appColors.navyBlack,
    fontFamily: 'Gilroy-Bold',
  },
  personTxt: {
    fontSize: 12,
    color: appColors.darkGrey,
    marginLeft: 4,
    fontFamily: 'Gilroy-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: appColors.darkGrey,
    fontFamily: 'Gilroy-Medium',
  },
});
