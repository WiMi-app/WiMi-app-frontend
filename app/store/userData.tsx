import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const USER_KEY = 'userData';

export async function saveUserData(userData: any): Promise<boolean> {
  try {
    const value = JSON.stringify(userData);
    await SecureStore.setItemAsync(USER_KEY, value);
    return true;
  } catch (error) {
    console.error('Failed to save user data:', error);
    Alert.alert(
      "Error",
      "Failed to save user information. Please try again.",
      [{ text: "OK" }]
    );
    return false;
  }
}

export async function getUserData(): Promise<any | null> {
  try {
    const value = await SecureStore.getItemAsync(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
}

export async function deleteUserData(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error('Failed to delete user data:', error);
  }
}
