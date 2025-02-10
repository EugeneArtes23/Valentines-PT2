import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Pressable, Text } from 'react-native';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const images = [
  require('@/assets/images/Hydrangea.png'),
  require('@/assets/images/EepyTime.png'),
  require('@/assets/images/StrawberryPocky.png'),
  require('@/assets/images/Meep.png'),
  require('@/assets/images/card5.png'),
];

interface CardSwipeProps {
  onFinalCardReached: (isFinal: boolean) => void;
}

export function CardSwipe({ onFinalCardReached }: CardSwipeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  useEffect(() => {
    if (currentIndex === images.length - 1) {
      onFinalCardReached(true);
    } else {
      onFinalCardReached(false);
    }
  }, [currentIndex, onFinalCardReached]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: 750 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          key={currentIndex}
          source={images[currentIndex]}
          style={styles.image}
        />
      </Animated.View>
      
      {currentIndex < images.length - 1 && (
        <Pressable onPressOut={handleNext} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#f5c3b4" : "#f8d3c8" }]}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    height: 600,
    width: 425,
  },
  buttonText: {
    fontFamily: "CutiePatootieSkinny",
    textAlign: "center",
    fontSize: 45,
  },
  button: {
    height: 50,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
