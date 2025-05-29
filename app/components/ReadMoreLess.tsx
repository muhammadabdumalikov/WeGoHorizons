import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

const ReadMoreLess = ({text, numberOfLines = 3}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? collapsedHeight : fullHeight,
      duration: 300,
      useNativeDriver: false, // Height animation requires layout updates
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* Measure full height */}
      <Text
        style={[styles.text, styles.hiddenText]}
        onLayout={event => setFullHeight(event.nativeEvent.layout.height)}>
        {text}
      </Text>

      {/* Measure collapsed height */}
      <Text
        style={[styles.text, styles.hiddenText]}
        numberOfLines={numberOfLines}
        onLayout={event => setCollapsedHeight(event.nativeEvent.layout.height)}>
        {text}
      </Text>

      {/* Animated View */}
      <Animated.View style={{height: animatedHeight, overflow: 'hidden'}}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>

      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.buttonText}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3A544F',
    letterSpacing: 0.5,
    fontFamily: 'Quicksand-Bold',
  },
  hiddenText: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
  buttonText: {
    marginTop: 8,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default ReadMoreLess;
