import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export async function saveToken(key: string, value: string): Promise<boolean> {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (error) {
    console.error('Failed to save token:', error);
    Alert.alert(
      "Error",
      "Failed to save login information. Please try logging in again.",
      [{ text: "OK" }]
    );
    return false;
  }
}

export async function getToken(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
}

export async function deleteToken(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Failed to delete token:', error);
  }
}
