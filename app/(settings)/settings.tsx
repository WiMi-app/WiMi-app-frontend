"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

interface ProfileData {
  username: string
  full_name: string
  bio: string
  avatar_url?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    full_name: "",
    bio: "",
    avatar_url: undefined,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  useEffect(() => {
    // Request permissions for image picker
    requestPermissions()
    // Load existing profile data
    loadProfile()
  }, [])

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission Required", "Sorry, we need camera roll permissions to upload images.")
    }
  }

  const loadProfile = async () => {
    // Simulate loading profile data
    // In a real app, this would fetch from your backend/database
    try {
      // Mock data - replace with actual API call
      const mockProfile = {
        username: "johndoe",
        full_name: "John Doe",
        bio: "Software developer passionate about mobile apps",
        avatar_url: null,
      }
      setProfile(mockProfile)
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setAvatarUri(imageUri)
        await uploadImage(imageUri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image")
      console.error("Image picker error:", error)
    }
  }

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true)

      // Create form data for upload
      const formData = new FormData()
      const filename = uri.split("/").pop() || "image.jpg"
      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : "image/jpeg"

      formData.append("file", {
        uri,
        name: filename,
        type,
      } as any)

      // Simulate upload - replace with actual upload logic
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful upload response
      const uploadedUrl = `https://example.com/uploads/${filename}`

      setProfile((prev) => ({
        ...prev,
        avatar_url: uploadedUrl,
      }))

      Alert.alert("Success", "Image uploaded successfully!")
    } catch (error) {
      Alert.alert("Error", "Failed to upload image")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const updateProfile = async () => {
    try {
      setSaving(true)

      // Validate required fields
      if (!profile.username.trim()) {
        Alert.alert("Error", "Username is required")
        return
      }

      if (!profile.full_name.trim()) {
        Alert.alert("Error", "Full name is required")
        return
      }

      // Simulate API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1500))

      Alert.alert("Success", "Profile updated successfully!")
    } catch (error) {
      Alert.alert("Error", "Failed to update profile")
      console.error("Update error:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} disabled={uploading}>
          {avatarUri || profile.avatar_url ? (
            <Image source={{ uri: avatarUri || profile.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>+</Text>
            </View>
          )}
          {uploading && (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage} disabled={uploading}>
          <Text style={styles.changePhotoText}>{uploading ? "Uploading..." : "Change Photo"}</Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={profile.username}
            onChangeText={(text) => handleInputChange("username", text)}
            placeholder="Enter your username"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={profile.full_name}
            onChangeText={(text) => handleInputChange("full_name", text)}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={profile.bio}
            onChangeText={(text) => handleInputChange("bio", text)}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={updateProfile}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#dee2e6",
    borderStyle: "dashed",
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: "#6c757d",
    fontWeight: "300",
  },
  uploadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  changePhotoText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "600",
  },
  formSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#495057",
  },
  bioInput: {
    height: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: "#007bff",
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  saveButtonDisabled: {
    backgroundColor: "#6c757d",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})
