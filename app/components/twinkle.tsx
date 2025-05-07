import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FloatingStar = ({ delay = 0, left, top, size }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -30,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.star,
        {
          left,
          top,
          fontSize: size,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      ✦
    </Animated.Text>
  );
};

const AnimatedStars = () => {
  const starsConfig = [
    { left: 0, top: -20, delay: 0, size: 16 },
    { left: 30, top: 0, delay: 300, size: 20 },
    { left: -40, top: -20, delay: 0, size: 16 },
    { left: 20, top: 0, delay: 300, size: 20 },
    { left: -10, top: -30, delay: 600, size: 14 },
    { left: 10, top: 10, delay: 900, size: 18 },
    { left: 30, top: -10, delay: 1200, size: 22 },
    { left: 50, top: -25, delay: 1500, size: 16 },
    { left: -40, top: 20, delay: 1800, size: 12 },
    { left: 40, top: 20, delay: 2100, size: 15 },
    // More stars
    { left: -60, top: -50, delay: 2400, size: 18 },
    { left: 20, top: -40, delay: 2700, size: 14 },




  ];

  return (
    <View style={styles.container}>
      {starsConfig.map((star, index) => (
        <FloatingStar
          key={index}
          left={star.left}
          top={star.top}
          delay={star.delay}
          size={star.size}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 200,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    color: '#c084fc',
  },
});

export default AnimatedStars;
