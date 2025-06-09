// Import necessary hooks and components from React and React Native
import React, { ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics'; // For haptic feedback
import { LinearGradient } from 'expo-linear-gradient'; // Added LinearGradient
import { HorizontalCarouselProps as OriginalCarouselProps, StylesProps } from '../../interfaces/animations';

// Extend original props
export interface HorizontalCarouselProps extends OriginalCarouselProps {
  initialLogicalIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ITEM_WIDTH = 250; // From GolfChallengeCard styles.container
const ITEM_MARGIN_HORIZONTAL = 5; // From HorizontalCarousel styles.cardContainer
const FULL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN_HORIZONTAL * 2;
const GRADIENT_WIDTH = 50; // Width of the gradient overlay on each side

const HorizontalCarousel = ({ 
  items, 
  initialLogicalIndex = 0, 
  onCurrentIndexChange 
}: HorizontalCarouselProps): JSX.Element => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [augmentedItems, setAugmentedItems] = useState<ReactNode[]>([]);
  // Stores the logical index of the item considered "current" or centered
  const [currentLogicalIdx, setCurrentLogicalIdx] = useState(initialLogicalIndex);

  const itemsRef = useRef(items); // Ref to keep items fresh in closures
  const onCurrentIndexChangeRef = useRef(onCurrentIndexChange); // Ref for callback

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

    useEffect(() => {
    onCurrentIndexChangeRef.current = onCurrentIndexChange;
  }, [onCurrentIndexChange]);
  
  // Calculate padding needed to center a single item in the ScrollView
  const paddingHorizontal = (screenWidth - FULL_ITEM_WIDTH) / 2;

  // Debounce or throttle scroll end handling if it becomes too sensitive
  const isProcessingScrollEnd = useRef(false); 

    useEffect(() => {
    if (itemsRef.current && itemsRef.current.length > 0) {
      const numActualItems = itemsRef.current.length;
      const validInitialLogicalIndex = Math.max(0, Math.min(initialLogicalIndex, numActualItems - 1));

      const newAugmentedItems = [
        itemsRef.current[numActualItems - 1],
        ...itemsRef.current,
        itemsRef.current[0],
      ];
      setAugmentedItems(newAugmentedItems);
      setCurrentLogicalIdx(validInitialLogicalIndex);

      const initialAugmentedIndex = validInitialLogicalIndex + 1;
      // Corrected initialScrollX calculation
      const initialScrollX = initialAugmentedIndex * FULL_ITEM_WIDTH;
      
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: initialScrollX,
          animated: false,
        });
      }, 0);
    } else {
      setAugmentedItems([]);
      setCurrentLogicalIdx(0);
    }
  // Removed paddingHorizontal from dependency array
  }, [itemsRef.current, initialLogicalIndex]); 

  const handleMomentumScrollEnd = useCallback((event: any) => {
    if (isProcessingScrollEnd.current || !itemsRef.current || itemsRef.current.length === 0 || !scrollViewRef.current) {
          return;
      }
    isProcessingScrollEnd.current = true;

    const numActualItems = itemsRef.current.length;
    const currentOffset = event.nativeEvent.contentOffset.x;

    // Corrected closestAugmentedItemIndex calculation
    let closestAugmentedItemIndex = Math.round(currentOffset / FULL_ITEM_WIDTH);
    // Clamp to valid range for augmentedItems
    closestAugmentedItemIndex = Math.max(0, Math.min(closestAugmentedItemIndex, augmentedItems.length - 1));

    let finalLogicalIndex = closestAugmentedItemIndex - 1;
    let scrollTargetAugmentedIndex = closestAugmentedItemIndex;
    let performImmediateScroll = false;
    let immediateScrollX = 0;

    if (closestAugmentedItemIndex === 0 && numActualItems > 0) { // Landed on the prepended (cloned last) item
      finalLogicalIndex = numActualItems - 1;
      scrollTargetAugmentedIndex = numActualItems; // Target the actual last item's augmented index
      performImmediateScroll = true;
      immediateScrollX = scrollTargetAugmentedIndex * FULL_ITEM_WIDTH;
    } else if (closestAugmentedItemIndex === augmentedItems.length - 1 && numActualItems > 0) { // Landed on the appended (cloned first) item
      finalLogicalIndex = 0;
      scrollTargetAugmentedIndex = 1; // Target the actual first item's augmented index
      performImmediateScroll = true;
      immediateScrollX = scrollTargetAugmentedIndex * FULL_ITEM_WIDTH;
    }
    // For single item list, finalLogicalIndex might become -1 or numActualItems if not careful with above logic.
    // Ensure finalLogicalIndex is clamped if numActualItems is small.
    if (numActualItems > 0) {
        finalLogicalIndex = Math.max(0, Math.min(finalLogicalIndex, numActualItems - 1));
    }

    if (performImmediateScroll) {
        scrollViewRef.current.scrollTo({ x: immediateScrollX, animated: false });
    }
    
    // Perform the snap animation to the determined or jumped-to target
    const snapToX = scrollTargetAugmentedIndex * FULL_ITEM_WIDTH;
    scrollViewRef.current.scrollTo({ x: snapToX, animated: true });
    
    if (currentLogicalIdx !== finalLogicalIndex && numActualItems > 0) {
      setCurrentLogicalIdx(finalLogicalIndex);
      if (onCurrentIndexChangeRef.current) {
        onCurrentIndexChangeRef.current(finalLogicalIndex);
      }
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setTimeout(() => {
      isProcessingScrollEnd.current = false;
    }, 100); // Adjust delay as needed, 100ms is a common starting point

  // Dependencies: if items change (augmentedItems.length) or currentLogicalIdx changes, recreate callback
  }, [augmentedItems.length, currentLogicalIdx]);


  if (items.length === 0) {
    // Return a container with the same height as the carousel would have, for layout consistency
    return <View style={[styles.container, styles.emptyContainer]} />;
  }

      return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { 
            // Removed explicit width, paddingHorizontal and item widths will determine it
            paddingHorizontal: paddingHorizontal 
          } 
        ]}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        decelerationRate={"fast"}
      >
        {augmentedItems.map((item, index) => (
          <View 
            key={`augmented-item-${index}`}
            style={styles.cardContainer}
          >
            {item}
          </View>
        ))}
      </ScrollView>
      <LinearGradient
        colors={['rgba(240,240,240,0.9)', 'transparent']}
        style={[styles.gradientOverlay, styles.gradientLeft]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['transparent', 'rgba(240,240,240,0.9)']}
        style={[styles.gradientOverlay, styles.gradientRight]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        pointerEvents="none"
      />
    </View>
  );
};

