import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions, Pressable, FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {appColors} from '../shared/constants';
import {GilroyBoldText, GilroyMediumText} from '../components/StyledText';
import {SafeAreaView} from '../components/Themed';

const {width} = Dimensions.get('window');

const categories = [
  {label: 'Art'},
  {label: 'Music'},
  {label: 'Food & Drink'},
  {label: 'Movie & Theater'},
];

// Mock events data
const mockEvents = [
  {
    id: '1',
    date: '2025-06-21',
    category: 'Art',
    title: 'Modern Art Expo',
    location: 'City Gallery',
    time: '10:00 AM',
  },
  {
    id: '2',
    date: '2025-06-21',
    category: 'Music',
    title: 'Jazz Night',
    location: 'Downtown Club',
    time: '8:00 PM',
  },
  {
    id: '3',
    date: '2025-06-21',
    category: 'Food & Drink',
    title: 'Wine Tasting',
    location: 'Vineyard',
    time: '6:00 PM',
  },
  {
    id: '4',
    date: '2025-06-24',
    category: 'Art',
    title: 'Sculpture Workshop',
    location: 'Art Center',
    time: '2:00 PM',
  },
  {
    id: '5',
    date: '2025-06-24',
    category: 'Movie & Theater',
    title: 'Indie Film Premiere',
    location: 'Cinema Hall',
    time: '7:30 PM',
  },
  {
    id: '6',
    date: '2025-06-21',
    category: 'Art',
    title: 'Street Art Tour',
    location: 'Downtown',
    time: '1:00 PM',
  },
  {
    id: '7',
    date: '2025-06-21',
    category: 'Art',
    title: 'Gallery Night',
    location: 'Modern Art Gallery',
    time: '7:00 PM',
  },
  {
    id: '8',
    date: '2025-06-21',
    category: 'Art',
    title: 'Photography Expo',
    location: 'Photo Center',
    time: '3:00 PM',
  },
  {
    id: '9',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art & Wine',
    location: 'Art Bar',
    time: '5:00 PM',
  },
  {
    id: '10',
    date: '2025-06-21',
    category: 'Art',
    title: 'Kids Art Class',
    location: 'Community Center',
    time: '11:00 AM',
  },
  {
    id: '11',
    date: '2025-06-21',
    category: 'Art',
    title: 'Ceramics Workshop',
    location: 'Pottery Studio',
    time: '4:00 PM',
  },
  {
    id: '12',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art History Talk',
    location: 'Library',
    time: '6:30 PM',
  },
  {
    id: '13',
    date: '2025-06-21',
    category: 'Art',
    title: 'Open Studio',
    location: 'Artist Loft',
    time: '2:00 PM',
  },
  {
    id: '14',
    date: '2025-06-21',
    category: 'Art',
    title: 'Sculpture Walk',
    location: 'City Park',
    time: '9:00 AM',
  },
  {
    id: '15',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art Auction',
    location: 'Auction House',
    time: '8:30 PM',
  },
  {
    id: '16',
    date: '2025-06-21',
    category: 'Art',
    title: 'Painting Demo',
    location: 'Art Supply Store',
    time: '12:00 PM',
  },
  {
    id: '17',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art Book Fair',
    location: 'Bookstore',
    time: '10:30 AM',
  },
  {
    id: '18',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art Market',
    location: 'Outdoor Plaza',
    time: '1:30 PM',
  },
  {
    id: '19',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art Film Screening',
    location: 'Indie Cinema',
    time: '7:30 PM',
  },
  {
    id: '20',
    date: '2025-06-21',
    category: 'Art',
    title: 'Art Panel Discussion',
    location: 'Conference Hall',
    time: '5:30 PM',
  },
];

