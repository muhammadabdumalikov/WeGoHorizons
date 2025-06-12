import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import {appColors} from '../shared/constants';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from '@d11/react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

// Custom skeleton loader for story
const StorySkeleton = ({onClose}: {onClose: () => void}) => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonImage} />
    <TouchableOpacity style={styles.skeletonCloseButton} onPress={onClose}>
      <AntDesign name="close" size={26} color="#fff" />
    </TouchableOpacity>
    <View style={styles.skeletonDetailsContainer}>
      <View style={styles.skeletonLocation} />
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonRow}>
        <View style={styles.skeletonRating} />
        <View style={styles.skeletonDetailText} />
      </View>
      <View style={styles.skeletonDiscoverMore} />
    </View>
  </View>
);

interface StoryViewerProps {
  visible: boolean;
  story: any; // Replace 'any' with your story type
  onClose: () => void;
  stories: any[];
  selectedIndex: number;
  onChangeStory: (newIndex: number) => void;
  onOrganizerPress?: (organizer: any) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  visible,
  story,
  onClose,
  stories,
  selectedIndex,
  onChangeStory,
  onOrganizerPress,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [story?.image]);

  if (!story) return null;

  const handleNext = () => {
    if (selectedIndex < stories.length - 1) {
      onChangeStory(selectedIndex + 1);
    } // else do nothing
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      onChangeStory(selectedIndex - 1);
    } // else do nothing
  };

  const handleOrganizerPress = () => {
    if (onOrganizerPress && story.organizer) {
      onOrganizerPress(story.organizer);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={{flex: 1, width: '100%'}}>
          {/* Custom Skeleton while loading */}
          {loading && <StorySkeleton onClose={onClose} />}
          <FastImage
            source={{uri: story.image}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            onLoadEnd={() => setLoading(false)}
          />
          {/* Organizer profile image and name (top left, horizontal row) */}
          {story.organizer?.avatar && (
            <TouchableOpacity
              style={styles.organizerRow}
              onPress={handleOrganizerPress}
              activeOpacity={0.8}>
              <FastImage
                source={{uri: story.organizer.avatar}}
                style={styles.organizerAvatar}
                resizeMode={FastImage.resizeMode.cover}
              />
              {story.organizer?.name && (
                <Text style={styles.organizerName}>{story.organizer.name}</Text>
              )}
            </TouchableOpacity>
          )}
          {/* Tap areas for prev/next */}
          <Pressable style={styles.leftArea} onPress={handlePrev} />
          <Pressable style={styles.rightArea} onPress={handleNext} />
          {/* Overlay: Back button */}
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <AntDesign name="close" size={26} color="#fff" />
          </TouchableOpacity>
          {/* Overlay: Details (bottom) */}
          <View style={styles.detailsContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.9)']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={StyleSheet.absoluteFill}
            />
            <View style={{position: 'relative'}}>
              <Text style={styles.location}>Hanoi, Vietnam</Text>
              <Text style={styles.title}>Tranquill Book and Coffee</Text>
              <View style={styles.row}>
                <View style={styles.ratingBox}>
                  <Text style={styles.ratingText}>4.5</Text>
                  <Feather name="star" size={14} color="#fff" />
                </View>
                <Text style={styles.detailText}>Coffee Shop · Cosy</Text>
              </View>
              <TouchableOpacity style={styles.discoverMore}>
                <Text style={styles.discoverText}>Discover more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const skeletonColor = '#333';
const skeletonHighlight = '#444';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  // Skeleton styles
  skeletonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: skeletonColor,
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  skeletonImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: skeletonColor,
    opacity: 0.8,
  },
  skeletonCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
    zIndex: 11,
  },
  skeletonDetailsContainer: {
    width: '100%',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  skeletonLocation: {
    width: 120,
    height: 18,
    backgroundColor: skeletonHighlight,
    borderRadius: 6,
    marginBottom: 8,
  },
  skeletonTitle: {
    width: 220,
    height: 32,
    backgroundColor: skeletonHighlight,
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  skeletonRating: {
    width: 48,
    height: 22,
    backgroundColor: skeletonHighlight,
    borderRadius: 8,
    marginRight: 12,
  },
  skeletonDetailText: {
    width: 100,
    height: 18,
    backgroundColor: skeletonHighlight,
    borderRadius: 6,
  },
  skeletonDiscoverMore: {
    width: 120,
    height: 24,
    backgroundColor: skeletonHighlight,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: 'center',
  },
  leftArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width / 3,
    height: height,
    zIndex: 2,
  },
  rightArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width / 3,
    height: height,
    zIndex: 2,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
    zIndex: 3,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
  },
  location: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingBox: {
    backgroundColor: appColors.mainColor,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
  },
  discoverMore: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  discoverText: {
    color: '#fff',
    fontSize: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  organizerRow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 24,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 10,
  },
  organizerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  organizerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});
