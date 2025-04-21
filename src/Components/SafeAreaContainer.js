import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import useAppTheme from '../Hooks/useAppTheme';
import {getResWidth} from '../utility/responsive';

const SafeAreaContainer = ({children, backgroundColor = '#ffffff'}) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.color.background}]}>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.color.background}
        />
      )}

      {children}
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: getResWidth(2),
    },
  });

export default SafeAreaContainer;
