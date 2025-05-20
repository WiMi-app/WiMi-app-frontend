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
  TouchableWithoutFeedback,
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
  cardWrapper: ViewStyle;
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
  const createCardPanResponder = (): PanResponderInstance => {
    return PanResponder.create({
      // Only respond to gestures if not transitioning
      onStartShouldSetPanResponder: () => !isTransitioning,
      onMoveShouldSetPanResponder: (_, {dx, dy}) => {
        // Only respond to horizontal gestures
        return !isTransitioning && Math.abs(dx) > Math.abs(dy);
      },

      // As user drags, update the animated scroll position
      onPanResponderMove: (_, { dx }) => {
        // Limit drag distance for better feel
        const limitedDx = Math.min(Math.max(dx, -width * 0.5), width * 0.5);
        scrollPosition.setValue(limitedDx);
      },

      // When user releases the swipe
      onPanResponderRelease: (_, { dx, vx }) => {
        // Determine swipe threshold
        const threshold = width * 0.15; // 15% of screen width
        const velocityThreshold = 0.3; // Velocity threshold

        // Swipe left: go to next item
        if ((dx < -threshold || vx < -velocityThreshold) && currentIndexRef.current < items.length - 1) {
          handleTransition(currentIndexRef.current + 1, 'left');
        }
        // Swipe left: Loops to the Start
        else if ((dx < -threshold || vx < -velocityThreshold) && currentIndexRef.current >= items.length - 1) {
          handleTransition(0, 'left');
        }
        // Swipe right: go to previous item
        else if ((dx > threshold || vx > velocityThreshold) && currentIndexRef.current > 0) {
          handleTransition(currentIndexRef.current - 1, 'right');
        }
        // Swipe right: loops to the end
        else if ((dx > threshold || vx > velocityThreshold) && currentIndexRef.current <= 0) {
          handleTransition(items.length - 1, 'right');
        }
        // Not enough swipe — spring back to current item
        else {
          Animated.spring(scrollPosition, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 40
          }).start();
        }
      },
    });
  };

  // Transition between items
  const handleTransition = (newIndex: number, direction: 'left' | 'right') => {
    setIsTransitioning(true); // Lock interaction

    // Direction of animation based on swipe direction
    const directionMultiplier = direction === 'left' ? -1 : 1;

    // Animate current item out
    Animated.timing(scrollPosition, {
      toValue: directionMultiplier * width * 0.5, // Move halfway off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Update index after current animation
      setCurrentIndex(newIndex);
      // Immediately reset scroll position off-screen in opposite direction
      scrollPosition.setValue(-directionMultiplier * width * 0.5);

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
  }, [currentIndex]);

  // Render a single item if it's within view (left, center, or right)
  const renderItem = (item: ReactNode, index: number, length: number): JSX.Element | null => {
    const position = index - currentIndex;
    
    // Handle wraparound for visual positioning
    let visualPosition = position;
    
    // Make the last item appear to the left of the first
    if (currentIndex === 0 && index === items.length - 1) {
      visualPosition = -1;
    }
    // Make the first item appear to the right of the last
    else if (currentIndex === items.length - 1 && index === 0) {
      visualPosition = 1;
    }
    
    // Only render items that are immediately around the current one
    if (Math.abs(visualPosition) > 1) return null;
    
    // TranslateX is interpolated to give a sliding effect based on current position
    const translateX = scrollPosition.interpolate({
      inputRange: [-width * 0.5, 0, width * 0.5],
      outputRange: [
        visualPosition === -1 ? -width * 0.9 : visualPosition === 0 ? -width * 0.5 : width * 0.3,
        visualPosition === -1 ? -width * 0.7 : visualPosition === 0 ? 0 : width * 0.7,
        visualPosition === -1 ? -width * 0.3 : visualPosition === 0 ? width * 0.5 : width * 0.9,
      ],
      extrapolate: 'clamp',
    });

    // Scale items slightly when off-center
    const scale = scrollPosition.interpolate({
      inputRange: [-width * 0.5, 0, width * 0.5],
      outputRange: [
        visualPosition === 0 ? 0.9 : 0.75,
        visualPosition === 0 ? 1 : 0.85,
        visualPosition === 0 ? 0.9 : 0.75,
      ],
      extrapolate: 'clamp',
    });

    // Reduce opacity for non-centered items
    const opacity = scrollPosition.interpolate({
      inputRange: [-width * 0.5, 0, width * 0.5],
      outputRange: [
        visualPosition === 0 ? 0.9 : 0.5,
        visualPosition === 0 ? 1 : 0.7,
        visualPosition === 0 ? 0.9 : 0.5,
      ],
      extrapolate: 'clamp',
    });

    // Create pan responder for the current card
    const panHandlers = visualPosition === 0 ? createCardPanResponder().panHandlers : {};

    // Wrap item in an Animated.View with transformations
    return (
      <Animated.View
        key={index}
        style={{
          position: 'absolute', // stack items
          transform: [{ translateX }, { scale }],
          opacity,
          zIndex: visualPosition === 0 ? 2 : 1, // center item appears on top
        }}
        {...panHandlers}
      >
        <View style={styles.cardWrapper}>
          {item}
        </View>
      </Animated.View>
    );
  };

  // Render carousel container and all visible items
  return (
    <View style={styles.container}>
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
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
  }
});
