import React, {useMemo, useEffect, useRef} from 'react'
import {View, Text, Dimensions, StyleSheet, Animated} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {getFontSize} from '../utility/responsive'
import useAppTheme from '../Hooks/useAppTheme'

const {width: screenWidth} = Dimensions.get('window')

const StepProgressBarComp = ({step = 1, totalSteps = 1}) => {
  const theme = useAppTheme()
  const styles = useMemo(() => getStyles(theme), [theme])
  const progressWidth = screenWidth * 0.5
  const stepWidth = progressWidth / totalSteps

  return (
    <View style={[styles.progressContainer, {width: progressWidth}]}>
      {Array.from({length: totalSteps}, (_, index) => {
        const num = index + 1
        const isActive = num <= step
        const isLineActive = num < step

        return (
          <React.Fragment key={num}>
            <AnimatedCircle
              isActive={isActive}
              num={num}
              theme={theme}
              styles={styles}
            />
            {num !== totalSteps && (
              <AnimatedLine
                isActive={isLineActive}
                stepWidth={stepWidth}
                theme={theme}
                styles={styles}
              />
            )}
          </React.Fragment>
        )
      })}
    </View>
  )
}

const AnimatedCircle = ({isActive, num, theme, styles}) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.8)).current
  const bgAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current

  const COLORS = {
    primary: theme.color.primary,
    secondary: theme.color.primary,
    inactive: theme.color.placeholder,
  }

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(bgAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }, [isActive])

  return (
    <View style={styles.progressCircleContainer}>
      <Animated.View
        style={[styles.animatedCircle, {transform: [{scale: scaleAnim}]}]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.progressCircle}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.animatedCircle,
          {
            opacity: bgAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <LinearGradient
          colors={[COLORS.inactive, COLORS.inactive]}
          style={styles.progressCircle}
        />
      </Animated.View>

      <Text style={styles.progressText}>{num}</Text>
    </View>
  )
}

const AnimatedLine = ({isActive, stepWidth, theme, styles}) => {
  const lineAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current

  const COLORS = {
    primary: theme.color.primary,
    secondary: theme.color.primary,
    inactive: theme.color.placeholder,
  }

  useEffect(() => {
    Animated.timing(lineAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isActive])

  return (
    <View style={[styles.progressLineContainer, {width: stepWidth - 10}]}>
      <Animated.View style={[StyleSheet.absoluteFill, {opacity: lineAnim}]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.progressLine}
        />
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: lineAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <LinearGradient
          colors={[COLORS.inactive, COLORS.inactive]}
          style={styles.progressLine}
        />
      </Animated.View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: '4%',
      marginHorizontal: '5%',
    },
    progressCircleContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    animatedCircle: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 20,
    },
    progressCircle: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressText: {
      fontSize: getFontSize(1.8),
      fontFamily: theme.font.medium,
      color: '#fff',
      position: 'absolute',
    },
    progressLineContainer: {
      height: 6,
      borderRadius: 3,
      marginHorizontal: 5,
      overflow: 'hidden',
    },
    progressLine: {
      height: '100%',
      width: '100%',
    },
  })

export default StepProgressBarComp
