import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import {ChallengePush} from '../interfaces/challenge';
import { useState } from "react";
import { createChallenge } from "../fetch/challenges";

export default function CreateChallengeScreen() {
  const router = useRouter();
  const [challenge, setChallenge] = useState<ChallengePush>({
    title: "",
    description: "",
    due_date: new Date(),
    location: "",
    restriction: "",
    repetition: "",
    repetition_frequency: 0,
    check_in_time: "",
    is_private: false,
    time_window: 0,
    background_photo: [],
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateChallenge = (field: keyof ChallengePush, value: any) => {
    setChallenge(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to pick image from camera roll
  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to select a photo.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Good aspect ratio for challenge covers
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      // Update the challenge state with the selected image
      updateChallenge('background_photo', [imageUri]);
    }
  };

  // Helper function to format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  // Helper function to get visibility text
  const getVisibilityText = () => {
    return challenge.is_private ? "Private" : "Everyone";
  };

  // Helper function to get repetition text
  const getRepetitionText = () => {
    if (!challenge.repetition) return "Does not repeat";
    return challenge.repetition_frequency > 0 
      ? `${challenge.repetition} (${challenge.repetition_frequency}x)` 
      : challenge.repetition;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.titleInput}
          placeholder="Challenge Title"
          placeholderTextColor="#777"
          value={challenge.title}
          onChangeText={(text) => updateChallenge('title', text)}
        />

        <View style={styles.row}>
          <View style={styles.dateTimeField}>
            <Text style={styles.sectionTitle}>Due Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              placeholderTextColor="#777"
              value={formatDate(challenge.due_date)}
              onChangeText={(text) => {
                // You might want to implement proper date parsing here
                // For now, this is a placeholder
                const date = new Date(text);
                if (!isNaN(date.getTime())) {
                  updateChallenge('due_date', date);
                }
              }}
            />
          </View>
          <View style={styles.dateTimeField}>
            <Text style={styles.sectionTitle}>Check-In Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              placeholderTextColor="#777"
              value={challenge.check_in_time}
              onChangeText={(text) => updateChallenge('check_in_time', text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#777"
            value={challenge.location}
            onChangeText={(text) => updateChallenge('location', text)}
          />
          <Text style={styles.inputHint}>(Optional)</Text>
        </View>

        <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
          <View style={styles.plusIconContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <Ionicons name="add" size={48} color="#777" />
            )}
          </View>
          <Text style={styles.photoUploadText}>
            {selectedImage ? 'Tap to change photo' : 'Add a photo cover'}
          </Text>
        </TouchableOpacity> 

        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="What is your challenge about? Write it down here..."
            placeholderTextColor="#777"
            multiline
            value={challenge.description}
            onChangeText={(text) => updateChallenge('description', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Restrictions</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Any rules required to follow? Write it down here..."
            placeholderTextColor="#777"
            multiline
            value={challenge.restriction}
            onChangeText={(text) => updateChallenge('restriction', text)}
          />
          <Text style={styles.inputHint}>(Optional)</Text>
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // Handle recurrence selection - you might want to open a modal or navigate to a selection screen
            console.log('Open recurrence selector');
          }}
        >
          <Text style={styles.settingButtonText}>Recurrence</Text>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{getRepetitionText()}</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // Toggle visibility
            updateChallenge('is_private', !challenge.is_private);
          }}
        >
          <Text style={styles.settingButtonText}>Visibility</Text>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{getVisibilityText()}</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // Handle participation settings - you might want to navigate to another screen
            console.log('Open participation settings');
          }}
        >
          <Text style={styles.settingButtonText}>Participation Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#777" />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.publishButton}
        onPress={async () => {
          try {
            await createChallenge(challenge);
            router.back();
          } catch (error) {
            console.error('Error creating challenge:', error);
            // Handle error appropriately
          }
        }}
      >
        <LinearGradient
          colors={['#FFC166', '#FF9966']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.publishButtonText}>Publish My Challenge</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeField: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputHint: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoUploadText: {
    color: '#777',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    color: '#777',
    marginRight: 5,
  },
  publishButton: {
    margin: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})