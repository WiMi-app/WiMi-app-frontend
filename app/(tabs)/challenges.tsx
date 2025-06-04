import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native"
import ChallengeCard from "../components/challenge/challengecard"
import { ImageSourcePropType } from 'react-native';
import HorizontalCarousel from "../components/animations/carousel";
import Header from "../components/challenge/header";
import ChallengeView from "../components/challenge/challenge_view";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';


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
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const navigation = useNavigation<any>();

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
          throw new Error(`API request failed with status ${response.status}`);
        }
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

  const handleCarouselSnap = useCallback((index: number) => {
    setCurrentChallengeIndex(index);
  }, []);

  const handleOpenCameraPress = (challengeId: string) => {
    console.log(`Camera icon pressed for challenge: ${challengeId}`);
    navigation.navigate('(camera)', { challengeId });
  };

  const challengeItems = challenges.map((item, index) => (
    <ChallengeCard
      key={item.id}
      title={item.title}
      description={item.description}
      backgroundImage={{ uri: item.background_photo }}
      playerAvatars={avatars}
      playerCount={challenges.length}
      onPress={() => {
        setCurrentChallengeIndex(index);
      }}
      onPressCamera={() => handleOpenCameraPress(item.id)}
    />
  ));

  const headerTitle = "Challenges";

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Loading Challenges..."}/>
        <View style={styles.centeredMessage}><Text>Loading...</Text></View>
      </View>
    );
  }
  
  if (challenges.length === 0 && !loading) {
     return (
      <View style={styles.container}>
        <Header title={"Challenges"}/>
        <View style={styles.centeredMessage}><Text>No challenges available.</Text></View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={headerTitle}/>
      <View style={styles.Carousel}>
        <HorizontalCarousel 
          items={challengeItems} 
          onCurrentIndexChange={handleCarouselSnap}
          initialLogicalIndex={currentChallengeIndex}
        />
      </View>
      <ChallengeView 
        allChallenges={challenges} 
        selectedChallengeFromScreen={challenges[currentChallengeIndex] || null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTopValue,
    backgroundColor: '#f5f5f5',
  },
  Carousel: {
    height: height * 0.5,
    marginTop: height * 0.1,
    marginBottom: 20,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})
