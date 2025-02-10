import { useEffect } from 'react';
import { StyleSheet,Image, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const ANGLE = 2;
const TIME = 500;
const EASING = Easing.elastic(1.5);


export function BoosterPack() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withSequence(
        withTiming(-ANGLE, { duration: TIME, easing: EASING}),
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          -1,
          true
        )
      );
    }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotationAnimation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
    <Animated.View style={animatedStyle}>
        <Image source={require('@/assets/images/booster-pack.png')} style={styles.box} />
    </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '65%',
    },
    box: {
      height: 600,
      width: 600
    },
  });