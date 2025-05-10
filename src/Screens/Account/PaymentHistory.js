import React, {useMemo, useState, memo, useCallback} from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {CircularProgress} from 'react-native-circular-progress'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CustomHeader from '../../Components/CustomHeader'
import {initiatePayment} from '../../Components/PaymentHandler'
import SafeAreaContainer from '../../Components/SafeAreaContainer'
import {VectorIcon} from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive'
import NoDataFound from '../../Components/NoDataFound'

const tabArray = [
  {id: 0, icon: 'list', label: 'History'},
  {id: 1, icon: 'list', label: 'Credit'},
  {id: 2, icon: 'refresh', label: 'Refund'},
]

const PaymentHistory = ({navigation}) => {
  const theme = useAppTheme()
  const styles = useMemo(() => getStyles(theme), [theme])

  const [activeTab, setActiveTab] = useState(0)
  const [spent, setSpent] = useState(0)
  const [historyTransc, setHistoryTransc] = useState([])
  const [creditTransc, setCreditTransc] = useState([])
  const [refundTransc, setRefundTransc] = useState([])

  const handleTransaction = useCallback(
    (amount = 10, type) => {
      const newSpent = type === 'spend' ? spent + amount : spent - amount
      if (newSpent < 0 || newSpent > 100) return

      setSpent(newSpent)
      setHistoryTransc(prev => [
        {
          id: Date.now(),
          amount,
          type,
          date: new Date().toISOString(),
        },
        ...prev,
      ])
    },
    [spent],
  )

  const handlePaymentGateway = useCallback(() => {
    initiatePayment(
      '100',
      {},
      async data => {
        if (data?.razorpay_payment_id) {
          // Handle success logic here
        }
      },
      async data => {
        console.error('API_FES', data)
      },
    )
  }, [])

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <TransactionList
            transactions={historyTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        )
      case 1:
        return (
          <TransactionList
            transactions={creditTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        )
      case 2:
        return (
          <TransactionList
            transactions={refundTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        )
      default:
        return null
    }
  }, [activeTab, historyTransc, creditTransc, refundTransc, styles])

  return (
    <SafeAreaContainer>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle='Payment History'
      />
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressCard
          spent={spent}
          styles={styles}
          onBuyCoins={() => handlePaymentGateway}
          removeCoin={() => handleTransaction(10, 'spend')}
          addCoins={() => handleTransaction(10, 'add')}
        />

        <View style={styles.tabs}>
          {tabArray.map(tab => (
            <TabItem
              key={tab.id}
              iconName={tab.icon}
              label={tab.label}
              tabName={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              theme={theme}
              styles={styles}
            />
          ))}
        </View>

        {renderContent()}
      </ScrollView>
    </SafeAreaContainer>
  )
}

const TabItem = memo(
  ({iconName, label, tabName, activeTab, setActiveTab, theme, styles}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}>
      <Ionicons
        name={iconName}
        color={
          activeTab === tabName
            ? theme.color.background
            : theme.color.background
        }
        size={20}
      />
      <Text
        style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  ),
)

const ProgressCard = memo(
  ({spent, styles, onBuyCoins, removeCoin, addCoins}) => {
    const theme = useAppTheme()
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Wallet Overview</Text>
        <View style={styles.balanceCard}>
          {/* Remove later */}

          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={removeCoin}
              style={{
                marginRight: '15%',
              }}>
              <VectorIcon
                type={'Entypo'}
                name={'minus'}
                size={getFontSize(3)}
                color={theme.color.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={addCoins}
              // style={styles.buyButton}
            >
              <VectorIcon
                type={'Entypo'}
                name={'plus'}
                size={getFontSize(3)}
                color={theme.color.white}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.balanceText}>Available Points</Text>
            <View style={styles.progressSection}>
              <CircularProgress
                size={getResHeight(20)}
                width={getResWidth(3)}
                fill={100 - spent}
                tintColor={theme.color.successPrimary}
                backgroundColor='#f0f0f8'
                rotation={0}
                lineCap='round'>
                {() => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.progressValue}>{spent}/100</Text>
                    <Text style={styles.progressLabel}>Points Used</Text>
                  </View>
                )}
              </CircularProgress>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBuyCoins}
            style={styles.buyButton}>
            <VectorIcon
              type={'MaterialCommunityIcons'}
              name={'hand-coin'}
              size={getFontSize(3)}
              color={theme.color.white}
            />
            <Text style={styles.buyText}>Buy coins</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)

const TransactionList = memo(({transactions, styles}) => (
  <FlatList
    data={transactions}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <View style={styles.transactionCard}>
        <Ionicons
          name={item.type === 'spend' ? 'arrow-up' : 'arrow-down'}
          size={20}
          color={item.type === 'spend' ? '#ff6b6b' : '#4ecdc4'}
        />
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'spend' ? styles.spent : styles.refunded,
          ]}>
          {item.type === 'spend' ? '-' : '+'}
          {item.amount}
        </Text>
      </View>
    )}
    ListEmptyComponent={() => (
      <View
        style={{
          marginTop: getResHeight(-23),
        }}>
        <NoDataFound />
      </View>
    )}
  />
))

const getStyles = theme =>
  StyleSheet.create({
    content: {
      padding: getResHeight(2.8),
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
      color: theme.color.white,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
      backgroundColor: theme.color.textColor,
      borderRadius: 12,
      padding: 8,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    activeTab: {
      backgroundColor: theme.color.primaryRGBA,
    },
    tabText: {
      fontSize: theme.fontSize.medium,

      fontFamily: theme.font.medium,
      color: theme.color.background,
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
      color: theme.color.dimBlack,
      fontFamily: theme.font.medium,
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
  })

export default memo(PaymentHistory)
