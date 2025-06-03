import { View, StyleSheet, ScrollView, Dimensions} from "react-native"
import ChallengeCard from "../components/challenge/challengecard"
import { ImageSourcePropType } from 'react-native';
import HorizontalCarousel from "../components/animations/carousel";
import Header from "../components/challenge/header";
import ChallengeView from "../components/challenge/challenge_view";
import { useEffect, useState } from "react";


const { width, height } = Dimensions.get('window');
const paddingTopValue = height * 0.1;

interface PlayerAvatar {
  id: string;
  image: ImageSourcePropType;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  due_date: string;
  location: string;
  restriction: string;
  repetition: string;
  repetition_frequency: number | null;
  repetition_days: string[] | null;
  check_in_time: string | null;
  is_private: boolean;
  time_window: number | null;
  background_photo: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

export default function ChallengeScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const avatars : PlayerAvatar[] = [
    { id: '1', image: require('../../assets/test/profile.png') },
    { id: '2', image: require('../../assets/test/profile.png') },
    { id: '3', image: require('../../assets/test/profile.png') },
    { id: '4', image: require('../../assets/test/profile.png') },
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/challenges/');
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);


  const challengeItems = challenges.map((item) => (
    <ChallengeCard
      key={item.id}
      title={item.title}
      description={item.description}
      backgroundImage={item.background_photo}
      playerAvatars={avatars} // Using static avatars for now
      playerCount={10} // Using a static player count for now
      onPress={() => {}} // Placeholder onPress
    />
  ));

  if (loading) {
    // You can return a loading indicator here
    return <View style={styles.container}><Header title={"Challenges"}/></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={"Challenges"}/>
      <View style={styles.Carousel}>
        <HorizontalCarousel items={challengeItems}/>
      </View>
      <ChallengeView/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTopValue
  },
  Carousel: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 20
  }
})
