import React, {useEffect} from 'react'
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native'
import useAppTheme from '../Hooks/useAppTheme'
import {getResWidth} from '../utility/responsive'
import {useSelector} from 'react-redux'

const SafeAreaContainer = ({children, backgroundColor = '#ffffff'}) => {
  const theme = useAppTheme()
  const styles = getStyles(theme)

  const {isDarkMode, isUserLoggedIn} = useSelector(state => state.user)
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.color.background}]}>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.color.background}
        />
      )}

      {children}
    </SafeAreaView>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: getResWidth(1),
    },
  })

export default SafeAreaContainer
