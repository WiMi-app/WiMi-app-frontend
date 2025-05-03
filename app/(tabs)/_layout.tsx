import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { View, Image, StyleSheet } from "react-native"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "#6C5CE7" : "#CCCCCC"} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="search" size={24} color={focused ? "#6C5CE7" : "#CCCCCC"} />,
        }}
      />
<Tabs.Screen
  name="challenges"
  options={{
    tabBarIcon: ({ focused }) => (
      <View style={styles.Logo}>
        <Image
          source={
            focused
              ? require('../../assets/icons/challenge-active.png')
              : require('../../assets/icons/challenge.png')
          }
        />
      </View>
    )
  }}
/>

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="mail" size={30} color={focused ? "#6C5CE7" : "#CCCCCC"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.profileContainer, focused && styles.profileContainerActive]}>
              <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  profileContainerActive: {
    borderColor: "#6C5CE7",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  Logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
})