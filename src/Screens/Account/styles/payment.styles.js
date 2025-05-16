import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';

import {useMemo} from 'react';
import {useTheme} from '../../../Hooks/ThemeContext';

export const paymentPageStyle = () => {
  const theme = useTheme();

  // 1.  payment History style ( Payment history style START)
  // 2. Purchanges Contian style (Purchanges pages styles START )

  return useMemo(
    () =>
      StyleSheet.create({
        // Payment history style START---------
        content: {
          padding: getResHeight(1.8),
        },
        header: {
          marginBottom: getResHeight(2),
        },
        title: {
          fontSize: theme.fontSize.medium,
          fontFamily: theme.font.semiBold,
          color: theme.color.textColor,
          marginBottom: getResHeight(1),
        },
        balanceCard: {
          backgroundColor: theme.color.background,
          borderWidth: 1,
          borderColor: theme.color.border,
          borderRadius: 16,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        balanceText: {
          fontSize: theme.fontSize.medium,
          color: theme.color.nonActiveTextColor,
          fontFamily: theme.font.medium,
          marginBottom: '5%',
          textAlign: 'center',
        },
        progressSection: {
          alignItems: 'center',
        },
        progressTextContainer: {
          alignItems: 'center',
        },
        progressValue: {
          fontSize: getFontSize(3.5),
          fontFamily: theme.font.semiBold,
          color: theme.color.primary,
        },
        progressLabel: {
          fontSize: theme.fontSize.medium,
          color: theme.color.textColor,
          marginTop: 8,
        },
        buyButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: getResHeight(5),
          paddingVertical: getResHeight(0.3),
          paddingHorizontal: getResWidth(2),
          borderRadius: 12,
          backgroundColor: theme.color.primary,
        },
        buyText: {
          fontFamily: theme.font.semiBold,
          fontSize: theme.font.small,
          color: theme.color.background,
          marginLeft: getResWidth(1),
        },
        tabs: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
          backgroundColor: '#f2f2f2',
          //  theme.color.dimBlack,
          borderColor: theme.color.border,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: '1%',
          paddingVertical: '2%',
        },
        tab: {
          flex: 1,
          alignItems: 'center',
          paddingVertical: getResHeight(1),
          borderRadius: 30,
          flexDirection: 'row',
          justifyContent: 'center',

          gap: 8,
        },
        activeTab: {
          backgroundColor: theme.color.primary,
        },
        tabText: {
          fontSize: theme.fontSize.medium,

          fontFamily: theme.font.medium,
          color: theme.color.background,
          marginTop: '2%',
        },
        activeTabText: {
          color: theme.color.background,
          fontSize: theme.fontSize.medium,
          fontFamily: theme.font.semiBold,
        },
        transactionCard: {
          backgroundColor: theme.color.background,
          borderWidth: 1,
          borderColor: theme.color.border,
          borderRadius: getResHeight(1),
          padding: '4%',
          marginBottom: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        },
        transactionInfo: {
          flex: 1,
        },
        transactionType: {
          fontSize: theme.fontSize.medium,

          color: theme.color.textColor,
          fontFamily: theme.font.semiBold,
        },
        transactionDate: {
          fontSize: theme.fontSize.small,
          color: theme.color.textColor,
          fontFamily: theme.font.regular,
        },
        transactionAmount: {
          fontSize: theme.fontSize.extraLarge,
          fontFamily: theme.font.semiBold,
        },
        spent: {
          color: '#ff6b6b',
        },
        refunded: {
          color: '#4ecdc4',
        },
        refundContainer: {
          marginTop: 16,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#2d3142',
          marginBottom: 16,
        },
        refundCard: {
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
          gap: 12,
        },
        refundText: {
          color: '#888',
          fontSize: 16,
        },
        refundButton: {
          backgroundColor: '#f0f2ff',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          marginTop: 12,
        },
        refundButtonText: {
          color: theme.color.secondary2,
          fontWeight: '600',
        },

        // Purchanges pages styles START --------
        sectionTitle: {
          fontSize: getResWidth(4),
          fontFamily: theme.font.bold,
          color: theme.color.textColor,
          marginBottom: getResHeight(2),
          marginTop: getResHeight(1.3),
          paddingLeft: getResWidth(5),
        },
        coinCard: {
          width: getResWidth(40),
          backgroundColor: theme.color.background,
          borderRadius: 20,
          padding: getResWidth(4),
          margin: getResWidth(2),
          alignItems: 'center',
          borderWidth: 2,
          borderColor: theme.color.border,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        },
        selectedCard: {
          borderColor: theme.color.primary,
          shadowColor: theme.color.primary,
          shadowOpacity: 0.2,
        },
        subscriptionCard: {
          width: getResWidth(50),
          backgroundColor: theme.color.background,
          borderRadius: 20,
          padding: getResWidth(4),
          margin: getResWidth(2),
          alignItems: 'center',
          borderWidth: 2,
          borderColor: theme.color.border,
        },
        tag: {
          position: 'absolute',
          top: -10,
          right: -10,

          borderRadius: 15,
        },
        tagText: {
          color: '#fff',
          fontFamily: theme.font.semiBold,
          fontSize: getResWidth(2.5),
          paddingHorizontal: getResWidth(1),
          paddingVertical: getResHeight(0.5),
        },
        coinAmount: {
          fontSize: getResWidth(6),
          fontFamily: theme.font.bold,
          color: theme.color.textColor,
          marginVertical: getResHeight(1),
        },
        coinLabel: {
          color: theme.color.dimBlack,
          fontSize: getResWidth(3.5),
        },
        price: {
          fontSize: getResWidth(5),
          fontFamily: theme.font.bold,
          color: theme.color.primary,
          marginVertical: getResHeight(1),
        },
        packageLabel: {
          fontSize: getResWidth(3.2),
          color: theme.color.dimBlack,
          textAlign: 'center',
        },
        months: {
          fontSize: getResWidth(4.5),
          fontFamily: theme.font.bold,
          color: theme.color.textColor,
          marginVertical: getResHeight(1),
        },
        discount: {
          color: '#4ECDC4',
          fontFamily: theme.font.semiBold,
          fontSize: getResWidth(3),
        },
        perMonth: {
          color: theme.color.dimBlack,
          fontSize: getResWidth(3),
        },
        purchaseButton: {
          marginVertical: getResHeight(4),
          borderRadius: 25,
          overflow: 'hidden',
          marginHorizontal: getResWidth(5),
        },
        buttonGradient: {
          paddingVertical: getResHeight(2),
          alignItems: 'center',
        },
        buttonText: {
          color: '#fff',
          fontFamily: theme.font.bold,
          fontSize: getResWidth(4),
        },

        // Coin purchagnes

        benefitsContainer: {
          backgroundColor: theme.color.backgroundSecondary,
          borderRadius: 15,
          padding: getResWidth(4),
          marginVertical: getResHeight(2),
          marginHorizontal: getResWidth(2),
        },
        benefitsTitle: {
          fontSize: getResWidth(4.2),
          fontFamily: theme.font.semiBold,
          color: theme.color.textColor,
          marginBottom: getResHeight(2),
          textAlign: 'left',
          letterSpacing: 0.5,
        },
        benefitRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: getResHeight(1.2),
        },
        benefitText: {
          fontSize: theme.fontSize.medium,
          color: theme.color.textColor,
          fontFamily: theme.font.regular,
        },
        // Purchanges pages styles END --------
      }),
    [theme],
  );
};
