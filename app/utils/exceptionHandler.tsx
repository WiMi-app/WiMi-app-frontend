import {
  Alert
} from "react-native"
import axios from 'axios';

export function handleException(e:unknown){
    if (axios.isAxiosError(e)) {
        if (e.code == 'ECONNABORTED'){
          Alert.alert("Timeout", "The request took too long. Please check your connection and try again.");
        }
        else{
          console.log(e.response?.status);
          const status = e.response?.status;
          if (status === 401) {
            Alert.alert("Login Failed", "Incorrect password. Please try again.");
          } else if (status === 422) {
            Alert.alert("Login Failed", "Email not found or invalid. Please check your email or sign up.");
          } else {
            Alert.alert("Network Error", "Login failed due to a network or server issue. Please try again later.");
          }
        }
      } else {
        console.error('An unexpected error occurred:', e);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
      // User remains on the login page if any error occurs in the try block.
    
}