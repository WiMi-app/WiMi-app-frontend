"use client"

import { useEffect, useState } from "react"
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
import {saveToken, getToken} from "../store/token";
import apiClient from "../api/refresh";
import { getMyData } from "../fetch/user"
import { handleException } from "../utils/exceptionHandler"


const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

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
    }

    setErrors(newErrors)
    return isValid
  }

  useEffect(()=>{
    (async function checkRefresh() {
      setLoading(true);
      try{
        const refreshToken = await getToken('refreshToken');
        console.log(refreshToken);
        const response = await getMyData();
        setLoading(false);
        router.push('/(tabs)' as any);
      }catch(e){
        handleException(e);
        setLoading(false);
      }
    })();
  },[]);

  async function handleLogin() {
    if (!validateForm()) return;
    setLoading(true)
    try{
      const response= await axiosInstance.post("/auth/token",{
        email: email,
        password: password,
      });
      
      console.log(response.data);
      // If token saving failed, an alert is already shown by saveToken.
      // User remains on the login page.
      const refreshTokenSaved = await saveToken('refreshToken', response.data.refresh_token);
      const accessTokenSaved = await saveToken('accessToken', response.data.access_token);
      setLoading(false);

      if (refreshTokenSaved && accessTokenSaved) {
        router.push('/(tabs)' as any);
      } else {

      }
    }
    catch (e) {
      setLoading(false);
      handleException(e);
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
            <Text style={styles.title}>Log In</Text>
          </View>

          <View style={styles.form}>
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
              placeholder="Enter your password"
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button title="Log In" onPress={handleLogin} loading={loading} style={styles.loginButton}
              variant="gradient"
              gradientColors={['#5858E8', '#9B5EFC']}  />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.link} onPress={() => router.push('register' as any)}>
                Sign Up
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#5A67D8",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    marginTop: 8,
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

export default LoginScreen