import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {getResHeight} from '../utility/responsive';

const WaveMarker = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    // Scale animation for expanding wave effect
    scale.value = withRepeat(
      withTiming(2, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );

    // Opacity animation for fading effect
    opacity.value = withRepeat(
      withTiming(0, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wave, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    width: getResHeight(5), // Adjust size to fit your design
    height: getResHeight(5),
    borderRadius: getResHeight(5) / 2,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red color with transparency
  },
});

export default WaveMarker;
