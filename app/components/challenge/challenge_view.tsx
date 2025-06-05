import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Post from "../index_home/post"
import LeaderboardScreen from './leaderboard';
import DetailsScreen from './details';
// import ChallengeCard from './challengecard'; // Not used
import { UserPostData, PostData } from '../../interfaces/post'; // Import PostData

const TABS = ['Detail', 'Post', 'Ranking'];
const { width, height } = Dimensions.get('window');

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

// Helper to format Supabase URLs - assuming this might be needed for post media
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
  // Return a generic placeholder for posts if no image or different handling
  return 'https://via.placeholder.com/300'; // Generic placeholder for post images
};

// Placeholder for fetching user details - this would typically involve an API call
// and return an object like { username: string, profile_pic: string[] | null }
async function fetchUserDetails(userId: string): Promise<{ username: string; profile_pic: string[] | null }> {
  // In a real app, you'd fetch from your backend:
  // const response = await fetch(`https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/users/${userId}`);
  // const userData = await response.json();
  // return { username: userData.username, profile_pic: userData.avatar_url };
  
  // For now, returning mock data or a default
  console.warn(`fetchUserDetails for ${userId} is using mock data.`);
  return { username: `User_${userId.substring(0, 5)}`, profile_pic: null }; // Mocked
}

// Placeholder for calculating elapsed time
function calculateElapsedTime(createdAt: string): string {
  // Implement actual time calculation, e.g., "2h ago", "1 day ago"
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

// Gallery Item Component for the 3-column view
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
          
          // Transform API posts to UserPostData
          const transformedPosts = await Promise.all(apiPosts.map(async (apiPost) => {
            const userDetails = await fetchUserDetails(apiPost.user_id);
            const postPhotoUrl = apiPost.media_urls && apiPost.media_urls.length > 0 
              ? formatImageUrl(apiPost.media_urls as string[], 'post') // Assuming media_urls fits string[]
              : formatImageUrl(null, 'post'); // Default/placeholder if no media

            return {
              id: apiPost.id,
              username: userDetails.username,
              profile_pic: formatImageUrl(userDetails.profile_pic, 'avatar', userDetails.username),
              elapsed_post_time: calculateElapsedTime(apiPost.created_at),
              challenge: apiPost.challenge_id, // Or fetch challenge title if needed
              post_photo: postPhotoUrl,
              description: apiPost.content,
              // API response has endorsement_info.endorsement_count
              // For simplicity, using endorsement_count as likes. Could be more complex.
              likes: Array(apiPost.endorsement_info?.endorsement_count || 0).fill('like'), 
              comments: 0, // Comments not in API response, defaulting to 0
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Detail':
        return (
          <>
            <DetailsScreen challenge={selectedChallenge || undefined} />
          </>
        );
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
                  // TODO: Implement navigation to a detailed post view or modal
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
        return (
          // LeaderboardScreen might need to be updated to accept challengeId if it needs to be specific
          <LeaderboardScreen />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        key={activeTab} 
      >
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // borderBottomColor: '#000', 
  },
  tabText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1, 
    left: '25%', 
    right: '25%',
    height: 3, 
    backgroundColor: '#000',
    borderRadius: 1.5, 
  },
  content: {
    flex: 1,
  },
  loadingContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300, 
  },
  postsContainer: { 
    flex: 1,
  },
  emptyTabContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300, 
  },
  emptyTabText: {
    fontSize: 16,
    color: '#999',
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
    marginTop: 10,
  },
  galleryContainer: {
    flex: 1,
    paddingHorizontal: 2,
  },
  galleryContentContainer: {
    // alignItems: 'flex-start',
  },
  galleryItemContainer: {
    flex: 1/3,
    aspectRatio: 1,
    margin: 2,
    backgroundColor: '#eee',
  },
  galleryItemImage: {
    width: '100%',
    height: '100%',
  },
});

export default ChallengeView;