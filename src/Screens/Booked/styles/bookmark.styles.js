import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const bookMarkStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create(
        
       {
    container: {
      flex: 1,
      backgroundColor: theme.color.whiteBg,
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    listContentContainer: {
      // paddingTop: 70, // Ensure the list starts below the header
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: theme.color.dimBlack,
      fontFamily: theme.font.medium,
      fontSize: getFontSize(1.4),
    },
  }),
    [theme],
  );
};
