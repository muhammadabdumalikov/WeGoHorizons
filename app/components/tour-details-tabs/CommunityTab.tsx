import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {appColors} from '../../shared/constants';
import {Tour} from '../../types/tour';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CachedImage} from '../CachedImage';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CommunityTabProps {
  tour: Tour;
  t: (key: string) => string;
}

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  location?: string;
}

const CommunityTabFC: React.FC<CommunityTabProps> = ({tour: _tour, t}) => {
  // Mock community posts data
  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://picsum.photos/200/200?random=1',
        verified: true,
      },
      content: {
        type: 'image',
        url: 'https://picsum.photos/400/500?random=10',
      },
      caption:
        'Amazing experience at this beautiful location! The views were absolutely breathtaking. Highly recommend this tour! 🌟',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 8,
      location: 'Samarkand, Uzbekistan',
    },
    {
      id: '2',
      user: {
        name: 'Alex Chen',
        avatar: 'https://picsum.photos/200/200?random=2',
        verified: false,
      },
      content: {
        type: 'video',
        url: 'https://picsum.photos/400/600?random=11',
        thumbnail: 'https://picsum.photos/400/600?random=11',
      },
      caption: 'The sunset here is magical! Perfect ending to our tour day ✨',
      timestamp: '5 hours ago',
      likes: 89,
      comments: 12,
      location: 'Registan Square',
    },
    {
      id: '3',
      user: {
        name: 'Maria Rodriguez',
        avatar: 'https://picsum.photos/200/200?random=3',
        verified: true,
      },
      content: {
        type: 'image',
        url: 'https://picsum.photos/400/450?random=12',
      },
      caption:
        'Local cuisine is incredible! The flavors are so rich and authentic. Food lovers paradise! 🍽️',
      timestamp: '1 day ago',
      likes: 256,
      comments: 23,
      location: 'Tashkent, Uzbekistan',
    },
    {
      id: '4',
      user: {
        name: 'David Kim',
        avatar: 'https://picsum.photos/200/200?random=4',
        verified: false,
      },
      content: {
        type: 'image',
        url: 'https://picsum.photos/400/550?random=13',
      },
      caption:
        'The architecture is mind-blowing! Every detail tells a story. History comes alive here 🏛️',
      timestamp: '2 days ago',
      likes: 167,
      comments: 15,
      location: 'Bibi-Khanym Mosque',
    },
    {
      id: '5',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://picsum.photos/200/200?random=5',
        verified: true,
      },
      content: {
        type: 'video',
        url: 'https://picsum.photos/400/500?random=14',
        thumbnail: 'https://picsum.photos/400/500?random=14',
      },
      caption:
        'Traditional music performance was absolutely enchanting! The culture here is so vibrant 🎵',
      timestamp: '3 days ago',
      likes: 198,
      comments: 31,
      location: 'Bukhara, Uzbekistan',
    },
    {
      id: '6',
      user: {
        name: 'James Thompson',
        avatar: 'https://picsum.photos/200/200?random=6',
        verified: false,
      },
      content: {
        type: 'image',
        url: 'https://picsum.photos/400/480?random=15',
      },
      caption:
        'Silk Road vibes! Walking through these ancient streets feels like stepping back in time 🐪',
      timestamp: '4 days ago',
      likes: 145,
      comments: 19,
      location: 'Khiva, Uzbekistan',
    },
  ];

  const renderPost = (post: CommunityPost) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <CachedImage uri={post.user.avatar} style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{post.user.name}</Text>
              {post.user.verified && (
                <FontAwesome
                  name="check-circle"
                  size={14}
                  color={appColors.mainColor}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <View style={styles.postMeta}>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
              {post.location && (
                <>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.location}>{post.location}</Text>
                </>
              )}
            </View>
          </View>
        </View>
        <Pressable style={styles.moreButton}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={appColors.darkGrey}
          />
        </Pressable>
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <CachedImage uri={post.content.url} style={styles.postImage} />
        {post.content.type === 'video' && (
          <View style={styles.videoOverlay}>
            <FontAwesome
              name="play-circle"
              size={48}
              color={appColors.pureWhite}
            />
          </View>
        )}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton}>
            <FontAwesome name="heart-o" size={24} color={appColors.darkGrey} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <FontAwesome
              name="comment-o"
              size={24}
              color={appColors.darkGrey}
            />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <FontAwesome name="share" size={24} color={appColors.darkGrey} />
          </Pressable>
        </View>
        <Pressable style={styles.actionButton}>
          <FontAwesome name="bookmark-o" size={24} color={appColors.darkGrey} />
        </Pressable>
      </View>

      {/* Post Stats */}
      <View style={styles.postStats}>
        <Text style={styles.likesCount}>
          {post.likes.toLocaleString()} likes
        </Text>
        <Text style={styles.commentsCount}>{post.comments} comments</Text>
      </View>

      {/* Post Caption */}
      <View style={styles.postCaption}>
        <Text style={styles.captionText}>
          <Text style={styles.userName}>{post.user.name}</Text> {post.caption}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Community Header */}
      <View style={styles.communityHeader}>
        <Text style={styles.communityTitle}>
          {t('tour.communityPhotosVideos')}
        </Text>
        <Text style={styles.communitySubtitle}>
          {t('tour.communitySubtitle')}
        </Text>
      </View>

      {/* Posts */}
      {mockPosts.map(renderPost)}
    </ScrollView>
  );
};

export const CommunityTab = React.memo(CommunityTabFC);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.pureWhite,
  },
  communityHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  communityTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: appColors.navyBlack,
    marginBottom: 4,
  },
  communitySubtitle: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  dotSeparator: {
    fontSize: 12,
    color: appColors.darkGrey,
    marginHorizontal: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: appColors.grey5,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginRight: 16,
  },
  postStats: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  likesCount: {
    fontSize: 14,
    fontFamily: 'Gilroy-Semibold',
    color: appColors.navyBlack,
    marginBottom: 2,
  },
  commentsCount: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
  },
  postCaption: {
    paddingHorizontal: 12,
  },
  captionText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: appColors.navyBlack,
    lineHeight: 20,
  },
  // Legacy styles for backward compatibility
  masonryContainer: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    paddingHorizontal: 4,
  },
  image: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: appColors.grey5,
  },
  contentWrapper: {
    padding: 16,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: appColors.darkGrey,
    textAlign: 'center',
    marginTop: 32,
  },
});
