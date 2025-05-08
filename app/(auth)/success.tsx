import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/button_"
import { Ionicons } from "@expo/vector-icons"
import BouncingCircle from "../components/animations/ball"
import AnimatedCheck from "../components/animations/twinkle"
const RegisterSuccessScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.iconContainer}>
          <AnimatedCheck/>
          <BouncingCircle/>
          </View>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.message}>
            Your account is ready to use! You will be redirected to the home page in a few seconds.
          </Text>
        </View>

        <Button title="Sign In" onPress={() => navigation.navigate("login")} style={styles.button} 
                 variant="gradient"
                 gradientColors={['#5858E8', '#9B5EFC']}  />
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
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
    paddingHorizontal: 2,
  },
  button: {
    marginBottom: 24,
  },
})

export default RegisterSuccessScreen
