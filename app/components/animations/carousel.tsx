// Import necessary hooks and components from React and React Native
import React, { useRef, useState, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { HorizontalCarouselProps, HorizontalCarouselRef, StylesProps } from '../../interfaces/animations';

// Get screen dimensions to calculate positions and distances
const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100; // Threshold for swipe gesture

// HorizontalCarousel component with forwardRef
const HorizontalCarousel = forwardRef<HorizontalCarouselRef, HorizontalCarouselProps>(
  ({ items }, ref): JSX.Element => {

    const scrollPosition = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentIndexRef = useRef(0); // Ref to store current index for pan responder
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      get currentIndex() {
        return currentIndexRef.current;
      }
    }));

    useEffect(() => {
      currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const handleTransition = (newIndex: number) => {
      if (items.length <= 1 && currentIndex === newIndex) { // Avoid transition if only one item or no index change
          setIsTransitioning(false);
          return;
      }
      setIsTransitioning(true);

      const N = items.length;
      let animationDirection;

      if (N <= 1) {
        animationDirection = -1; 
        if (currentIndex === newIndex) {
            setIsTransitioning(false); 
            return;
        }
      } else {
        const isWrappingToEnd = currentIndex === 0 && newIndex === N - 1;
        const isWrappingToStart = currentIndex === N - 1 && newIndex === 0;

        if (isWrappingToStart || (!isWrappingToEnd && newIndex > currentIndex)) {
          animationDirection = -1; 
        } else {
          animationDirection = 1;
        }
      }

      Animated.timing(scrollPosition, {
        toValue: animationDirection * width * 0.5,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(newIndex);
        scrollPosition.setValue(-animationDirection * width * 0.5);
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
    
    const handleReleaseOrTerminate = (dx: number) => {
      if (isTransitioning) return;

      const currentIdx = currentIndexRef.current;
      const numItems = items.length;

      if (dx < -SWIPE_THRESHOLD && currentIdx < numItems - 1) {
        handleTransition(currentIdx + 1);
      } else if (dx < -SWIPE_THRESHOLD && currentIdx >= numItems - 1 && numItems > 0) {
        handleTransition(0); // Loop to start
      } else if (dx > SWIPE_THRESHOLD && currentIdx > 0) {
        handleTransition(currentIdx - 1);
      } else if (dx > SWIPE_THRESHOLD && currentIdx <= 0 && numItems > 0) {
        handleTransition(numItems - 1); // Loop to end
      } else {
        Animated.spring(scrollPosition, {
          toValue: 0,
          useNativeDriver: true,
          friction: 10,
          tension: 40,
        }).start();
      }
    };

    const panResponder = useRef<PanResponderInstance>(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => !isTransitioning,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          if (isTransitioning) return false;
          const { dx, dy } = gestureState;
          return (Math.abs(dx) > Math.abs(dy) * 1.5) && (Math.abs(dx) > 5); // Prioritize horizontal
        },
        onPanResponderGrant: () => {
          // Optional: consider stopping scrollPosition animation if a new valid drag starts
          // scrollPosition.stopAnimation(); 
        },
        onPanResponderMove: (_, { dx }) => {
          if (!isTransitioning) { // Only allow dragging if not already auto-transitioning
            scrollPosition.setValue(dx);
          }
        },
        onPanResponderRelease: (_, { dx }) => {
          if (!isTransitioning) {
             handleReleaseOrTerminate(dx);
          }
        },
        onPanResponderTerminate: (_, { dx }) => {
          if (!isTransitioning) {
            handleReleaseOrTerminate(dx);
          }
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true; // Attempt to block parent ScrollView on Android once claimed
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true, // Allow termination
      })
    ).current;

    useEffect(() => {
      scrollPosition.setValue(0);
    }, []);

    const renderItem = (item: ReactNode, index: number, length: number): JSX.Element | null => {
      const position = index - currentIndex;
      if (position < -1 && position > -length || position > 1 && position < length) return null;
      
      const translateX = scrollPosition.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [
          position === -1 || position === length ? -width * 0.85 : position === 0 ? -width : width * 0.45,
          position === -1 || position === length ? -width * 0.55 : position === 0 ? 0 : width * 0.55,
          position === -1 || position === length ? -width * 0.45 : position === 0 ? width : width * 0.85,
        ],
        extrapolate: 'clamp',
      });

      const scale = scrollPosition.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [
          position === 0 ? 0.9 : 0.75,
          position === 0 ? 1 : 0.9,
          position === 0 ? 0.9 : 0.75,
        ],
        extrapolate: 'clamp',
      });

      const opacity = scrollPosition.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [
          position === 0 ? 0.9 : 0.5,
          position === 0 ? 1 : 0.6,
          position === 0 ? 0.9 : 0.5,
        ],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            transform: [{ translateX }, { scale }],
            opacity,
            zIndex: position === 0 ? 2 : 1,
          }}
          {...(position === 0 && !isTransitioning ? panResponder.panHandlers : {})} // Apply panHandlers only to active card and if not transitioning
        >
          <View style={styles.cardContainer}>
            {item}
          </View>
        </Animated.View>
      );
    };

    return (
      <View style={styles.carousel}>
        {items.map((item, index) => renderItem(item, index, items.length-1))}
      </View>
    );
  }
);

const styles = StyleSheet.create<StylesProps>({
  carousel: {
    height: 400,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  cardContainer: {
    width: '100%',
    height: '100%'
  }
});

export default HorizontalCarousel;
