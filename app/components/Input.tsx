import React, {useState, useEffect, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../shared/constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Calendar} from 'react-native-calendars';
import {BottomSheetRefType} from '../shared/helpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function InputBox(
  props: TextInputProps & {
    handleSearch: (input: string) => void;
    hasPreIcon?: boolean;
    resultValue?: string;
  },
) {
  const [input, setInput] = useState('');

  return (
    <View style={[styles.box, props?.style]}>
      {props.hasPreIcon ? (
        <Pressable
          onPress={() => props.handleSearch(input)}
          style={[styles.searchIcon]}>
          <Feather name="search" size={24} color={appColors.navyBlack} />
        </Pressable>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Qidiruv ..."
        value={input}
        onChangeText={setInput}
      />
    </View>
  );
}

export function SearchInputBox(
  props: TextInputProps & {
    handleSearch: (input: string) => void;
    openBottomSheet?: () => void;
    onFiltersChange?: (filters: {
      search: string;
      startDate: string;
      endDate: string;
    }) => void;
  },
) {
  const {handleSearch, openBottomSheet, onFiltersChange} = props;
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const calendarRef = useRef<BottomSheetRefType>(null);
  const [startDateCalendar, setStartDateCalendar] = useState('');
  const [endDateCalendar, setEndDateCalendar] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 700);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (debouncedInput !== '') {
      handleSearch(debouncedInput);
    }
  }, [debouncedInput, handleSearch]);

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        search: debouncedInput,
        startDate,
        endDate,
      });
    }
  }, [debouncedInput, startDate, endDate, onFiltersChange]);

  const handleFilterFocus = () => {
    if (openBottomSheet) {
      openBottomSheet();
    }
  };

  const handleCalendarOpen = () => {
    calendarRef.current?.open();
  };

  const handleDateSelect = (date: any) => {
    const selectedDate = date.dateString;

    if (!startDateCalendar || (startDateCalendar && endDateCalendar)) {
      // First date selection or reset selection
      setStartDateCalendar(selectedDate);
      setEndDateCalendar('');
    } else {
      // Second date selection
      if (selectedDate < startDateCalendar) {
        // If selected date is before start date, swap them
        setEndDateCalendar(startDateCalendar);
        setStartDateCalendar(selectedDate);
      } else {
        setEndDateCalendar(selectedDate);
      }
    }
  };

  // Generate marked dates for the date range
  const getMarkedDates = () => {
    const markedDates: any = {};

    if (startDateCalendar) {
      markedDates[startDateCalendar] = {
        startingDay: true,
        color: appColors.mainColor,
        textColor: appColors.pureWhite,
      };
    }

    if (endDateCalendar) {
      markedDates[endDateCalendar] = {
        endingDay: true,
        color: appColors.mainColor,
        textColor: appColors.pureWhite,
      };
    }

    // Mark dates in between start and end
    if (startDateCalendar && endDateCalendar) {
      const start = new Date(startDateCalendar);
      const end = new Date(endDateCalendar);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        if (
          dateString !== startDateCalendar &&
          dateString !== endDateCalendar
        ) {
          markedDates[dateString] = {
            color: appColors.mainColor,
            textColor: appColors.pureWhite,
          };
        }
      }
    }

    return markedDates;
  };

  const handleCloseCalendar = () => {
    setStartDate(startDateCalendar);
    setEndDate(endDateCalendar);
    calendarRef.current?.close();
  };

  const handleClearDates = () => {
    setStartDateCalendar('');
    setEndDateCalendar('');
    setStartDate('');
    setEndDate('');
  };

  const handleClearInput = () => {
    setInput('');
    setDebouncedInput('');
    handleSearch('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, props?.style]}>
        <Pressable
          onPress={() => handleSearch(input)}
          style={[styles.searchIcon]}>
          <Feather name="search" size={24} color={appColors.navyBlack} />
        </Pressable>

        <TextInput
          style={styles.input}
          placeholderTextColor={appColors.navyBlack}
          placeholder={props?.placeholder ?? 'Qidiruv ...'}
          value={input}
          onChangeText={setInput}
        />

        {input.length > 0 && (
          <Pressable onPress={handleClearInput} style={styles.clearInputButton}>
            <Ionicons name="close" size={20} color={appColors.navyBlack} />
          </Pressable>
        )}
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={handleCalendarOpen}
          style={[styles.filterIcon]}>
          <AntDesign name="calendar" size={24} color={appColors.navyBlack} />
          {(startDate || endDate) && (
            <View style={styles.calendarIndicator}>
              <View style={styles.indicatorDot} />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFilterFocus}
          style={[styles.filterIcon]}>
          <MaterialCommunityIcons
            name="tune-variant"
            size={24}
            color={appColors.navyBlack}
          />
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={calendarRef}
        height={500}
        openDuration={300}
        closeDuration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          },
        }}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Select Date Range</Text>
            <View style={styles.calendarActions}>
              <TouchableOpacity
                onPress={handleClearDates}
                style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCloseCalendar}
                style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Calendar
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            markingType="period"
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: appColors.navyBlack,
              selectedDayBackgroundColor: appColors.mainColor,
              selectedDayTextColor: '#ffffff',
              todayTextColor: appColors.mainColor,
              dayTextColor: appColors.navyBlack,
              textDisabledColor: '#d9e1e8',
              dotColor: appColors.mainColor,
              selectedDotColor: '#ffffff',
              arrowColor: appColors.mainColor,
              monthTextColor: appColors.navyBlack,
              textMonthFontFamily: 'Gilroy-Semibold',
              textDayFontFamily: 'Gilroy-Medium',
              textDayHeaderFontFamily: 'Gilroy-Semibold',
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: appColors.grey2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontFamily: 'Gilroy-Semibold',
    fontSize: 16,
    paddingVertical: 10,
  },
  filterFocused: {
    borderColor: appColors.grey2,
    color: appColors.pureWhite,
  },
  searchIcon: {
    marginRight: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 16,
  },
  filterIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 5,
    backgroundColor: appColors.grey2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconFocused: {
    padding: 5,
    backgroundColor: appColors.purple,
    borderRadius: 10,
  },
  calendarContainer: {
    flex: 1,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  calendarTitle: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 18,
    color: appColors.navyBlack,
  },
  calendarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 16,
    color: appColors.navyBlack,
  },
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 16,
    color: appColors.mainColor,
  },
  dateRangeInfo: {
    padding: 16,
  },
  dateRangeText: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 16,
    color: appColors.navyBlack,
  },
  calendarIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: appColors.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: appColors.navyBlack,
  },
  clearInputButton: {
    padding: 8,
  },
});
