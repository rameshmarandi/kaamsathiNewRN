import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const bookingCardStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create(
        
       {
    listContainer: {padding: getResWidth(3)},
    cardContainer: {
      backgroundColor: theme.color.background,
      borderWidth: 1,
      borderColor: theme.color.border,
      borderRadius: getResWidth(2),
      padding: getResWidth(4),
      marginHorizontal: getResWidth(2),
      marginBottom: getResHeight(1.5),
    },

    row: {flexDirection: 'row', alignItems: 'center'},
    profilePic: {
      width: getResWidth(25),
      height: getResWidth(25),
      borderRadius: getResWidth(100),
      borderWidth: 2,
      borderColor: theme.color.primary,
    },
    detailsContainer: {marginLeft: getResWidth(4), flex: 1},
    laborName: {
      fontSize: theme.fontSize.large,
      fontFamily: theme.font.bold,
      color: theme.color.textColor,
    },
    serviceType: {
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
    },
    infoText: {
      fontSize: theme.fontSize.small,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
      marginTop: getResHeight(0.5),
    },
    statusContainer: {
      paddingVertical: getResHeight(0.5),
      paddingHorizontal: getResWidth(2),
      borderRadius: getResWidth(2),
    },
    statusText: {
      color: theme.color.textColor,
      fontSize: theme.fontSize.small,
      fontFamily: theme.font.semiBold,
      marginLeft:"4%"
    },
    progressContainer: {width: getResWidth(60)},
    progressBarBackground: {
      height: getResHeight(1.5),
      backgroundColor: '#F5F5F5', // Light gray background
      borderRadius: getResWidth(1),
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: getResWidth(1),
    },
    progressText: {
      marginTop: getResHeight(1),
      fontSize: getFontSize(1.4),
      textAlign: 'center',
      // fontFamily: theme.font.medium,
      color: 'black',
    },
    cancelButton: {
      backgroundColor: '#FF5722',

      borderRadius: getResWidth(2),
      alignItems: 'center',
      marginTop: getResHeight(1),
      paddingVertical: getResHeight(1),
      color: 'black',
      fontSize: getFontSize(1.4),
      // fontFamily: theme.font.medium,
    },
    cancelButtonText: {
      color: 'black',
      fontSize: getFontSize(1.4),
      // fontFamily: theme.font.medium,
    },
    startWorkButton: {
      backgroundColor: '#4CAF50',
      // padding: getResHeight(1.5),
      paddingVertical: getResHeight(1),
      borderRadius: getResWidth(2),
      alignItems: 'center',
      marginTop: getResHeight(1),
    },
    startWorkButtonText: {
      color: 'black',
      fontSize: getFontSize(1.4),
      // fontFamily: theme.font.medium,
    },
    controlButtons: {
      padding: getResWidth(3),
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    simulateButton: {
      backgroundColor: '#3F51B5',
      padding: 10,
      borderRadius: 5,
      margin: 5,
    },
    buttonText: {
      color: 'white',
      // fontFamily: theme.color.medium,
      fontSize: getFontSize(1.6),
    },
    quickActionCard: {
      height: getResHeight(5),
      width: getResHeight(5),
      borderColor: 'pink',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResHeight(1),
      marginLeft: getResWidth(2),
    },
    reviewContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: getResHeight(1.5),
      //
    },
    button: {
      flex: 1,
      paddingVertical: getResHeight(1),
      borderRadius: getResWidth(2),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: getResWidth(1),
    },
  }),
    [theme],
  );
};
