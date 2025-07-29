import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { View, Image, StyleSheet } from "react-native"
import ProfilePhoto from "../components/profile/profilephoto"
import Logo from "../components/icons/logo"
import { getMyData } from "../fetch/user"
import { useEffect,useState } from "react"

export default function TabsLayout() {
  const [profilepic, setProfilepic] = useState();
  useEffect(()=> {
      (async ()=>{await getMyData().then((data)=>setProfilepic(data.avatar_url))})();
  },[])

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
          tabBarIcon: ({ focused }) => <Ionicons name="notifications-circle-outline" size={30} color={focused ? "#6C5CE7" : "#CCCCCC"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfilePhoto photo = {profilepic ? { uri: profilepic[0] } :require('../../assets/images/defaultprofile.jpg')} Status={ focused ? 2 : 0 } size={30}/>
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  Logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
})
