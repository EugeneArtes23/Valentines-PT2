import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable, ScrollView, Easing, Button } from "react-native";
import { FadeIn, FadeOutDown } from 'react-native-reanimated';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { BoosterPack } from "@/components/BoosterPack";
import { CardSwipe } from "@/components/CardSwipe";
import { YesNo } from "@/components/YesNo";



export default function Index() {
  const [hasExploded, setHasExploded] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [isFinalCard, setIsFinalCard] = useState(false);
  const [saidYes, setSaidYes] = useState(false);




  const userSaidYes = () => {
    setSaidYes(true);
  };

  const handleFinalCardReached = (isFinal: boolean) => {
    setIsFinalCard(isFinal);
  };

  const openBoosterPack = () => {
    setHasExploded(true);
    setTimeout(() => {
      setShowCards(true);
    }, 800);
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(750).easing(Easing.out(Easing.quad))} exiting={FadeOutDown.duration(750).easing(Easing.out(Easing.quad))}>
      {!hasExploded ? (
        <>
          <Text style={styles.text}>Someone special sent you a booster pack! :)</Text>
          <BoosterPack />
          <Pressable onPressOut={openBoosterPack} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "#f5c3b4" : "#f8d3c8" }]}>
            <Text style={styles.buttonText}>Open?</Text>
          </Pressable>
        </>
      ) : !showCards ? (
        <Image source={require("@/assets/gifs/explosion.gif")} style={styles.explosion} />
      ) : !isFinalCard ?(
        <CardSwipe onFinalCardReached={handleFinalCardReached}/>
      ) : !saidYes ?(
        <View style={styles.container}>
          <Animated.View entering={FadeIn.duration(750).easing(Easing.ease)} >
          <Image source={require('@/assets/images/card5.png')} style={styles.image}/>
        </Animated.View>
        <YesNo saidYes={userSaidYes}/>
        </View>
      ): (
        <View style={styles.container}>
          <Text style={styles.text}>Yippie!! See you on Valentines :D</Text>
          <Image source={require('@/assets/gifs/hearts.gif')}/>
          <Text style={styles.textSmall}>These hearts are for you {'<3'}</Text>
        </View>
      )
    }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontFamily: "CutiePatootieSkinny",
    fontSize: 50,
  },
  textSmall:{
    textAlign: "center",
    fontFamily: "CutiePatootieSkinny",
    fontSize: 35,
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
  explosion: {
    position: "absolute",
    width: 850,
    height: 850,
    zIndex: 10,
  },
  image: {
    height: 600,
    width: 425,
    padding: 30,
  },
});
