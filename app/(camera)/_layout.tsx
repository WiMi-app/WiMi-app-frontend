import { Stack } from 'expo-router';

export default function CameraLayout() {
    return <Stack 
          screenOptions={{
          headerShown: false, // Hide headers if you want a custom layout
          animation: 'slide_from_right',
        }}/>;
}
