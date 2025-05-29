import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../shared/constants';

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
  },
) {
  const {handleSearch, openBottomSheet} = props;
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (debouncedInput !== '') {
      handleSearch(debouncedInput);
    }
  }, [debouncedInput, handleSearch]);

  const handleFilterFocus = () => {
    if (openBottomSheet) {
      openBottomSheet();
    }
  };

  return (
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

      <TouchableOpacity onPress={handleFilterFocus} style={[styles.filterIcon]}>
        <MaterialCommunityIcons
          name="tune-variant"
          size={24}
          color={appColors.pureWhite}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: appColors.grey2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 15,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    overflow: 'hidden',
    marginBottom: 24,
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
  filterIcon: {
    marginHorizontal: 5,
    backgroundColor: appColors.navyBlack,
    padding: 5,
    borderRadius: 10,
  },
  searchIconFocused: {
    padding: 5,
    backgroundColor: appColors.purple,
    borderRadius: 10,
  },
});
