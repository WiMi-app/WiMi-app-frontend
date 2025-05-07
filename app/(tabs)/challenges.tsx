import { View, Text, StyleSheet } from "react-native"
import GolfChallengeCard from "../components/challengecard"
import { ImageSourcePropType } from 'react-native';

export default function ChallengeScreen() {

  interface PlayerAvatar {
    id: string;
    image: ImageSourcePropType;
  }

  const avatars : PlayerAvatar[] = [
    { id: '1', image: require('../../assets/test/profile.png') },
    { id: '2', image: require('../../assets/test/profile.png') },
    { id: '3', image: require('../../assets/test/profile.png') },
    { id: '4', image: require('../../assets/test/profile.png') },
  ];

  return (
    <View style={styles.container}>
      <GolfChallengeCard   title = "Challenge"
  description = "Test your focus and see how many strokes it takes to sink the ball!"
  backgroundImage = "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070"
  playerAvatars = {avatars} playerCount = {15} onPress = {()=>{}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
})
