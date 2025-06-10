import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal, Platform } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import {ChallengePush} from '../interfaces/challenge';
import { useState } from "react";
import { createChallenge, uploadChallengePhoto } from "../fetch/challenges";

// Recurrence options
const RECURRENCE_OPTIONS = [
  { label: "Does not repeat", value: "" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Custom", value: "custom" },
];

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
  
  // Modal states
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showCheckInTimePicker, setShowCheckInTimePicker] = useState(false);
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  
  // Duration state
  const [duration, setDuration] = useState({ days: 0, hours: 0, minutes: 0 });
  
  // Temporary date/time states for pickers
  const [tempDueDate, setTempDueDate] = useState(new Date());
  const [tempCheckInTime, setTempCheckInTime] = useState(new Date());

  const updateChallenge = (field: keyof ChallengePush, value: any) => {
    setChallenge(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to pick image from camera roll
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to select a photo.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
      base64: true, 
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0];
      setSelectedImage(imageUri.uri);
      updateChallenge('background_photo', [imageUri.base64]);
    }
  };

  // Helper function to format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper function to format time for display
  const formatTime = (timeString: string | Date) => {
    if (!timeString) return "";
    const date = typeof timeString === 'string' ? new Date(timeString) : timeString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper function to get visibility text
  const getVisibilityText = () => {
    return challenge.is_private ? "Private" : "Public";
  };

  // Helper function to get repetition text
  const getRepetitionText = () => {
    if (!challenge.repetition) return "Does not repeat";
    const option = RECURRENCE_OPTIONS.find(opt => opt.value === challenge.repetition);
    return option ? option.label : challenge.repetition;
  };

  // Helper function to format duration
  const formatDuration = () => {
    const parts = [];
    if (duration.days > 0) parts.push(`${duration.days}d`);
    if (duration.hours > 0) parts.push(`${duration.hours}h`);
    if (duration.minutes > 0) parts.push(`${duration.minutes}m`);
    return parts.length > 0 ? parts.join(' ') : "Not set";
  };

  // Convert duration to total minutes for time_window
  const getDurationInMinutes = () => {
    return duration.days * 24 * 60 + duration.hours * 60 + duration.minutes;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDueDatePicker(false);
    }
    if (selectedDate) {
      setTempDueDate(selectedDate);
      if (Platform.OS === 'ios') {
        updateChallenge('due_date', selectedDate);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowCheckInTimePicker(false);
    }
    if (selectedTime) {
      setTempCheckInTime(selectedTime);
      if (Platform.OS === 'ios') {
        // Format time as HH:MM:SS.sssZ to match your required format
        const timeString = selectedTime.toTimeString().split(' ')[0] + '.000Z';
        updateChallenge('check_in_time', timeString);
      }
    }
  };

  const confirmDateSelection = () => {
    updateChallenge('due_date', tempDueDate);
    setShowDueDatePicker(false);
  };

  const confirmTimeSelection = () => {
    // Format time as HH:MM:SS.sssZ to match your required format
    const timeString = tempCheckInTime.toTimeString().split(' ')[0] + '.000Z';
    updateChallenge('check_in_time', timeString);
    setShowCheckInTimePicker(false);
  };

  // Validation function to ensure all required fields are filled
  const validateChallenge = () => {
    const requiredFields = {
      title: challenge.title.trim(),
      description: challenge.description.trim(),
      due_date: challenge.due_date,
      check_in_time: challenge.check_in_time,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please fill in the following required fields: ${missingFields.join(', ')}`
      );
      return false;
    }

    return true;
  };

  async function publishChallenge() {
    // Validate required fields first
    if (!validateChallenge()) {
      return;
    }

    try {
      const photoURL = await uploadChallengePhoto(challenge.background_photo);
      const mediaUrls = photoURL.map((item: any[]) => item[1]);

      // Ensure due_date is in ISO string format
      const formattedDueDate = challenge.due_date instanceof Date 
        ? challenge.due_date.toISOString() 
        : challenge.due_date;

      // Rebuild the challenge object with proper formatting to match your required structure
      const updatedChallenge = {
        title: challenge.title.trim(),
        description: challenge.description.trim(),
        due_date: formattedDueDate,
        location: challenge.location.trim() || "", // Ensure it's a string even if empty
        restriction: challenge.restriction.trim() || "", // Ensure it's a string even if empty
        repetition: challenge.repetition || "", // Default to empty string if not set
        repetition_frequency: challenge.repetition_frequency || 0,
        check_in_time: challenge.check_in_time || "07:00:00.000Z", // Default time if not set
        is_private: challenge.is_private,
        time_window: getDurationInMinutes() || 120, // Default to 120 minutes if not set
        background_photo: mediaUrls.length > 0 ? mediaUrls : ["iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="], // Default placeholder if no photo
      };

      console.log('Challenge data to be sent:', updatedChallenge);

      const data = await createChallenge(updatedChallenge);
      console.log('Challenge created successfully:', data);

      router.back();

    } catch (error) {
      console.error('Error creating challenge:', error);
      Alert.alert('Error', 'Failed to create challenge. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Challenge</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.section}>
          <TextInput
            style={styles.titleInput}
            placeholder="What's your challenge?"
            placeholderTextColor="#9ca3af"
            value={challenge.title}
            onChangeText={(text) => updateChallenge('title', text)}
            maxLength={100}
          />
        </View>

        {/* Date and Time Row */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>Due Date *</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => {
                  setTempDueDate(challenge.due_date);
                  setShowDueDatePicker(true);
                }}
              >
                <Text style={styles.dateTimeText}>{formatDate(challenge.due_date)}</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#6366f1" />
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>Check-In Time *</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => {
                  setTempCheckInTime(challenge.check_in_time ? new Date(`2000-01-01T${challenge.check_in_time}`) : new Date());
                  setShowCheckInTimePicker(true);
                }}
              >
                <Text style={styles.dateTimeText}>
                  {challenge.check_in_time ? formatTime(`2000-01-01T${challenge.check_in_time}`) : "Set time"}
                </Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="time-outline" size={20} color="#6366f1" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Photo Upload */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Cover Photo</Text>
          <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
            <View style={styles.photoContainer}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="camera" size={32} color="#6366f1" />
                  <Text style={styles.photoPlaceholderText}>Add cover photo</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Location <Text style={styles.optional}>(Optional)</Text></Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Where will this challenge take place?"
              placeholderTextColor="#9ca3af"
              value={challenge.location}
              onChangeText={(text) => updateChallenge('location', text)}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Description *</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your challenge in detail. What are the goals? What should participants expect?"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              value={challenge.description}
              onChangeText={(text) => updateChallenge('description', text)}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Restrictions */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Rules & Restrictions <Text style={styles.optional}>(Optional)</Text></Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Any specific rules or restrictions participants should follow?"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              value={challenge.restriction}
              onChangeText={(text) => updateChallenge('restriction', text)}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Settings</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowRecurrenceModal(true)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="repeat-outline" size={20} color="#6366f1" />
              </View>
              <Text style={styles.settingLabel}>Recurrence</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{getRepetitionText()}</Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowDurationModal(true)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#6366f1" />
              </View>
              <Text style={styles.settingLabel}>Duration</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{formatDuration()}</Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => updateChallenge('is_private', !challenge.is_private)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Ionicons name={challenge.is_private ? "lock-closed-outline" : "globe-outline"} size={20} color="#6366f1" />
              </View>
              <Text style={styles.settingLabel}>Visibility</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{getVisibilityText()}</Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Publish Button */}
      <View style={styles.publishContainer}>
        <TouchableOpacity 
          style={styles.publishButton}
          onPress={publishChallenge}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.publishButtonText}>Create Challenge</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDueDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDueDatePicker}
          onRequestClose={() => setShowDueDatePicker(false)}
        >
          <View style={styles.pickerModalOverlay}>
            <View style={styles.pickerModalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowDueDatePicker(false)}>
                  <Text style={styles.pickerCancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Due Date</Text>
                <TouchableOpacity onPress={confirmDateSelection}>
                  <Text style={styles.pickerConfirm}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDueDate}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Time Picker Modal */}
      {showCheckInTimePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showCheckInTimePicker}
          onRequestClose={() => setShowCheckInTimePicker(false)}
        >
          <View style={styles.pickerModalOverlay}>
            <View style={styles.pickerModalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowCheckInTimePicker(false)}>
                  <Text style={styles.pickerCancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Check-in Time</Text>
                <TouchableOpacity onPress={confirmTimeSelection}>
                  <Text style={styles.pickerConfirm}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempCheckInTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Recurrence Selection Modal */}
      <Modal
        visible={showRecurrenceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRecurrenceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Recurrence</Text>
              <TouchableOpacity onPress={() => setShowRecurrenceModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsContainer}>
              {RECURRENCE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    challenge.repetition === option.value && styles.selectedOptionItem
                  ]}
                  onPress={() => {
                    updateChallenge('repetition', option.value);
                    setShowRecurrenceModal(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    challenge.repetition === option.value && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                  {challenge.repetition === option.value && (
                    <Ionicons name="checkmark" size={20} color="#6366f1" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Duration Selection Modal */}
      <Modal
        visible={showDurationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDurationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Duration</Text>
              <TouchableOpacity onPress={() => setShowDurationModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.durationContainer}>
              <View style={styles.durationField}>
                <Text style={styles.durationLabel}>Days</Text>
                <View style={styles.durationInputContainer}>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, days: Math.max(0, prev.days - 1) }))}
                  >
                    <Ionicons name="remove" size={20} color="#6366f1" />
                  </TouchableOpacity>
                  <Text style={styles.durationValue}>{duration.days}</Text>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, days: prev.days + 1 }))}
                  >
                    <Ionicons name="add" size={20} color="#6366f1" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.durationField}>
                <Text style={styles.durationLabel}>Hours</Text>
                <View style={styles.durationInputContainer}>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, hours: Math.max(0, prev.hours - 1) }))}
                  >
                    <Ionicons name="remove" size={20} color="#6366f1" />
                  </TouchableOpacity>
                  <Text style={styles.durationValue}>{duration.hours}</Text>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, hours: Math.min(23, prev.hours + 1) }))}
                  >
                    <Ionicons name="add" size={20} color="#6366f1" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.durationField}>
                <Text style={styles.durationLabel}>Minutes</Text>
                <View style={styles.durationInputContainer}>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, minutes: Math.max(0, prev.minutes - 5) }))}
                  >
                    <Ionicons name="remove" size={20} color="#6366f1" />
                  </TouchableOpacity>
                  <Text style={styles.durationValue}>{duration.minutes}</Text>
                  <TouchableOpacity 
                    style={styles.durationButton}
                    onPress={() => setDuration(prev => ({ ...prev, minutes: Math.min(59, prev.minutes + 5) }))}
                  >
                    <Ionicons name="add" size={20} color="#6366f1" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => {
                updateChallenge('time_window', getDurationInMinutes());
                setShowDurationModal(false);
              }}
            >
              <Text style={styles.confirmButtonText}>Set Duration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginTop: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  optional: {
    fontWeight: '400',
    color: '#9ca3af',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeField: {
    flex: 1,
  },
  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 16,
  },
  textAreaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  textArea: {
    fontSize: 16,
    color: '#1f2937',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  photoUpload: {
    marginTop: 8,
  },
  photoContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  publishContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  publishButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  pickerCancel: {
    fontSize: 16,
    color: '#6b7280',
  },
  pickerConfirm: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  datePicker: {
    backgroundColor: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  optionsContainer: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  selectedOptionItem: {
    backgroundColor: '#f0f0ff',
  },
  optionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectedOptionText: {
    color: '#6366f1',
    fontWeight: '500',
  },
  durationContainer: {
    paddingVertical: 20,
  },
  durationField: {
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  durationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  durationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  durationValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    minWidth: 50,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})