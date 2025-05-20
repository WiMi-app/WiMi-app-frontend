// Import necessary hooks and components from React and React Native
import React, { useRef, useState, useEffect, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  ViewStyle,
} from 'react-native';

// Get screen dimensions to calculate positions and distances
const { width, height } = Dimensions.get('window');

// Define the props interface for the carousel component
interface HorizontalCarouselProps {
  items: ReactNode[]; // An array of React nodes (any valid JSX)
}

// Define a styles interface to strongly type the StyleSheet
interface StylesProps {
  container: ViewStyle;
  carousel: ViewStyle;
}

// HorizontalCarousel component
export default function HorizontalCarousel({ items }: HorizontalCarouselProps): JSX.Element {

  // Animated value to track horizontal scroll position
  const scrollPosition = useRef(new Animated.Value(0)).current;

  // Track the index of the currently displayed item
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = useRef(0);
  // Prevent user from interacting mid-transition
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Create a PanResponder to handle horizontal swipe gestures
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      // Only respond to gestures if not transitioning
      onStartShouldSetPanResponder: () => !isTransitioning,

      // As user drags, update the animated scroll position
      onPanResponderMove: (_, { dx }) => {

      console.log(currentIndex, dx, items.length);
        scrollPosition.setValue(dx);
      },

      // When user releases the swipe
      onPanResponderRelease: (_, { dx }) => {
        // Swipe left: go to next item
        if (dx < -50 && currentIndexRef.current < items.length - 1) {
          console.log("tick");
          handleTransition(currentIndexRef.current + 1);
        }
        // Swipe left: Loops to the Start
        else if (dx < -50 && currentIndexRef.current >= items.length - 1 ){
          handleTransition(0);
        }
        // Swipe right: go to previous item
        else if (dx > 50 && currentIndexRef.current > 0) {
          handleTransition(currentIndexRef.current - 1);
        }
        // Swipe right: loops to the Next
        else if (dx > 50 && currentIndexRef.current <= 0 ){
          handleTransition(items.length - 1);
        }
        // Not enough swipe — spring back to current item
        else {
          console.log('tick4')
          Animated.spring(scrollPosition, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Transition between items
  const handleTransition = (newIndex: number) => {
    setIsTransitioning(true); // Lock interaction

    // Determine direction of animation
    const direction = newIndex > currentIndex ? -1 : 1;

    // Animate current item out
    Animated.timing(scrollPosition, {
      toValue: direction * width * 0.5, // Move halfway off-screen
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      // Update index after current animation
      setCurrentIndex(newIndex);
      // Immediately reset scroll position off-screen in opposite direction
      scrollPosition.setValue(-direction * width * 0.5);

      // Animate new item into center
      Animated.spring(scrollPosition, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false); // Unlock interaction
      });
    });
  };

  // Reset scroll position when component first mounts
  useEffect(() => {
    scrollPosition.setValue(0);
  }, []);

    useEffect(() => {
      currentIndexRef.current = currentIndex;
      console.log(currentIndexRef.current);
    }, [currentIndex]);

  // Render a single item if it's within view (left, center, or right)
  const renderItem = (item: ReactNode, index: number, length: number): JSX.Element | null => {
    //console.log(index, currentIndex, length);
    const position = index - currentIndex;
    //console.log('Position: ', position);
    //console.log(position < -1 && position > -length || position > 1 && position < length)
    // Only render items that are immediately around the current one
    if (position < -1 && position > -length || position > 1 && position < length) return null;
    // TranslateX is interpolated to give a sliding effect based on current position
    const translateX = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === -1 || position === length ? -width * 0.9 : position === 0 ? -width : width * 0.5,
        position === -1 || position === length ? -width * 0.7 : position === 0 ? 0 : width * 0.7,
        position === -1 || position === length ? -width * 0.5 : position === 0 ? width : width * 0.9,
      ],
      extrapolate: 'clamp',
    });

    // Scale items slightly when off-center
    const scale = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === 0 ? 0.9 : 0.7,
        position === 0 ? 1 : 0.8,
        position === 0 ? 0.9 : 0.7,
      ],
      extrapolate: 'clamp',
    });

    // Reduce opacity for non-centered items
    const opacity = scrollPosition.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [
        position === 0 ? 0.9 : 0.5,
        position === 0 ? 1 : 0.6,
        position === 0 ? 0.9 : 0.5,
      ],
      extrapolate: 'clamp',
    });

    // Wrap item in an Animated.View with transformations
    return (
      <Animated.View
        key={index}
        style={{
          position: 'absolute', // stack items
          transform: [{ translateX }, { scale }],
          opacity,
          zIndex: position === 0 ? 2 : 1, // center item appears on top
        }}
      >
        {item}
      </Animated.View>
    );
  };

  // Render carousel container and all visible items
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.carousel}>
        {items.map((item, index) => renderItem(item, index, items.length-1))}
      </View>
    </View>
  );
}

// Define styles for the component using StyleSheet.create
const styles = StyleSheet.create<StylesProps>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    height: height * 0.6,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
