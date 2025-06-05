import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function CreatePostLayout() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Stack handles nested routes like /auth/login, /auth/register */}
      <Stack
        screenOptions={{
          headerShown: false, // Hide headers if you want a custom layout
          animation: 'slide_from_right',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Change this to match your theme
  },
});
