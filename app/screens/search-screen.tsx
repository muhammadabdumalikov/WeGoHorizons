import React, {useRef, useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import FilterComponent from '../components/FilterComponent';
import {fetchTours} from '../api/cities';
import {renderTourCard} from './all-tours';

export interface MyRefType {
  open: () => void;
  close: () => void;
}

export function SearchScreen({navigation}: {navigation: any}) {
  const refRBSheet = useRef<MyRefType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 1200000,
  ]);
  const fixedPriceRange: [number, number] = [100000, 1200000];
  const [lastSearches, setLastSearches] = useState([
    'sports',
    'phones',
    'apple',
  ]);

  // Sort options
  const sortOptions = [
    {id: 'price_asc', label: 'Цена: от низкой к высокой'},
    {id: 'price_desc', label: 'Цена: от высокой к низкой'},
    {id: 'rating_desc', label: 'Рейтинг: от высокого к низкому'},
    {id: 'latest', label: 'Новые'},
    {id: 'popular', label: 'Популярные'},
  ];

  // Language options
  const languageOptions = [
    {id: 'en-uk', label: 'Английский / Великобритания', icon: '🇬🇧'},
    {id: 'en-us', label: 'Английский / США', icon: '🇺🇸'},
    {id: 'ru', label: 'Русский / Россия', icon: '🇷🇺'},
    {id: 'uz', label: 'Узбекский / Узбекистан', icon: '🇺🇿'},
    {id: 'de', label: 'Немецкий / Германия', icon: '🇩🇪'},
    {id: 'fr', label: 'Французский / Франция', icon: '🇫🇷'},
    {id: 'ja', label: 'Японский / Япония', icon: '🇯🇵'},
    {id: 'zh', label: 'Китайский / Китай', icon: '🇨🇳'},
  ];

  // Activity options
  const activityOptions = [
    {id: 'hiking', label: 'Походы', icon: '🚶'},
    {id: 'biking', label: 'Велопрогулки', icon: '🚲'},
    {id: 'skiing', label: 'Лыжи', icon: '⛷️'},
    {id: 'swimming', label: 'Плавание', icon: '🏊'},
    {id: 'foodtour', label: 'Гастротуры', icon: '🍽️'},
    {id: 'citytour', label: 'Городские экскурсии', icon: '🏙️'},
    {id: 'museum', label: 'Музеи', icon: '🏛️'},
    {id: 'concert', label: 'Концерты', icon: '🎵'},
  ];

  // Gender options
  const genderOptions = [
    {id: 'male', label: 'Мужской'},
    {id: 'female', label: 'Женский'},
    {id: 'mixed', label: 'Смешанный'},
    {id: 'any', label: 'Любой'},
  ];

  // Filter state
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState('');

  const toggleSelection = (
    id: string,
    type: 'sort' | 'language' | 'activity' | 'gender',
  ) => {
    switch (type) {
      case 'sort':
        setSelectedSort(id);
        break;
      case 'language':
        setSelectedLanguages(prev =>
          prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
        );
        break;
      case 'activity':
        setSelectedActivities(prev =>
          prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
        );
        break;
      case 'gender':
        setSelectedGender(id);
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedSort('');
    setSelectedLanguages([]);
    setSelectedActivities([]);
    setSelectedGender('');
    setPriceRange(fixedPriceRange);
  };

  const applyFilters = () => {
    // Apply filters logic here
    refRBSheet.current?.close();
  };

  const {data: searchResults, isLoading} = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => fetchTours(searchQuery),
    enabled: searchQuery.length > 0,
    staleTime: 0,
    gcTime: 0,
  });

  const handleSearch = (input: string) => {
    setSearchQuery(input);
  };

  const handleClearAll = () => {
    setLastSearches([]);
    setPriceRange([100000, 1200000]);
    setSelectedLanguages([]);
    setSelectedActivities([]);
    setSelectedGender('');
    setSelectedSort('');
    setSearchQuery('');
  };

  const handleDeleteLastSearch = (index: number) => {
    setLastSearches(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <Pressable onPress={navigation.goBack} style={styles.goBackBtn}>
            <Feather name="arrow-left" size={20} color={appColors.navyBlack} />
          </Pressable>
          <SearchInputBox
            style={styles.inputBox}
            handleSearch={handleSearch}
            openBottomSheet={() => refRBSheet.current?.open()}
          />
        </View>

        <RBSheet
          ref={refRBSheet}
          height={700}
          openDuration={300}
          draggable
          customStyles={{
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
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

        {searchQuery.length === 0 ? (
          <>
            <SeeAllHeader
              headerName="Last Search"
              btnName="Clear all"
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
              headerName={`"${searchQuery}"`}
              btnName="Clear all"
              onPress={handleClearAll}
            />

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={appColors.mainColor} />
              </View>
            ) : (
              <FlatList
                data={searchResults}
                renderItem={({item}) => renderTourCard({item, navigation})}
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
    height: 60,
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
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
    color: appColors.darkGrey,
  },
  goBackBtn: {
    paddingRight: 10,
    paddingVertical: 5,
  },
  removeSearchBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
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
