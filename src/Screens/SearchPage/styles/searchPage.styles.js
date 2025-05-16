import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const searchPageStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        searchContainer: {paddingHorizontal: '5%', marginTop: 10, flex: 1},
        searchSection: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: '2%',
        },
        searchText: {
          color: theme.color.textColor,
          fontFamily: theme.font.medium,
          fontSize: theme.fontSize.large,
          marginTop: '3%',
          marginLeft: '2%',
        },
        noDataFoundContainer: {
          marginTop: getResHeight(-13),
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: getResWidth(6),
        },
        pillsContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: 100,
          marginTop: 10,
        },
      }),
    [theme],
  );
};