const CAROUSEL_HEIGHT = 350; // Assuming card height, adjust if dynamic

const styles = StyleSheet.create<StylesProps & { container: ViewStyle, gradientOverlay: ViewStyle, gradientLeft: ViewStyle, gradientRight: ViewStyle, emptyContainer: ViewStyle }>({
  container: {
    height: CAROUSEL_HEIGHT, // Set a fixed height for the container
    width: screenWidth,
    justifyContent: 'center',
  },
  emptyContainer: {
    // Styles for when the carousel is empty, if needed (e.g., background color)
  },
  scrollView: {
    // ScrollView will naturally take the height of its container if not specified otherwise
    // width: screenWidth, // This is handled by the container now
    overflow: 'visible', // To ensure shadows from cards are not clipped by ScrollView itself if it had a fixed size smaller than items
  },
  scrollViewContent: {
    alignItems: 'center',
    // Height of content can be determined by items or explicitly set if needed
  },
  cardContainer: {
    width: ITEM_WIDTH,
    height: CAROUSEL_HEIGHT, 
    marginHorizontal: ITEM_MARGIN_HORIZONTAL,
    alignItems: 'center', 
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: GRADIENT_WIDTH,
    height: '100%', // Ensure gradient covers full height of container
  },
  gradientLeft: {
    left: 0,
  },
  gradientRight: {
    right: 0,
  },
});

export default HorizontalCarousel;