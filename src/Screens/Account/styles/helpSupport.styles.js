import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const helpSuportPageStyle = () => {
  const theme = useTheme();


  return useMemo(
    () =>
      StyleSheet.create(
        
        {
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.color.background,
    },
    header: {
      fontSize: theme.font.small,
      fontFamily: theme.font.semiBold,
      color: theme.color.textColor,
      marginBottom: getResHeight(2),

    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: theme.color.primary,

      paddingVertical: getResHeight(1.5),
      borderRadius: getResHeight(2.5),
      justifyContent: 'center',
      marginVertical: getResHeight(0.8),
    },
    buttonText: {
      fontSize: theme.font.xSmall,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
      marginLeft: getResWidth(2),
    },

    // FAQ

      itemContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.color.cardBorderColor,
      marginBottom: getResHeight(1.3),
      paddingVertical: getResHeight(1.3),
      borderRadius: getResHeight(1),
      backgroundColor: theme.color.background,
    },
    itemHeader: {
      paddingHorizontal: getResHeight(1.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitleContainer: {
      width: getResWidth(70),
    },
    itemTitle: {
      fontFamily: theme.font.medium,
      fontSize: getFontSize(1.6),
    },
    itemContent: {
      lineHeight: 27,
      paddingHorizontal: getResHeight(1.3),
      paddingVertical: getResHeight(1),
      fontFamily: theme.font.medium,
   
    },
  }),
    [theme],
  );
};
