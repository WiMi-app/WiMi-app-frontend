import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PostCreationScreen() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams();
  const [caption, setCaption] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!caption.trim()) {
      Alert.alert('Error', 'Please add a caption for your post');
      return;
    }

    setLoading(true);
    try {
      // Here you would implement the actual post creation logic
      console.log('Publishing post with:', {
        photoUri,
        caption,
        selectedChallenge,
        location,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Success', 'Your post has been published!', [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/challenges'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to publish post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={handlePublish} disabled={loading}>
          <Text style={[styles.publishText, loading && styles.disabledText]}>
            {loading ? 'Publishing...' : 'Publish'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {photoUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photoUri as string }} style={styles.previewImage} />
          </View>
        )}

        <View style={styles.inputSection}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#999"
            multiline
            value={caption}
            onChangeText={setCaption}
            maxLength={500}
          />
          <Text style={styles.characterCount}>{caption.length}/500</Text>
        </View>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <Ionicons name="trophy-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Add to Challenge</Text>
          </View>
          <View style={styles.optionRight}>
            <Text style={styles.optionValue}>
              {selectedChallenge || 'Select Challenge'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <Ionicons name="location-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Add Location</Text>
          </View>
          <View style={styles.optionRight}>
            <Text style={styles.optionValue}>
              {location || 'Add location'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <Ionicons name="people-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Tag People</Text>
          </View>
          <View style={styles.optionRight}>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Advanced Settings</Text>
          </View>
          <View style={styles.optionRight}>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish} disabled={loading}>
          <LinearGradient
            colors={['#FFC166', '#FF9966']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.publishButtonText}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  publishText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  disabledText: {
    color: '#999',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  captionInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#000',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  publishButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
