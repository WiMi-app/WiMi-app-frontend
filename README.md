# WiMi Social App

A simple social media application built with React Native.

## Features

- Login screen
- News feed with posts
- Ability to create new posts
- Like functionality
- User profiles
- Navigation between screens

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/wimi-social-app.git
cd wimi-social-app
```

2. Install dependencies:
```
npm install
```

## Running the App

To start the development server:

```
npm start
```

This will start the Expo development server. You can then:

- Use the Expo Go app on your iOS or Android device to scan the QR code
- Press 'a' to open in an Android emulator
- Press 'i' to open in an iOS simulator

## Project Structure

```
.
├── App.js              # Main application component with navigation
├── app
│   ├── components      # Reusable components
│   │   └── PostCard.js # Component for displaying posts
│   └── screens         # Application screens
│       ├── HomeScreen.js     # News feed screen
│       ├── LoginScreen.js    # Authentication screen
│       └── ProfileScreen.js  # User profile screen
└── index.js            # Entry point
```

## Mock Data

The app currently uses mock data for demonstration purposes. In a real app, you would connect to a backend API. 