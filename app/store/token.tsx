import * as SecureStore from 'expo-secure-store';

// Define key type (you can expand this as needed)

export async function saveToken(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Failed to save token:', error);
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
