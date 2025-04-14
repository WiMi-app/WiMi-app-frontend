# WiMi Social App Setup Instructions

## Prerequisites

To run this React Native application, you need to install:

1. **Node.js and npm**: 
   - Download and install from: https://nodejs.org/ (LTS version recommended)
   
2. **Expo CLI**:
   - After installing Node.js, run this command in your terminal:
   ```
   npm install -g expo-cli
   ```

## Setup Steps

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Start the development server**:
   ```
   npm start
   ```

3. **Run on a device or simulator**:
   - Install the Expo Go app on your phone and scan the QR code
   - Or press 'i' to open in iOS Simulator (Mac only, requires Xcode)
   - Or press 'a' to open in Android Emulator (requires Android Studio)

## Troubleshooting

If you encounter errors:

1. **Metro bundler errors**:
   ```
   npx expo start --clear
   ```

2. **Dependency issues**:
   ```
   rm -rf node_modules
   npm install
   ```

3. **Cache issues**:
   ```
   npm start -- --reset-cache
   ```

4. **Expo version mismatch**:
   Make sure your Expo CLI and Expo SDK versions are compatible. Check the [Expo documentation](https://docs.expo.dev/) for compatibility information.

## Project Structure

- `/app/screens`: Contains all the screen components
- `/app/components`: Contains reusable components
- `/app/assets`: Contains images and other assets

## Notes

- This app uses Expo, which simplifies React Native development
- The app has a mock backend - all data is stored in memory and will reset when the app is restarted 