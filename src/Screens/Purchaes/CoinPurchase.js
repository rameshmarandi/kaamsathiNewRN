import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../Components/CustomButton'
import CustomHeader from '../../Components/CustomHeader'
import {initiatePayment} from '../../Components/PaymentHandler'
import SafeAreaContainer from '../../Components/SafeAreaContainer'
import {VectorIcon} from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive'

// Add this array in your component (before return)
const benefitsData = [
  {
    id: 1,
    icon: 'shield-checkmark',
    text: 'Secure & instant coin delivery',
  },
  {
    id: 2,
    icon: 'rocket',
    text: 'Boost your experience with premium features',
  },
  {
    id: 3,
    icon: 'infinite',
    text: 'Coins never expire - use them anytime',
  },
  {
    id: 4,
    icon: 'gift',
    text: 'Exclusive bonuses for premium members',
  },
  {
    id: 5,
    icon: 'headset',
    text: '24/7 priority customer support',
  },
  {
    id: 6,
    icon: 'card',
    text: 'Special member-only discounts',
  },
  {
    id: 7,
    icon: 'sparkles',
    text: 'Early access to new features',
  },
  {
    id: 8,
    icon: 'phone-portrait',
    text: 'Multi-device access & sync',
  },
  {
    id: 9,
    icon: 'eye-off',
    text: 'Ad-free premium experience',
  },
  {
    id: 10,
    icon: 'people',
    text: 'Exclusive community access',
  },
]

const coinPackages = [
  {id: 1, coins: 50, price: 49, label: 'Starter Pack'},
  {id: 2, coins: 100, price: 199, label: 'Popular Choice', tag: 'Popular'},
  {id: 3, coins: 200, price: 299, label: 'Mega Bundle'},
]

const subscriptionPlans = [
  {id: 1, months: 3, price: 499, discount: 'Save 10%'},
  {id: 2, months: 6, price: 899, discount: 'Save 20%'},
  {id: 3, months: 12, price: 1499, discount: 'Save 35%'},
]

const PaginationIndicator = ({data, activeIndex, itemWidth, cardWidth}) => {
  const theme = useAppTheme()
  const styles = createStyles(theme)
  //   const translateX = useRef(new Animated.Value(0)).current;

  const background_Color = useCallback(
    index => {
      if (index == activeIndex) {
        return theme.color.primary
      } else {
        return theme.color.cardBorderColor
      }
    },
    [activeIndex],
  )
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getResHeight(2),
        width: getResWidth(20),
        alignSelf: 'center',
      }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            height: getResHeight(0.8),
            width: getResWidth(6),
            backgroundColor: background_Color(index),

            borderRadius: 10,
          }}
        />
      ))}
    </View>
  )
}

const CoinPurchase = ({navigation}) => {
  const theme = useAppTheme()
  const styles = createStyles(theme)
  const flatListRef = useRef(null)

  const [selectedCoin, setSelectedCoin] = useState(2)
  const [activeIndex, setActiveIndex] = useState(1)
  const [selectedCoinPackage, setSelectedCoinPackage] = useState('')
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Scroll to default selected coin after layout
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: true,
        viewPosition: 0.5,
      })
    }, 100)
  }, [])

  useEffect(() => {
    extractCoinDetails()
  }, [selectedCoin])

  const extractCoinDetails = () => {
    const extractedCode = coinPackages.filter(
      (item, index) => Number(item.id) === Number(selectedCoin),
    )
    setSelectedCoinPackage(extractedCode)
    return true
  }
  //   , [selectedCoin])

  const handlePurchase = () => {
    try {
      setIsLoading(true)

    //   const isExtracted = extractCoinDetails()

    //   if (isExtracted) {
        let amount = selectedCoinPackage[0].price

        initiatePayment(
          Number(amount),
          {},
          async data => {
            if (data?.razorpay_payment_id) {
              // Handle success logic here
            }
            setIsLoading(false)
          },
          async data => {
            console.error('API_FES', data)
            setIsLoading(false)
          },
        )
    //   }
    } catch (error) {
      setIsLoading(false)
      console.error('Payment_initlization_Failed', error)
    }
  }

  const handleCoinSelect = useCallback((item, index) => {
    setSelectedCoin(item.id)
    setActiveIndex(index)

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    })
    // extractCoinDetails()
  }, [])
  const CoinCard = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleCoinSelect(item, index)}
      style={[
        styles.coinCard,
        selectedCoin === item.id && styles.selectedCard,
      ]}>
      {item.tag && (
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.tag}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </LinearGradient>
      )}
      <Image
        source={theme.assets.kaamsathiCoin}
        style={{
          height: getResHeight(13),
          width: getResHeight(13),
        }}
      />

      <Text style={styles.coinAmount}>{item.coins}</Text>
      <Text style={styles.coinLabel}>Coins</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.packageLabel}>{item.label}</Text>
    </TouchableOpacity>
  )

  const SubscriptionCard = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelectedSubscription(item.id)}
      style={[
        styles.subscriptionCard,
        selectedSubscription === item.id && styles.selectedCard,
      ]}>
      <Ionicons name='calendar' size={30} color={theme.color.primary} />
      <Text style={styles.months}>{item.months} Months</Text>
      <Text style={styles.discount}>{item.discount}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.perMonth}>
        ₹{(item.price / item.months).toFixed(0)}/mo
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaContainer>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle='Purchase Coin'
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Coin Packages Section */}
        <Text style={styles.sectionTitle}>Coin Packages</Text>
        <FlatList
          ref={flatListRef}
          data={coinPackages}
          renderItem={({item, index}) => <CoinCard item={item} index={index} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: getResWidth(44),
            offset: getResWidth(44) * index,
            index,
          })}
          initialScrollIndex={1}
          contentContainerStyle={styles.packagesContainer}
        />

        <PaginationIndicator data={coinPackages} activeIndex={activeIndex} />

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Why Choose Us?</Text>
          {benefitsData.map((benefit, index) => (
            <View key={benefit.id} style={styles.benefitRow}>
              <Text
                style={[
                  styles.benefitText,
                  {
                    marginRight: '5%',
                  },
                ]}>{`${index + 1}.`}</Text>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>
        {/* Subscription Plans Section */}
        <Text style={styles.sectionTitle}>Subscription Plans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {subscriptionPlans.map(item => (
            <SubscriptionCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: getResWidth(6),
        }}>
        <CustomButton
          title={'Purchaes Now'}
          onPress={handlePurchase}
          disabled={
            isLoading
            // || isLoginDisabled
          }
          loading={isLoading}
          leftIcon={
            <VectorIcon
              type='MaterialCommunityIcons'
              name={'credit-card-lock-outline'}
              size={getFontSize(3.5)}
              color={theme.color.background}
            />
          }
        />
      </View>
    </SafeAreaContainer>
  )
}

const createStyles = theme =>
  StyleSheet.create({
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
  })

export default CoinPurchase
