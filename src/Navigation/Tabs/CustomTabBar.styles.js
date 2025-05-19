import {StyleSheet} from 'react-native';
import {getResHeight} from '../../utility/responsive';
import {useTheme} from '../../Hooks/ThemeContext';
import {useMemo} from 'react';

export const useTabBarStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.color.background,
        },
        tabBar: {
          flexDirection: 'row',
          backgroundColor: theme.color.card,
          borderRadius: getResHeight(4),
          paddingVertical: getResHeight(2),
          paddingHorizontal: getResHeight(2),
          borderWidth: 0.7,
          borderColor: theme.color.border,
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        iconWrapper: {
          flex: 1,
          alignItems: 'center',
        },
        iconCircle: {
          padding: getResHeight(0.7),
          borderRadius: getResHeight(2),
        },
        middleTabWrapper: {},
        middleIcon: {
          height: getResHeight(6.5),
          width: getResHeight(6.5),
          borderRadius: getResHeight(3.25),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.color.primary,
          borderWidth: 3,
          borderColor: theme.color.white,
        },
        tabText: {
          marginTop: getResHeight(0.5),
          fontSize: theme.fontSize.xSmall,
          color: theme.color.textColor, // Added for better theming
        },
      }),
    [theme],
  );
};
