import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.6;
const VISIBLE_ITEMS = 3;

const cards = [
  { id: '1', title: 'Card 1', color: '#FF5A5F' },
  { id: '2', title: 'Card 2', color: '#C969E0' },
  { id: '3', title: 'Card 3', color: '#50E3C2' },
  { id: '4', title: 'Card 4', color: '#FFBE0B' },
  { id: '5', title: 'Card 5', color: '#4361EE' },
];

export default function CustomPathCarousel() {
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create pan responder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        scrollPosition.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        // Determine if the user intended to swipe left or right
        if (dx < -50 && currentIndex < cards.length - 1) {
          // Swipe left to next card
          setCurrentIndex(currentIndex + 1);
        } else if (dx > 50 && currentIndex > 0) {
          // Swipe right to previous card
          setCurrentIndex(currentIndex - 1);
        }

        // Animate back to the centered position
        Animated.spring(scrollPosition, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  // Reset position when current index changes
  useEffect(() => {
    scrollPosition.setValue(0);
  }, [currentIndex]);

  const renderCard = (item, index) => {
    // Calculate the position in the carousel
    const position = index - currentIndex;

    // Only render cards that are visible
    if (position < 0 || position >= VISIBLE_ITEMS) return null;

    // Define the custom path parameters
    // This creates a curved path where cards move down and to the side
    const translateX = scrollPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [-(position * 30) - 200, position * 60, (position * 30) + 200],
      extrapolate: 'clamp',
    });

    // Y position follows a curved path
    const translateY = scrollPosition.interpolate({
      inputRange: [-200, -100, 0, 100, 200],
      outputRange: [
        position * 20,
        position * 40,
        position * 60, // Cards get progressively lower
        position * 40,
        position * 20,
      ],
      extrapolate: 'clamp',
    });

    // Scale gets smaller for cards further in the queue
    const scale = scrollPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [
        0.8 - position * 0.1,
        1 - position * 0.2,
        0.8 - position * 0.1,
      ],
      extrapolate: 'clamp',
    });

    // Rotation adds a slight tilt to the cards
    const rotate = scrollPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg', '0deg', '-10deg'],
      extrapolate: 'clamp',
    });

    // Opacity fades for cards further back
    const opacity = scrollPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.7 - position * 0.2, 1 - position * 0.2, 0.7 - position * 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.card,
          {
            backgroundColor: item.color,
            transform: [
              { translateX },
              { translateY },
              { scale },
              { rotate },
            ],
            opacity,
            zIndex: VISIBLE_ITEMS - position,
          },
        ]}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.carousel}>
        {cards.map((item, index) => renderCard(item, index))}
      </View>
      <Text style={styles.instructions}>Swipe left or right</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  carousel: {
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 0.8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  instructions: {
    marginTop: 30,
    color: '#333',
    fontSize: 16,
  },
});