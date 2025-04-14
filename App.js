import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Ignore specific warnings to avoid noise
LogBox.ignoreLogs([
  'Reanimated 2',
  'Failed to get size',
  'ViewPropTypes'
]);

// Import screens
import HomeScreen from './app/screens/HomeScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import LoginScreen from './app/screens/LoginScreen';
import ChallengeScreen from './app/screens/ChallengeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            cardStyle: { backgroundColor: 'transparent' },
            animationEnabled: true,
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'WiMi' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen 
            name="Challenge" 
            component={ChallengeScreen}
            options={{ 
              headerShown: false,
              presentation: 'modal',
              cardOverlayEnabled: true,
              gestureEnabled: true,
              gestureResponseDistance: 300,
              cardStyle: { backgroundColor: 'transparent' },
              detachPreviousScreen: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 