import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {getResWidth} from '../utility/responsive';
import {useSelector} from 'react-redux';
import {useTheme} from '../Hooks/ThemeContext';

const SafeAreaContainer = ({children, backgroundColor = '#ffffff'}) => {
  const theme = useTheme();

  const {isDarkMode, isUserLoggedIn} = useSelector(state => state.user);
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? '5%' : 0,
    paddingHorizontal: getResWidth(1),
  },
});

export default SafeAreaContainer;
