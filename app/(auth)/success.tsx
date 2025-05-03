import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/button_"
import { Ionicons } from "@expo/vector-icons"

const RegisterSuccessScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#5A67D8" />
          </View>
          <Text style={styles.title}>Registration Successful!</Text>
          <Text style={styles.message}>
            Your account has been created successfully. You can now sign in to access your account.
          </Text>
        </View>

        <Button title="Sign In" onPress={() => navigation.navigate("Login")} style={styles.button} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  button: {
    marginBottom: 24,
  },
})

export default RegisterSuccessScreen
