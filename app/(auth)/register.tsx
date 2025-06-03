"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert
} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import Input from "../components/input"
import Button from "../components/button_"
import axiosInstance from "../api/axios"
import axiosStatic, { AxiosError } from 'axios';
import { handleException } from "../utils/exceptionHandler"


const RegisterScreen = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!name) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  async function handleRegister() {
    if (validateForm()) {
      setLoading(true)
      try {
        const response = await axiosInstance.post("auth/signup", {
          email: email,
          password: password,
        })

        setLoading(false);
        router.push('success' as any);
      } catch (error) {
        setLoading(false);
        handleException(error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6B7280" />
                </TouchableOpacity>
              }
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6B7280" />
                </TouchableOpacity>
              }
            />

            <Button title="Create Account" onPress={handleRegister} loading={loading} style={styles.registerButton}
              variant="gradient"
              gradientColors={['#5858E8', '#9B5EFC']} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.link} onPress={() => router.back()}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  form: {
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 16,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  link: {
    color: "#5A67D8",
    fontWeight: "500",
  },
})

export default RegisterScreen
