import { View, StyleSheet, ScrollView, Dimensions} from "react-native"
import ChallengeCard from "../components/challenge/challengecard"
import { ImageSourcePropType } from 'react-native';
import { useRef, useState, useEffect } from 'react'
import HorizontalCarousel, {HorizontalCarouselRef} from "../components/animations/carousel";
import Header from "../components/challenge/header";
import DetailsScreen from "../components/challenge/details";


const { width, height } = Dimensions.get('window');
const paddingTopValue = height * 0.1;

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

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HorizontalCarouselRef>(null);
  
  // Update the active index whenever it changes
  useEffect(() => {
    const checkIndex = setInterval(() => {
      if (carouselRef.current) {
        const currentIdx = carouselRef.current.currentIndex;
        if (currentIdx !== activeIndex) {
          setActiveIndex(currentIdx);
        }
      }
    }, 100);
    
    return () => clearInterval(checkIndex);
  }, [activeIndex]);


  const testData = [
    {
    title : "Challenge 1",
    description : "Test your focus and see how many strokes it takes to sink the ball!",
    backgroundImage : "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070",
    playerAvatars : avatars,
    playerCount : 15,
    onPress : ()=>{}
    },
  {
    title: "Challenge 2",
    description: "Test your focus and see how many strokes it takes to sink the ball!",
    backgroundImage: "https://t4.ftcdn.net/jpg/04/39/89/01/360_F_439890152_sYbPxa1ANTSKcZuUsKzRAf9O7bJ1Tx5B.jpg",
    playerAvatars: avatars,
    playerCount: 13,
    onPress: () => {},
  },
  {
    title: "Challenge 3",
    description: "Test your focus and see how many strokes it takes to sink the ball!",
    backgroundImage: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?semt=ais_hybrid&w=740",
    playerAvatars: avatars,
    playerCount: 12,
    onPress: () => {},
  },
  {
    title: "Challenge 4",
    description: "Test your focus and see how many strokes it takes to sink the ball!",
    backgroundImage: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?semt=ais_hybrid&w=740",
    playerAvatars: avatars,
    playerCount: 12,
    onPress: () => {},
  },
  {
    title: "Challenge 5",
    description: "Test your focus and see how many strokes it takes to sink the ball!",
    backgroundImage: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?semt=ais_hybrid&w=740",
    playerAvatars: avatars,
    playerCount: 12,
    onPress: () => {},
  },
];

const testComp = testData.map((item, index) => (
  <ChallengeCard 
    title={item.title}
    description={item.description}
    backgroundImage={item.backgroundImage}
    playerAvatars={item.playerAvatars}
    playerCount={item.playerCount}
    onPress={item.onPress}
    />
));

  return (
    <ScrollView style={styles.container}>
      <Header title={String(testData[activeIndex].title)}/>
      <View style={styles.Carousel}>
        <HorizontalCarousel ref={carouselRef} items={testComp}/>
      </View>
      <DetailsScreen/>
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
  }
})
