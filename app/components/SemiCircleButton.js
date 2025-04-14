import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Animated, 
  PanResponder,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const DRAG_THRESHOLD = 50; // How many pixels to drag up before opening

const SemiCircleButton = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        setIsDragging(false);
        
        // If dragged up more than threshold, open the challenge screen
        if (gestureState.dy < -DRAG_THRESHOLD) {
          navigation.navigate('Challenge');
        }
        
        // Return to original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          friction: 5
        }).start();
      }
    })
  ).current;

  // Calculate styles based on drag
  const buttonStyle = {
    ...styles.button,
    transform: [
      { translateY: pan.y.interpolate({
        inputRange: [-100, 0],
        outputRange: [-20, 0],
        extrapolate: 'clamp'
      })}
    ],
    // Add subtle shadow effect when dragging
    shadowOpacity: pan.y.interpolate({
      inputRange: [-50, 0],
      outputRange: [0.4, 0.25],
      extrapolate: 'clamp'
    })
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={buttonStyle} 
        {...panResponder.panHandlers}
      >
        <Image 
          source={require('../assets/icon.png')} 
          style={styles.iconImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  button: {
    width: 120,
    height: 60,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    marginBottom: 10,
  }
});

export default SemiCircleButton; 