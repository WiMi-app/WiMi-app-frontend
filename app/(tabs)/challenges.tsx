import { View, StyleSheet, ScrollView, Dimensions, Text} from "react-native"
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
  background_photo: string[] | null;
  creator_id: string;
  created_at: string;
  updated_at: string;
  participants_count?: number;
}

export default function ChallengeScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const avatars : PlayerAvatar[] = [
    { id: '1', image: require('../../assets/test/profile.png') },
    { id: '2', image: require('../../assets/test/profile.png') },
    { id: '3', image: require('../../assets/test/profile.png') },
    { id: '4', image: require('../../assets/test/profile.png') },
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/challenges/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChallenges(data);
        if (data.length > 0) {
          setSelectedChallenge(data[currentChallengeIndex] || data[0]);
        } else {
          setSelectedChallenge(null);
        }
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
        setChallenges([]);
        setSelectedChallenge(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleCarouselSnap = (index: number) => {
    if (challenges && challenges.length > index && index >= 0) {
      setSelectedChallenge(challenges[index]);
      setCurrentChallengeIndex(index);
    }
  };

  const handleChallengeCardPress = (challenge: Challenge, index: number) => {
    setSelectedChallenge(challenge);
    setCurrentChallengeIndex(index);
  };

  const challengeItems = challenges.map((item, index) => (
    <ChallengeCard
      key={item.id}
      title={item.title}
      description={item.description}
      backgroundImage={item.background_photo}
      challengeId={item.id}
      playerAvatars={avatars}
      playerCount={item.participants_count || 10}
      onPress={() => handleChallengeCardPress(item, index)}
    />
  ));

  if (loading && challenges.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <Header title={"Challenges"}/>
        <View style={styles.Carousel}>
           {/* <ActivityIndicator size="large" /> */}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={"Challenges"}/>
      <View style={styles.Carousel}>
        {challenges.length > 0 ? (
          <HorizontalCarousel 
            items={challengeItems} 
            initialLogicalIndex={currentChallengeIndex}
            onCurrentIndexChange={handleCarouselSnap} 
          />
        ) : (
          <Text style={styles.noChallengesText}>No challenges available at the moment.</Text>
        )}
      </View>
      <ChallengeView selectedChallenge={selectedChallenge} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTopValue,
    backgroundColor: '#f0f0f0',
  },
  Carousel: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 20,
    minHeight: 370,
  },
  noChallengesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  }
})
