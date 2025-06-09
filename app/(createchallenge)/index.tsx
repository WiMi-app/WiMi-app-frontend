import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
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
        />

        <View style={styles.row}>
          <View style={styles.dateTimeField}>
            <Text style={styles.sectionTitle}>Due Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              placeholderTextColor="#777"
            />
          </View>
          <View style={styles.dateTimeField}>
            <Text style={styles.sectionTitle}>Check-In Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#777"
          />
          <Text style={styles.inputHint}>(Optional)</Text>
        </View>

        <TouchableOpacity style={styles.photoUpload}>
          <View style={styles.plusIconContainer}>
            <Ionicons name="add" size={48} color="#777" />
          </View>
          <Text style={styles.photoUploadText}>Add a photo cover</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="What is your challenge about? Write it down here..."
            placeholderTextColor="#777"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Restrictions</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Any rules required to follow? Write it down here..."
            placeholderTextColor="#777"
            multiline
          />
          <Text style={styles.inputHint}>(Optional)</Text>
        </View>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Recurrence</Text>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>Does not repeat</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Visibility</Text>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>Everyone</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Participation Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#777" />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.publishButton}>
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
//   label: {
//     fontSize: 12,
//     color: '#777',
//     marginBottom: 4,
//   },
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
