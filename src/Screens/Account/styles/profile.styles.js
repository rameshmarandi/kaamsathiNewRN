import {StyleSheet} from 'react-native'
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive'

import {useMemo} from 'react'
import {useTheme} from '../../../Hooks/ThemeContext'

export const profilePageStyle = () => {
  const theme = useTheme()

  return useMemo(
    () =>
      StyleSheet.create(
        // ---------------- Profile main style START----------------
        {
          headerContainer: {
            zIndex: 10,
          },
          statusContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: getResHeight(1),
            margin: getResHeight(2),
            borderWidth: 1.5,
            borderRadius: getResHeight(3),
          },
          statusTextContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: getResWidth(2),
          },
          statusText: {
            fontSize: getFontSize(1.6),
            marginLeft: 8,
            color: theme.color.textColor,
            fontFamily: theme.font.semiBold,
          },
          circleStyle: {
            width: getResHeight(2),
            height: getResHeight(2),
            borderRadius: getResHeight(1),
            backgroundColor: theme.color.successPrimary,
          },
          optionsContainer: {
            margin: getResWidth(4),
            borderRadius: 12,
            overflow: 'hidden',
            borderColor: theme.color.cardBorderColor,
            borderWidth: 1,
          },
          option: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: getResHeight(1.5),
            paddingHorizontal: getResWidth(4),
            borderBottomWidth: 1,
            borderBottomColor: theme.color.border,
          },
          optionContent: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          iconWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            width: getResHeight(4.5),
            height: getResHeight(4.5),
            borderRadius: 999,
            marginRight: getResWidth(2),
          },
          optionText: {
            fontSize: getFontSize(1.6),
            fontFamily: theme.font.medium,
            color: theme.color.textColor,
            textTransform: 'capitalize',
          },
          versionText: {
            textAlign: 'center',
            marginVertical: getResHeight(2),
            fontSize: getFontSize(1.5),
            fontFamily: theme.font.semiBold,
            color: theme.color.outlineColor,
          },

          // ---------------- Profile main style END ----------------

          // ---------------- Profile Deatils  START----------------

          safeArea: {
            flex: 1,
            backgroundColor: theme.color.white,
          },
          scrollContent: {
            paddingBottom: getResHeight(2),
          },
          profileCard: {
            backgroundColor: theme.color.background,
            borderColor: theme.color.cardBorderColor,
            borderWidth: 1,
            width: getResWidth(90),
            padding: getResWidth(4),
            borderRadius: getResHeight(1),
            elevation: 5,
            marginTop: getResHeight(2),
            alignSelf: 'center',
          },
          profileHeader: {
            alignItems: 'center',
            marginBottom: getResHeight(0.5),
          },
          profileImage: {
            width: getResHeight(17),
            height: getResHeight(17),
            borderRadius: getResHeight(100),
            marginBottom: getResHeight(1.3),
          },
          name: {
            fontSize: theme.fontSize.medium,
            fontFamily: theme.font.semiBold,
            letterSpacing: 1,
            color: theme.color.textColor,
          },
          detailRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: getResHeight(0.5),
          },
          detailLabel: {
            fontSize: theme.fontSize.medium,
            fontFamily: theme.font.medium,
            color: theme.color.textColor,
            minWidth: getResWidth(20),
          },
          detailValue: {
            fontSize: theme.fontSize.small,
            fontFamily: theme.font.medium,
            color: theme.color.nonActiveTextColor,
            marginLeft: getResWidth(1),
          },
          sectionContainer: {
            backgroundColor: theme.color.background,
            borderColor: theme.color.cardBorderColor,
            borderWidth: 1,
            borderRadius: getResHeight(1),
            padding: getResHeight(2),
            elevation: 3,
            marginTop: getResHeight(2),
            width: '90%',
            alignSelf: 'center',
          },
          sectionTitle: {
            marginBottom: getResHeight(1),
            fontSize: theme.fontSize.medium,
            fontFamily: theme.font.medium,
            color: theme.color.textColor,
          },
          aboutText: {
            fontSize: theme.fontSize.small,
            fontFamily: theme.font.medium,
            color: theme.color.nonActiveTextColor,
            lineHeight: getFontSize(2.5),
          },

          contactRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResHeight(1),
          },
          contactText: {
            fontSize: theme.fontSize.medium,
            fontFamily: theme.font.medium,
            color: theme.color.nonActiveTextColor,
            marginLeft: getResWidth(2),
          },
          // ---------------- Profile Deatils  END----------------
        },
      ),
    [theme],
  )
}
