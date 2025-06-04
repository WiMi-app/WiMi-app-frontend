import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

// Define the props interface for the carousel component
export interface HorizontalCarouselProps {
  items: ReactNode[]; // An array of React nodes (any valid JSX)
}

// Define what will be exposed through the ref
export interface HorizontalCarouselRef {
  currentIndex: number;
}

// Define a styles interface to strongly type the StyleSheet
export interface StylesProps {
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  cardContainer: ViewStyle;
} 