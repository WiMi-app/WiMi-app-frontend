import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PostCard from '../components/PostCard';
import SemiCircleButton from '../components/SemiCircleButton';

// Mock data for posts
const INITIAL_POSTS = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Jane Doe',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    content: 'Just got a new puppy! 🐶',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 42,
    comments: 8,
    timestamp: '10 min ago',
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    content: 'Beautiful sunset today at the beach!',
    image: 'https://images.unsplash.com/photo-1566750687773-5e8d2dae1de7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 23,
    comments: 5,
    timestamp: '25 min ago',
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    },
    content: 'Just finished reading this amazing book. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 15,
    comments: 3,
    timestamp: '45 min ago',
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Sarah Parker',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    content: 'New recipe I tried today: homemade pasta! It was delicious!',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 36,
    comments: 12,
    timestamp: '1 hour ago',
  },
];

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WiMi</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/33.jpg' }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Draggable semi-circle button for challenge navigation */}
      <SemiCircleButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#DADDE1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B5DF0',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listContent: {
    paddingBottom: 60, // Add padding to account for the semi-circle button
  },
});

export default HomeScreen; 