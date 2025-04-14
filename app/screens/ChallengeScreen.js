import React, { useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ChallengeCard from '../components/ChallengeCard';

// Mock data for challenges
const CHALLENGES = [
  {
    id: '1',
    title: 'Weekly Photo Challenge: Nature',
    dueDate: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '2',
    title: 'Street Photography Contest',
    dueDate: '2023-12-22',
    image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '3',
    title: 'Macro Photography Challenge',
    dueDate: '2023-12-30',
    image: 'https://images.unsplash.com/photo-1550692167-9d10c3df740e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '4',
    title: 'Portrait Lighting Techniques',
    dueDate: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '5',
    title: 'Black & White Photography',
    dueDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
];

const ChallengeScreen = ({ navigation }) => {
  // Animation value for swipe-down feedback
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Set up pan responder for swipe down to close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dx) < 50;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down, not up
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Swipe down - animate closing and then close the screen
          Animated.timing(slideAnim, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true
          }).start(() => {
            navigation.goBack();
          });
        } else {
          // Not enough to dismiss - animate back to opened position
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5
          }).start();
        }
      },
    })
  ).current;

  const handleChallengePress = (challenge) => {
    // Handle challenge selection
    console.log('Selected challenge:', challenge.title);
    // Could navigate to challenge details screen
  };

  // Calculate transform for drag effect
  const animatedStyle = {
    transform: [{ translateY: slideAnim }]
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header} {...panResponder.panHandlers}>
          <View style={styles.handleBar} />
          <Text style={styles.title}>Challenges</Text>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-down" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={CHALLENGES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChallengeCard 
              challenge={item} 
              onPress={() => handleChallengePress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
    position: 'relative',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B5DF0',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  listContent: {
    padding: 16,
  },
});

export default ChallengeScreen; 