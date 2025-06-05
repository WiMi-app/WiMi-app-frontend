import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import LeaderboardScreen from './leaderboard';
import DetailsScreen from './details';
import { UserPostData, PostData } from '../../interfaces/post';

const TABS = ['Detail', 'Post', 'Ranking'];

interface Challenge {
  id: string;
  title: string;
  description: string;
  due_date: string;
  location: string;
  restriction: string;
  repetition: string;
  repetition_frequency: number | null;
  repetition_days: string[] | null;
  check_in_time: string | null;
  is_private: boolean;
  time_window: number | null;
  background_photo: string[] | null;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

interface ChallengeViewProps {
  selectedChallenge?: Challenge | null;
}

// Helper to format Supabase URLs
const formatImageUrl = (urlParts: string[] | null, defaultType: 'avatar' | 'background' | 'post' = 'post', username?: string) => {
  if (urlParts && urlParts.length === 2) {
    const [bucketName, fileName] = urlParts;
    if (bucketName && fileName) {
      return `https://vnxbcytjkzpmcdjkmkba.supabase.co/storage/v1/object/public/${bucketName}//${fileName}`;
    }
  }
  if (defaultType === 'avatar' && username) {
    return `https://ui-avatars.com/api/?name=${username}&background=random`;
  }
  return 'https://via.placeholder.com/300';
};

// Placeholder for fetching user details
async function fetchUserDetails(userId: string): Promise<{ username: string; profile_pic: string[] | null }> {
  console.warn(`fetchUserDetails for ${userId} is using mock data.`);
  return { username: `User_${userId.substring(0, 5)}`, profile_pic: null }; // Mocked
}

// Placeholder for calculating elapsed time
function calculateElapsedTime(createdAt: string): string {
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  if (diffSecs < 60) return `${diffSecs}s ago`;
  const diffMins = Math.round(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

interface GalleryItemProps {
  item: UserPostData;
  onPress: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.galleryItemContainer}>
    <Image source={{ uri: item.post_photo }} style={styles.galleryItemImage} resizeMode="cover" />
  </TouchableOpacity>
);

const ChallengeView = ({ selectedChallenge }: ChallengeViewProps) => {
  const [activeTab, setActiveTab] = useState('Detail');
  const [currentPosts, setCurrentPosts] = useState<UserPostData[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    const fetchAndTransformPosts = async () => {
      if (!selectedChallenge?.id) {
        setCurrentPosts([]);
        return;
      }
      setPostsLoading(true);
      try {
        const response = await fetch(
          `https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/challenges/${selectedChallenge.id}/posts`
        );
        if (!response.ok) {
          console.error("Failed to fetch posts, status:", response.status);
          setCurrentPosts([]);
        } else {
          const apiPosts: PostData[] = await response.json();
          const transformedPosts = await Promise.all(apiPosts.map(async (apiPost) => {
            const userDetails = await fetchUserDetails(apiPost.user_id);
            const postPhotoUrl = apiPost.media_urls && apiPost.media_urls.length > 0
              ? formatImageUrl(apiPost.media_urls as string[], 'post')
              : formatImageUrl(null, 'post');

            return {
              id: apiPost.id,
              username: userDetails.username,
              profile_pic: formatImageUrl(userDetails.profile_pic, 'avatar', userDetails.username),
              elapsed_post_time: calculateElapsedTime(apiPost.created_at),
              challenge: apiPost.challenge_id,
              post_photo: postPhotoUrl,
              description: apiPost.content,
              likes: Array(apiPost.endorsement_info?.endorsement_count || 0).fill('like'),
              comments: 0,
            };
          }));
          setCurrentPosts(transformedPosts);
        }
      } catch (error) {
        console.error("Failed to fetch or transform posts:", error);
        setCurrentPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    if (activeTab === 'Post') {
      fetchAndTransformPosts();
    }
  }, [selectedChallenge, activeTab]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Detail':
        return <DetailsScreen challenge={selectedChallenge || undefined} />;
      case 'Post':
        if (postsLoading) {
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          );
        }
        if (currentPosts.length === 0) {
          return (
            <View style={styles.emptyTabContent}>
              <Text style={styles.emptyTabText}>No posts yet for this challenge.</Text>
            </View>
          );
        }
        return (
          <FlatList
            data={currentPosts}
            renderItem={({ item }) => (
              <GalleryItem
                item={item}
                onPress={() => {
                  console.log("Gallery item pressed:", item.id);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            style={styles.galleryContainer}
            contentContainerStyle={styles.galleryContentContainer}
          />
        );
      case 'Ranking':
        return <LeaderboardScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
  },
  tab: {
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTabText: {
    fontSize: 16,
    color: 'gray',
  },
  galleryContainer: {
    flex: 1,
  },
  galleryContentContainer: {},
  galleryItemContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },
  galleryItemImage: {
    width: '100%',
    height: '100%',
  },
});

export default ChallengeView;