// Dynamically generate eventDays from mockEvents
function getEventDays(
  events: typeof mockEvents,
  selected: string,
  appColors: typeof import('../shared/constants').appColors,
): Record<string, any> {
  const eventDays = events.reduce(
    (acc: Record<string, any>, event: (typeof mockEvents)[0]) => {
      acc[event.date] = {
        ...(acc[event.date] || {}),
        marked: true,
        dotColor: appColors.mainColor,
      };
      return acc;
    },
    {},
  );
  // Add selected/selectedColor for the currently selected date
  eventDays[selected] = {
    ...(eventDays[selected] || {}),
    selected: true,
    selectedColor: appColors.mainColor,
    dotColor: appColors.pureWhite,
  };
  return eventDays;
}

export function CalendarEventsScreen() {
  const [selected, setSelected] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [activeCategory, setActiveCategory] = useState('Art');

  const flatListRef = useRef<FlatList>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show button after scrolling down 300px
  const handleScroll = (event: any) => {
    setShowScrollTop(event.nativeEvent.contentOffset.y > 300);
  };

  // Filter events by selected day and category
  const filteredEvents = mockEvents.filter(
    e => e.date === selected && e.category === activeCategory,
  );

  // Generate eventDays for the calendar
  const eventDays = getEventDays(mockEvents, selected, appColors);

  const renderEvent = ({item}: {item: (typeof mockEvents)[0]}) => (
    <View style={styles.eventCard}>
      <GilroyBoldText style={styles.eventTitle}>{item.title}</GilroyBoldText>
      <GilroyMediumText style={styles.eventMeta}>
        {item.location} • {item.time}
      </GilroyMediumText>
    </View>
  );

  const ListHeader = (
    <>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={selected}
          markedDates={eventDays}
          onDayPress={day => setSelected(day.dateString)}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: appColors.navyBlack,
            selectedDayBackgroundColor: appColors.mainColor,
            selectedDayTextColor: '#fff',
            todayTextColor: appColors.mainColor,
            dayTextColor: appColors.navyBlack,
            textDisabledColor: '#D3D3D3',
            dotColor: appColors.mainColor,
            selectedDotColor: '#fff',
            arrowColor: appColors.navyBlack,
            monthTextColor: appColors.navyBlack,
            textMonthFontFamily: 'Gilroy-Semibold',
            textMonthFontSize: 22,
            textDayFontFamily: 'Gilroy-Medium',
            textDayHeaderFontFamily: 'Gilroy-Semibold',
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
          hideExtraDays={false}
          firstDay={1}
        />
      </View>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <Pressable
            key={cat.label}
            onPress={() => setActiveCategory(cat.label)}
            style={[
              styles.categoryBtn,
              activeCategory === cat.label && styles.categoryBtnActive,
            ]}>
            <GilroyMediumText
              style={[
                styles.categoryText,
                activeCategory === cat.label && styles.categoryTextActive,
              ]}>
              {cat.label}
            </GilroyMediumText>
          </Pressable>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <GilroyBoldText
            style={{
              color: appColors.darkGrey,
              textAlign: 'center',
              marginTop: 32,
            }}>
            No events for this day and category.
          </GilroyBoldText>
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {showScrollTop && (
        <Pressable
          style={styles.scrollTopBtn}
          onPress={() =>
            flatListRef.current?.scrollToOffset({offset: 0, animated: true})
          }>
          <GilroyBoldText style={{color: '#fff', fontSize: 18}}>
            ↑
          </GilroyBoldText>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F7F7F7',
    marginRight: 8,
  },
  categoryBtnActive: {
    backgroundColor: '#FFC107',
    shadowColor: '#FFC107',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  categoryText: {
    color: appColors.navyBlack,
    fontSize: 15,
    fontFamily: 'Gilroy-Medium',
  },
  categoryTextActive: {
    color: '#fff',
    fontFamily: 'Gilroy-Bold',
  },
  eventCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#FFC107',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  eventTitle: {
    fontSize: 16,
    color: appColors.navyBlack,
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 14,
    color: appColors.darkGrey,
  },
  scrollTopBtn: {
    position: 'absolute',
    right: 24,
    bottom: 40,
    backgroundColor: appColors.mainColor,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
});
