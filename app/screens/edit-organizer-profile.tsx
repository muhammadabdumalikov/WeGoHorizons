import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Button,
  Modal,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GilroySemiboldTextInput} from '../components/StyledText';
import BottomButton from '../components/BottomButton';
import {appColors} from '../shared/constants';
import {CustomHeader} from '../components/CustomHeader';

const {width} = Dimensions.get('screen');

const selectorWidth = (width - 32) / 2;

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

const EditOrganizerProfileScreen = () => {
  const [selectedGender, setSelectedGender] = useState('male'); // Initial gender
  const translateX = useSharedValue(0); // Animation value for the indicator
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePress = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    translateX.value = withTiming(gender === 'male' ? 0 : selectorWidth - 4); // Slide animation
  };

  // Animated style for the sliding indicator
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader title="Редактировать профиль" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1}}>
        <ScrollView
          style={{flex: 1, paddingTop: 16}}
          showsVerticalScrollIndicator={false}>
          {/* Form Fields */}
          {/* Full Name */}
          <GilroySemiboldTextInput
            style={[styles.input, {width: width - 32}]}
            placeholder="Аббос Хазратов"
          />

          {/* First Name */}
          <GilroySemiboldTextInput
            style={[styles.input, {width: width - 32}]}
            placeholder="Аббос"
          />

          {/* Date of Birth */}
          <View style={styles.inputWithIcon}>
            <GilroySemiboldTextInput
              style={[styles.input, styles.internalInput]}
              placeholder="15/03/1990"
              keyboardType="numeric"
              value={dayjs(date).format('DD/MM/YYYY')}
            />
            <Pressable onPress={toggleModal}>
              <Ionicons name="calendar-outline" size={24} color="black" />
            </Pressable>
          </View>

          {/* Email */}
          <View style={styles.inputWithIcon}>
            <GilroySemiboldTextInput
              style={[styles.input, styles.internalInput]}
              placeholder="abboskhazratov11@gmail.com"
              keyboardType="email-address"
            />
            <Ionicons name="mail-outline" size={24} color="black" />
          </View>

          {/* Location */}
          <View style={styles.inputWithIcon}>
            <GilroySemiboldTextInput
              style={[styles.input, styles.internalInput]}
              placeholder="Ташкент"
            />
            <Ionicons name="chevron-down-outline" size={24} color="black" />
          </View>

          <View style={styles.genderBackgroundBox}>
            {/* Animated indicator */}
            <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
            {/* Gender options */}
            <Pressable
              onPress={() => handlePress('male')}
              style={styles.pressable}>
              <Text
                style={[
                  styles.text,
                  selectedGender === 'male' && styles.selectedText,
                ]}>
                Мужской
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress('female')}
              style={styles.pressable}>
              <Text
                style={[
                  styles.text,
                  selectedGender === 'female' && styles.selectedText,
                ]}>
                Женский
              </Text>
            </Pressable>
          </View>
          {/* Phone Number */}
          <View style={styles.inputWithFlag}>
            <Image
              style={styles.flag}
              source={{uri: 'https://flagcdn.com/w320/uz.png'}}
            />
            <GilroySemiboldTextInput
              style={styles.phoneInput}
              keyboardType="phone-pad"
              placeholder="+998 94 678 97 58"
            />
          </View>
        </ScrollView>
        <BottomButton text="Обновить" />
      </KeyboardAvoidingView>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={toggleModal} // This ensures the modal can be closed by hardware back button on Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              mode="single"
              date={date}
              onChange={params => {
                setDate(params.date as Date);
                toggleModal(); // Close the modal after selecting a date
              }}
            />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
    alignItems: 'center',
    // paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
  },
  internalInput: {
    marginBottom: 0,
  },
  inputWithIcon: {
    width: width - 32,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingRight: 16,
    marginBottom: 24,
  },
  inputWithFlag: {
    width: width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 24,
  },
  phoneInput: {
    width: '100%',
    fontSize: 16,
  },
  genderBackgroundBox: {
    flexDirection: 'row',
    width: selectorWidth * 2, // Two options (male, female)
    height: 48,
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 12,
    padding: 4,
    alignSelf: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 24,
  },
  pressable: {
    width: selectorWidth,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#000',
  },
  indicator: {
    position: 'absolute',
    width: selectorWidth - 4, // Indicator width slightly smaller for padding effect
    height: 40,
    top: 4,
    left: 4,
    backgroundColor: appColors.pureWhite, // White indicator color
    borderRadius: 8,
    elevation: 2, // Shadow effect
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default EditOrganizerProfileScreen;
