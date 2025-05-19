import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const bookingStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        listContainer: {
          padding: getResWidth(1),
        },
        simulateButton: {
          backgroundColor: '#3F51B5',
          padding: 10,
          borderRadius: 5,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonText: {
          color: theme.color.textColor,
          fontSize: getFontSize(1.6),
        },
        controlButtons: {
          marginBottom: getResHeight(1),
        },
      }),
    [theme],
  );
};
