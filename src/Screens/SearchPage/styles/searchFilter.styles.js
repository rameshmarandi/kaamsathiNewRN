import {StyleSheet} from 'react-native'
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive'

import {useMemo} from 'react'
import {useTheme} from '../../../Hooks/ThemeContext'

export const searchFilterStyles = () => {
  const theme = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: theme.color.background,
        },
        card: {
          flex: 1,
          backgroundColor: theme.color.background,
          borderWidth: 1,
          borderColor: theme.color.primary,
          borderRadius: 12,
          marginHorizontal: 4,
          padding: 10,
          alignItems: 'center',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: 3,
          position: 'relative',
        },
        icon: {
          marginBottom: 6,
        },
        textBox: {
          alignItems: 'center',
        },
        label: {
          fontSize: theme.fontSize.small,
          fontFamily: theme.font.medium,
          color: theme.color.textColor,
        },
        value: {
          fontSize: 13,
          fontWeight: '600',
          color: theme.color.textColor,
          marginTop: 2,
          textAlign: 'center',
        },
        arrow: {
          position: 'absolute',
          right: '5%',
          top: '5%',
        },
      }),
    [theme],
  )
}
