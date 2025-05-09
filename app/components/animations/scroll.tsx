import React, { useRef, useState, useEffect, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Define props interface
interface HorizontalCarouselProps {
  items: ReactNode[];
}

// Define styles interface
interface StylesProps {
  container: ViewStyle;
  carousel: ViewStyle;
  instructions: TextStyle;
}

// HorizontalCarousel component that takes an array of components as props
export default function HorizontalCarousel({ items }: HorizontalCarouselProps): JSX.Element {
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Create pan responder to handle swipe gestures
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isTransitioning,
      onPanResponderMove: (_, { dx }) => {
        scrollPosition.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        // Determine if the user intended to swipe left or right
        if (dx < -50 && currentIndex < items.length - 1) {
          // Swipe left to next card
          handleTransition(currentIndex + 1);
        } else if (dx > 50 && currentIndex > 0) {
          // Swipe right to previous card
          handleTransition(currentIndex - 1);
        } else {
          // Return to center if not swiping to a new card
          Animated.spring(scrollPosition, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Handle transition to new card with animation
  const handleTransition = (newIndex: number) => {
    setIsTransitioning(true);
    
    // First animate the current card out
    const direction = newIndex > currentIndex ? -1 : 1;
    Animated.timing(scrollPosition, {
      toValue: direction * width * 0.5,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      // Then update the index
      setCurrentIndex(newIndex);
      
      // Reset position for the new card
      scrollPosition.setValue(-direction * width * 0.5);
      
      // Animate the new card in
      Animated.spring(scrollPosition, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };

  // Reset position when component mounts
  useEffect(() => {
    scrollPosition.setValue(0);
  }, []);

  const renderItem = (item: ReactNode, index: number): JSX.Element | null => {
    // Calculate the position in the carousel (-1 = left, 0 = center, 1 = right)
    const position = index - currentIndex;

    // Only render items that are visible (left, center, right)
    if (position < -1 || position > 1) return null;

    // Define the horizontal position
    const translateX = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === -1 ? -width * 0.9 : position === 0 ? -width : width * 0.5,
        position === -1 ? -width * 0.7 : position === 0 ? 0 : width * 0.7,
        position === -1 ? -width * 0.5 : position === 0 ? width : width * 0.9,
      ],
      extrapolate: 'clamp',
    });

    // Scale gets smaller for items on the sides
    const scale = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === 0 ? 0.9 : 0.7,
        position === 0 ? 1 : 0.8,
        position === 0 ? 0.9 : 0.7,
      ],
      extrapolate: 'clamp',
    });

    // Opacity fades for items on the sides
    const opacity = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === 0 ? 0.9 : 0.5,
        position === 0 ? 1 : 0.6,
        position === 0 ? 0.9 : 0.5,
      ],
      extrapolate: 'clamp',
    });

    // Directly wrap the item in an Animated.View without the card styling
    return (
      <Animated.View
        key={index}
        style={{
          position: 'absolute',
          transform: [
            { translateX },
            { scale },
          ],
          opacity,
          zIndex: position === 0 ? 2 : 1,
        }}
      >
        {item}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.carousel}>
        {items.map((item, index) => renderItem(item, index))}
      </View>
      <Text style={styles.instructions}>Swipe left or right</Text>
    </View>
  );
}

const styles = StyleSheet.create<StylesProps>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  carousel: {
    height: height * 0.6,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    marginTop: 30,
    color: '#333',
    fontSize: 16,
  },
});
