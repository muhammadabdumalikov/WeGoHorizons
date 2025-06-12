/*
Tap right => move to next post from story
Tap right => if is last item from the story, moves to next story
Tap left => move to prev post from story
Tap left => if is first post from story, moves to previous story
Slide right => next story
Slide left => Prev story
Timings:
- Image => 2 seconds
- Video => video duration
!Image and Videos are from Pexels.com!
*/

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {appColors} from '../shared/constants';
import {CachedImage} from './CachedImage';
import {StoryViewer} from './StoryViewer';

interface Story {
  id: string;
  username: string;
  avatar: string;
  viewed: boolean;
}

interface StoriesProps {
  stories: Story[];
  onStoryPress: (storyId: string) => void;
}

const storyImages = [
  'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&w=400&h=700',
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&w=400&h=700',
  'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&w=400&h=700',
  // Add more URLs as needed
];

export function Stories({stories, onStoryPress}: StoriesProps) {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleStoryPress = (story: any, index: number) => {
    setSelectedStory({
      ...story,
      image: storyImages[index % storyImages.length],
    });
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  const handleCloseViewer = () => {
    setViewerVisible(false);
    setSelectedStory(null);
    setSelectedIndex(0);
  };

  const handleChangeStory = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < stories.length) {
      setSelectedStory({
        ...stories[newIndex],
        image: storyImages[newIndex % storyImages.length],
      });
      setSelectedIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {stories.map((story, idx) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyContainer}
            onPress={() => handleStoryPress(story, idx)}>
            <View
              style={[
                styles.storyRing,
                story.viewed ? styles.viewedRing : styles.unviewedRing,
              ]}>
              <CachedImage uri={story.avatar} style={styles.storyAvatar} />
            </View>
            <Text style={styles.username} numberOfLines={1}>
              {story.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StoryViewer
        visible={viewerVisible}
        story={selectedStory}
        onClose={handleCloseViewer}
        stories={stories}
        selectedIndex={selectedIndex}
        onChangeStory={handleChangeStory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 72,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    marginBottom: 4,
  },
  unviewedRing: {
    borderWidth: 2,
    borderColor: appColors.mainColor,
  },
  viewedRing: {
    borderWidth: 2,
    borderColor: '#DBDBDB',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontSize: 12,
    color: appColors.navyBlack,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
  },
});
