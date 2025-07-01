import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(newprofile)" options={{ headerShown: false, gestureEnabled: false  }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false, gestureEnabled: false  }} />
        <Stack.Screen name="(otherProfile)" options={{ headerShown: false, gestureEnabled: true  }} />
        <Stack.Screen name="(camera)" options={{ headerShown: false, gestureEnabled: false  }} />
        <Stack.Screen name="(createchallenge)" options={{ headerShown: false, gestureEnabled: true  }} />
        <Stack.Screen name="(createpost)" options={{ headerShown: false, gestureEnabled: true  }} />
      </Stack>
    </>
  )
}
