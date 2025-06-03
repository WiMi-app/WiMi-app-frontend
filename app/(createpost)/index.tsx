import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Color, FontFamily, Border } from '../(tabs)/GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'

export default function CreatePostScreen() {
  const router = useRouter()
  const [caption, setCaption] = useState('')
  const [description, setDescription] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [newHashtag, setNewHashtag] = useState('')
  const [isAddingHashtag, setIsAddingHashtag] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)

  const challenges = [
    {
      id: '1',
      title: 'Positive 2025',
      subtitle: '21 Days Left'
    },
    {
      id: '2',
      title: 'Ice Bucket Challenge',
      subtitle: 'National Challenge'
    },
    {
      id: '3',
      title: '90Min Fitness',
      subtitle: 'Daily Challenge'
    }
  ]

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove))
  }

  const addHashtag = () => {
    if (!isAddingHashtag) {
      setIsAddingHashtag(true)
      return
    }
    
    if (newHashtag.trim()) {
      const tagToAdd = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`
      setHashtags([...hashtags, tagToAdd])
      setNewHashtag('')
    }
    setIsAddingHashtag(false)
  }

  const handleHashtagSubmit = () => {
    addHashtag()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Post</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoUpload}>
            <View style={styles.plusIconContainer}>
              <Ionicons name="add" size={40} color="#777" />
            </View>
            <Text style={styles.addPhotoText}>Add a photo</Text>
          </TouchableOpacity>
        </View>

        {/* Caption Section */}
        <TextInput
          style={styles.input}
          placeholder="Add Caption"
          value={caption}
          onChangeText={setCaption}
          placeholderTextColor="#777"
        />

        {/* Description Section */}
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Add Description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor="#777"
        />

        {/* Hashtags Section */}
        <View style={styles.hashtagsContainer}>
          <View style={styles.hashtagsWrapper}>
            {hashtags.map((tag, index) => (
              <View key={index} style={styles.hashtagPill}>
                <Text style={styles.hashtagText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeHashtag(tag)}>
                  <Ionicons name="close-circle" size={20} color="#777" />
                </TouchableOpacity>
              </View>
            ))}
            {isAddingHashtag ? (
              <View style={styles.hashtagPill}>
                <TextInput
                  style={styles.hashtagInput}
                  value={newHashtag}
                  onChangeText={setNewHashtag}
                  placeholder="Enter hashtag"
                  placeholderTextColor="#777"
                  autoFocus
                  onSubmitEditing={handleHashtagSubmit}
                  onBlur={() => {
                    if (!newHashtag.trim()) {
                      setIsAddingHashtag(false)
                    }
                  }}
                />
              </View>
            ) : (
              <TouchableOpacity style={styles.addHashtagButton} onPress={addHashtag}>
                <Ionicons name="add" size={20} color="#777" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Challenge Selection */}
        <Text style={styles.sectionTitle}>Select challenge</Text>
        <View style={styles.challengesContainer}>
          {challenges.map(challenge => (
            <TouchableOpacity
              key={challenge.id}
              style={[
                styles.challengeItem,
                selectedChallenge === challenge.id && styles.selectedChallenge
              ]}
              onPress={() => setSelectedChallenge(challenge.id)}
            >
              <View style={styles.challengeIcon} />
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeSubtitle}>{challenge.subtitle}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedChallenge === challenge.id && styles.radioButtonSelected
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Post Button */}
        <TouchableOpacity>
          <LinearGradient
            colors={['#FFC166', '#FF9966']}
            style={styles.postButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.postButtonText}>Post my challenge</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
    gap: 16,
  },
  addPhotoText: {
    color: '#777',
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  hashtagsContainer: {
    marginBottom: 24,
  },
  hashtagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  hashtagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hashtagText: {
    marginRight: 4,
  },
  addHashtagButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  challengesContainer: {
    gap: 12,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  selectedChallenge: {
    backgroundColor: '#ff9966',
  },
  challengeIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777',
  },
  radioButtonSelected: {
    borderColor: '#ffc166',
    backgroundColor: '#ffc166',
  },
  postButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hashtagInput: {
    minWidth: 100,
    fontSize: 14,
    color: '#000',
    padding: 0,
  },
  photoUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})

