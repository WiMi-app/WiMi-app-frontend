import { View, Text, StyleSheet } from "react-native"
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import Token from "../components/auth/session";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to your new app!</Text>
      <Token/>
      <Button title="Go to Login" onPress={() => router.push('(auth)/login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
})
