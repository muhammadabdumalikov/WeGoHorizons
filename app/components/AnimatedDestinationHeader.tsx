import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolation,
} from 'react-native-reanimated';

const AnimatedDestinationHeader = () => {
  const scrollY = useSharedValue(0);
  const headerHeight = useHeaderHeight();

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      console.log(scrollY.value);

      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolate(
        scrollY.value,
        [0, 100], // Adjust the scroll range for the transition
        ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'], // From transparent to white
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[styles.header, headerStyle, {marginTop: headerHeight}]}>
        <Text style={styles.headerText}>Animated Header</Text>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Scroll down to see the header background change.
          </Text>
          {[...Array(20)].map((_, i) => (
            <Text key={i} style={styles.text}>
              Item {i + 1}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 60, // Offset for the header
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AnimatedDestinationHeader;
