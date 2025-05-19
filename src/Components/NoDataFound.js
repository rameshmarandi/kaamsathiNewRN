import {View, Text} from 'react-native'
import React, {memo} from 'react'
import theme from '../utility/theme'
import {getResHeight, getResWidth} from '../utility/responsive'
import LottieView from 'lottie-react-native'
import useAppTheme from '../Hooks/useAppTheme'

const NoDataFound = () => {
  const theme = useAppTheme()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.darkTheme,
      }}>
      <LottieView
        source={require('../assets/animationLoader/noDataLottie.json')}
        autoPlay
        loop
        style={{
          height: getResHeight(80),
          width: getResWidth(80),
        }}
      />
    </View>
  )
}

export default memo(NoDataFound) // Export the memoized NoDataFound;
