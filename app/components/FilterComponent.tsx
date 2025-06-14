import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../shared/constants';
import {Slider} from '@miblanchard/react-native-slider';

// For Android, need to enable LayoutAnimation
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

interface FilterComponentProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  fixedPriceRange: number[];
  sortOptions: FilterOption[];
  languageOptions: FilterOption[];
  activityOptions: FilterOption[];
  genderOptions: FilterOption[];
  selectedLanguages: string[];
  selectedActivities: string[];
  selectedGender: string;
  selectedSortOption: string;

  // Main pattern - pass the toggle function
  toggleSelection?: (
    id: string,
    type: 'language' | 'activity' | 'gender' | 'sort',
  ) => void;

  // Alternative pattern - pass the setters
  setSelectedLanguages?: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedActivities?: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedGender?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSortOption?: React.Dispatch<React.SetStateAction<string>>;

  // Section handling
  expandedSections?: {
    languages: boolean;
    activities: boolean;
    gender: boolean;
    sortBy: boolean;
  };
  toggleSection?: (
    section: 'languages' | 'activities' | 'gender' | 'sortBy',
  ) => void;

  clearAllFilters: () => void;
  applyFilters: () => void;
  onClose?: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  priceRange,
  setPriceRange: _setPriceRange,
  fixedPriceRange,
  sortOptions,
  languageOptions,
  activityOptions,
  genderOptions,
  selectedLanguages,
  selectedActivities,
  selectedGender,
  selectedSortOption,
  toggleSelection,
  setSelectedLanguages,
  setSelectedActivities,
  setSelectedGender,
  setSelectedSortOption,
  expandedSections: externalExpandedSections,
  toggleSection: externalToggleSection,
  clearAllFilters,
  applyFilters,
  onClose,
}) => {
  // Local state for expandable sections if not provided externally
  const [localExpandedSections, setLocalExpandedSections] = useState({
    languages: false,
    activities: false,
    gender: false,
    sortBy: false,
  });

  // Create animation value refs separately
  const languagesAnimRef = useRef(new Animated.Value(0));
  const activitiesAnimRef = useRef(new Animated.Value(0));
  const genderAnimRef = useRef(new Animated.Value(0));
  const sortByAnimRef = useRef(new Animated.Value(0));

  // Animation values for each section
  const animationValues = useMemo(
    () => ({
      languages: languagesAnimRef.current,
      activities: activitiesAnimRef.current,
      gender: genderAnimRef.current,
      sortBy: sortByAnimRef.current,
    }),
    [],
  );

  // Use external or local state
  const effectiveExpandedSections =
    externalExpandedSections || localExpandedSections;

  // Configure LayoutAnimation
  const configureAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  };

  // Use external or local toggle function with added delay for opening
  const effectiveToggleSection = externalToggleSection
    ? (section: keyof typeof localExpandedSections) => {
        configureAnimation();

        // If we're closing the section, close it immediately
        if (externalExpandedSections?.[section]) {
          externalToggleSection(section as any);
        } else {
          // If we're opening, add a small delay for a better sequence
          setTimeout(() => {
            externalToggleSection(section as any);
          }, 100);
        }
      }
    : (section: keyof typeof localExpandedSections) => {
        // Configure animation first
        configureAnimation();

        // If we're closing the section, close it immediately
        if (localExpandedSections[section]) {
          setLocalExpandedSections({
            ...localExpandedSections,
            [section]: false,
          });

          // Animate the arrow rotation
          Animated.timing(animationValues[section], {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          // If we're opening, add a small delay for a better sequence
          // First start the arrow rotation
          Animated.timing(animationValues[section], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          // Then open the section with a delay
          setTimeout(() => {
            setLocalExpandedSections({
              ...localExpandedSections,
              [section]: true,
            });
          }, 150);
        }
      };

  // Update the animation values when expanded state changes externally
  useEffect(() => {
    if (externalExpandedSections) {
      Object.keys(externalExpandedSections).forEach(section => {
        const sectionKey = section as keyof typeof animationValues;
        Animated.timing(animationValues[sectionKey], {
          toValue: externalExpandedSections[sectionKey] ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [externalExpandedSections, animationValues]);

  // Local toggleSelection implementation that uses the setters if toggleSelection is not provided
  const effectiveToggleSelection =
    toggleSelection ||
    ((id: string, type: 'language' | 'activity' | 'gender' | 'sort') => {
      switch (type) {
        case 'language':
          if (setSelectedLanguages) {
            if (selectedLanguages.includes(id)) {
              setSelectedLanguages(
                selectedLanguages.filter(langId => langId !== id),
              );
            } else {
              setSelectedLanguages([...selectedLanguages, id]);
            }
          }
          break;
        case 'activity':
          if (setSelectedActivities) {
            if (selectedActivities.includes(id)) {
              setSelectedActivities(
                selectedActivities.filter(actId => actId !== id),
              );
            } else {
              setSelectedActivities([...selectedActivities, id]);
            }
          }
          break;
        case 'gender':
          if (setSelectedGender) {
            setSelectedGender(selectedGender === id ? '' : id);
          }
          break;
        case 'sort':
          if (setSelectedSortOption) {
            setSelectedSortOption(selectedSortOption === id ? '' : id);
          }
          break;
      }
    });

  // Format price with currency
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' sum';
  };

  // Generate rotation animations for the arrow icons
  const getRotateAnimation = (section: keyof typeof animationValues) => {
    return {
      transform: [
        {
          rotate: animationValues[section].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };
  };

  const handlePriceRangeChange = useCallback(
    (values: number[]) => {
      _setPriceRange([values[0], values[1]]);
    },
    [_setPriceRange],
  );

  return (
    <View style={styles.filterContainer}>
      {/* Filter Content */}
      <ScrollView
        style={styles.filterContent}
        contentContainerStyle={styles.filterContentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Filter Header */}
        <View style={styles.filterHeader}>
          {/* Close button on the left */}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={onClose || applyFilters}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <AntDesign name="close" size={22} color={appColors.navyBlack} />
          </TouchableOpacity>

          {/* Title in the center */}
          <Text style={styles.modalTitle}>Filters</Text>

          {/* Clear all on the right */}
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        {/* Price Range Section */}
        <View style={styles.filterSection}>
          <View style={styles.priceHeader}>
            <Text style={styles.filterSectionTitle}>Price range</Text>
            <Text style={styles.selectedPriceRange}>
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Text>
          </View>

          <View style={styles.priceSliderContainer}>
            <Slider
              containerStyle={styles.slider}
              minimumValue={fixedPriceRange[0]}
              maximumValue={fixedPriceRange[1]}
              step={1000}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              trackStyle={styles.track}
              minimumTrackTintColor={appColors.mainColor}
              maximumTrackTintColor={appColors.grey2}
              thumbStyle={styles.thumb}
              thumbTintColor={appColors.mainColor}
            />
            <View style={styles.priceLabelsContainer}>
              <Text style={styles.priceLabel}>
                {formatPrice(fixedPriceRange[0])}
              </Text>
              <Text style={styles.priceLabel}>
                {formatPrice(fixedPriceRange[1])}
              </Text>
            </View>
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.filterSection}>
          {/* Section Title */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.filterSectionTitle}>Languages</Text>
          </View>

          {/* Clickable Area - Collapsed */}
          {!effectiveExpandedSections.languages && (
            <TouchableOpacity
              style={styles.collapsedOption}
              activeOpacity={0.7}
              onPress={() => effectiveToggleSection('languages')}>
              <Text style={styles.collapsedOptionText}>
                {selectedLanguages.length > 0
                  ? `${selectedLanguages.length} selected`
                  : 'Select languages'}
              </Text>
              <Animated.View style={getRotateAnimation('languages')}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#000"
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          {/* Expanded Options */}
          <Animated.View
            style={[
              effectiveExpandedSections.languages
                ? styles.optionsContainerVisible
                : styles.optionsContainerHidden,
            ]}>
            {effectiveExpandedSections.languages && (
              <View style={styles.optionsContainer}>
                {/* Header with close button - same styling as collapsed option */}
                <View style={[styles.optionsHeader]}>
                  <Text style={styles.optionsHeaderText}>
                    {selectedLanguages.length > 0
                      ? `${selectedLanguages.length} selected`
                      : 'Select languages'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => effectiveToggleSection('languages')}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                {/* Options list */}
                {languageOptions.map(language => (
                  <TouchableOpacity
                    key={language.id}
                    style={[
                      styles.optionItem,
                      selectedLanguages.includes(language.id) &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      effectiveToggleSelection(language.id, 'language')
                    }>
                    {language.icon && (
                      <Text style={styles.optionIcon}>{language.icon}</Text>
                    )}
                    <Text style={styles.optionLabel}>{language.label}</Text>
                    {selectedLanguages.includes(language.id) && (
                      <AntDesign
                        name="check"
                        size={18}
                        color={appColors.mainColor}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>

        {/* Activities Section */}
        <View style={styles.filterSection}>
          {/* Section Title */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.filterSectionTitle}>Activities</Text>
          </View>

          {/* Clickable Area - Collapsed */}
          {!effectiveExpandedSections.activities && (
            <TouchableOpacity
              style={styles.collapsedOption}
              activeOpacity={0.7}
              onPress={() => effectiveToggleSection('activities')}>
              <Text style={styles.collapsedOptionText}>
                {selectedActivities.length > 0
                  ? `${selectedActivities.length} selected`
                  : 'Select activities'}
              </Text>
              <Animated.View style={getRotateAnimation('activities')}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#000"
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          {/* Expanded Options */}
          <Animated.View
            style={[
              effectiveExpandedSections.activities
                ? styles.optionsContainerVisible
                : styles.optionsContainerHidden,
            ]}>
            {effectiveExpandedSections.activities && (
              <View style={styles.optionsContainer}>
                {/* Header with close button - same styling as collapsed option */}
                <View style={[styles.optionsHeader]}>
                  <Text style={styles.optionsHeaderText}>
                    {selectedActivities.length > 0
                      ? `${selectedActivities.length} selected`
                      : 'Select activities'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => effectiveToggleSection('activities')}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                {/* Options list */}
                {activityOptions.map(activity => (
                  <TouchableOpacity
                    key={activity.id}
                    style={[
                      styles.optionItem,
                      selectedActivities.includes(activity.id) &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      effectiveToggleSelection(activity.id, 'activity')
                    }>
                    {activity.icon && (
                      <Text style={styles.optionIcon}>{activity.icon}</Text>
                    )}
                    <Text style={styles.optionLabel}>{activity.label}</Text>
                    {selectedActivities.includes(activity.id) && (
                      <AntDesign
                        name="check"
                        size={18}
                        color={appColors.mainColor}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>

        {/* Gender Section */}
        <View style={styles.filterSection}>
          {/* Section Title */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.filterSectionTitle}>Gender</Text>
          </View>

          {/* Clickable Area - Collapsed */}
          {!effectiveExpandedSections.gender && (
            <TouchableOpacity
              style={styles.collapsedOption}
              activeOpacity={0.7}
              onPress={() => effectiveToggleSection('gender')}>
              <Text style={styles.collapsedOptionText}>
                {selectedGender
                  ? genderOptions.find(g => g.id === selectedGender)?.label
                  : 'Select gender'}
              </Text>
              <Animated.View style={getRotateAnimation('gender')}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#000"
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          {/* Expanded Options */}
          <Animated.View
            style={[
              effectiveExpandedSections.gender
                ? styles.optionsContainerVisible
                : styles.optionsContainerHidden,
            ]}>
            {effectiveExpandedSections.gender && (
              <View style={styles.optionsContainer}>
                {/* Header with close button - same styling as collapsed option */}
                <View style={[styles.optionsHeader]}>
                  <Text style={styles.optionsHeaderText}>
                    {selectedGender
                      ? genderOptions.find(g => g.id === selectedGender)?.label
                      : 'Select gender'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => effectiveToggleSection('gender')}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                {/* Options list */}
                {genderOptions.map(gender => (
                  <TouchableOpacity
                    key={gender.id}
                    style={[
                      styles.optionItem,
                      selectedGender === gender.id && styles.selectedOption,
                    ]}
                    onPress={() =>
                      effectiveToggleSelection(gender.id, 'gender')
                    }>
                    <Text style={styles.optionLabel}>{gender.label}</Text>
                    {selectedGender === gender.id && (
                      <AntDesign
                        name="check"
                        size={18}
                        color={appColors.mainColor}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>

        {/* Sort By Section */}
        <View style={styles.filterSection}>
          {/* Section Title */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.filterSectionTitle}>Sort by</Text>
          </View>

          {/* Clickable Area - Collapsed */}
          {!effectiveExpandedSections.sortBy && (
            <TouchableOpacity
              style={styles.collapsedOption}
              activeOpacity={0.7}
              onPress={() => effectiveToggleSection('sortBy')}>
              <Text style={styles.collapsedOptionText}>
                {selectedSortOption
                  ? sortOptions.find(o => o.id === selectedSortOption)?.label
                  : 'Select option'}
              </Text>
              <Animated.View style={getRotateAnimation('sortBy')}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#000"
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          {/* Expanded Options */}
          <Animated.View
            style={[
              effectiveExpandedSections.sortBy
                ? styles.optionsContainerVisible
                : styles.optionsContainerHidden,
            ]}>
            {effectiveExpandedSections.sortBy && (
              <View style={styles.optionsContainer}>
                {/* Header with close button - same styling as collapsed option */}
                <View style={[styles.optionsHeader]}>
                  <Text style={styles.optionsHeaderText}>
                    {selectedSortOption
                      ? sortOptions.find(o => o.id === selectedSortOption)
                          ?.label
                      : 'Select option'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => effectiveToggleSection('sortBy')}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>

                {/* Options list */}
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionItem,
                      selectedSortOption === option.id && styles.selectedOption,
                    ]}
                    onPress={() => effectiveToggleSelection(option.id, 'sort')}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {selectedSortOption === option.id && (
                      <AntDesign
                        name="check"
                        size={18}
                        color={appColors.mainColor}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  clearAllText: {
    fontSize: 16,
    color: appColors.redVelvet,
    fontFamily: 'Gilroy-Medium',
    paddingVertical: 5,
  },
  filterContent: {
    flex: 1,
  },
  filterContentContainer: {
    paddingBottom: 100,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: '#000',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedPriceRange: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: appColors.navyBlack,
  },
  priceSliderContainer: {
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  slider: {
    height: 40,
    width: '100%',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: appColors.mainColor,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  priceLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: appColors.grey6,
  },
  collapsedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  collapsedOptionText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#757575',
  },
  optionsContainerVisible: {
    opacity: 1,
    maxHeight: 1000,
    transform: [{scale: 1}],
  },
  optionsContainerHidden: {
    opacity: 0,
    maxHeight: 0,
    transform: [{scale: 0.9}],
    height: 0,
    overflow: 'hidden',
  },
  optionsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 0,
    overflow: 'hidden',
  },
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionsHeaderText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#757575',
  },
  optionItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 0,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'rgba(249, 223, 123, 0.2)',
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  buttonContainer: {
    position: 'absolute',
    height: 88,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: appColors.pureWhite,
  },
  applyButton: {
    flex: 1,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.mainColor,
    borderRadius: 30,
  },
  applyButtonText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    color: '#000',
  },
  closeModalButton: {
    paddingVertical: 10,
    paddingRight: 15,
  },
});

export default FilterComponent;
