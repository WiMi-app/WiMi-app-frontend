import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import PostCard from '../components/PostCard';

// Mock user data
const USER = {
  id: 'currentUser',
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  cover: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  bio: 'Photography enthusiast | Travel lover | Coffee addict',
  friends: 274,
  photos: 129,
  location: 'San Francisco, CA',
};

// Mock user posts
const USER_POSTS = [
  {
    id: '1',
    user: {
      id: 'currentUser',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    content: 'Amazing view from my hike today! 🏔️',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 52,
    comments: 11,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    user: {
      id: 'currentUser',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    content: 'Coffee date with my bestie! ☕',
    image: 'https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 38,
    comments: 7,
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    user: {
      id: 'currentUser',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    content: 'Just finished this book. Absolutely loved it!',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 24,
    comments: 5,
    timestamp: '2 days ago',
  },
];

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // For demo purposes, just navigate to Login
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Cover Photo */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: USER.cover }}
            style={styles.coverPhoto}
          />
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: USER.avatar }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.bio}>{USER.bio}</Text>
          <Text style={styles.location}>{USER.location}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{USER.friends}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{USER.photos}</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Posts Section */}
        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {USER_POSTS.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -40,
    padding: 15,
  },
  avatarContainer: {
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#F0F2F5',
    overflow: 'hidden',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#65676B',
    textAlign: 'center',
    marginVertical: 10,
  },
  location: {
    fontSize: 14,
    color: '#65676B',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '80%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#65676B',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#7B5DF0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#E4E6EB',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#050505',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postsContainer: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
});

export default ProfileScreen; 