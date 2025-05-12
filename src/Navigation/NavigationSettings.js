export const screenOptions = {
  headerShown: false,
  animationEnabled: true,
  // navigationBarHidden: true, // Hide the navigation bar if needed
  animation: 'fade', //
  animationDuration: 5000,
      tabBarHideOnKeyboard: true,
};

export const transitionCard = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, next, layouts}) => {
    const translateX = Animated.timing(current.progress, {
      toValue: 1,
      duration: 2000, // Adjust duration as needed
      useNativeDriver: true,
    }).interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0],
    });

    const opacity = next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        })
      : 1;

    return {
      cardStyle: {
        transform: [{translateX}],
        opacity,
      },
    };
  },
};
