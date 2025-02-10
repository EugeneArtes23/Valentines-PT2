import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, { withTiming, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface SaidYesProps {
  saidYes: (isFinal: boolean) => void;
}

export function YesNo({ saidYes }: SaidYesProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const getRandomDirection = () => {
    const randomX = Math.floor(Math.random() * 400) - 150; 
    const randomY = Math.floor(Math.random() * 400) - 150; 
    return { randomX, randomY };
  };

  const handleNo = () => {
    const { randomX, randomY } = getRandomDirection();
    translateX.value = withTiming(randomX, { duration: 400, easing: Easing.out(Easing.quad) });
    translateY.value = withTiming(randomY, { duration: 400, easing: Easing.out(Easing.quad) });
  };

  const handleYes = () => {
    saidYes(true); 
  };

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Pressable onPressOut={handleYes} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#f5c3b4" : "#f8d3c8" }]}>
            <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Animated.View style={[styles.button, animatedStyle]}>
            <Pressable onPressOut={handleNo} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#f5c3b4" : "#f8d3c8" }]}>
                <Text style={styles.buttonText}>No</Text>
            </Pressable>
            </Animated.View>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    width: 300,
    padding: 20,
    borderColor: '#f4c2c2',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  buttonText: {
    fontFamily: "CutiePatootieSkinny",
    textAlign: "center",
    fontSize: 45,
    padding: 10,
  },
  button: {
    height: 50,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
});

