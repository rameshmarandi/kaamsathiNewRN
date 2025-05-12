import React, {useEffect, useRef} from 'react'
import {Animated, StatusBar, View} from 'react-native'
import {useSelector} from 'react-redux'
import BannerComponent from '../../Components/BannerComponent'
import CustomHeader from '../../Components/CustomHeader'
import SafeAreaContainer from '../../Components/SafeAreaContainer'
import useAppTheme from '../../Hooks/useAppTheme'

import SquareCardComp from './SquareCardComp'

import {SectionHeaderName} from '../../Helpers/CommonCard'
import {ROUTES} from '../../Navigation/RouteName'
import {showLoginAlert} from '../../utility/AlertService'

const specialAcces = [
  {
    id: '1',
    title: 'Gift Box',
    image: 'https://pngimg.com/d/gift_PNG100353.png',
  },
  {
    id: '2',
    title: 'Share & Earn',
    image:
      'https://www.shoppre.com/img/refer-and-earn/refer-and-earn-shoppre-shipping.png',
  },
  {
    id: '3',
    title: 'Join membership',
    image: 'https://www.epsb.co.uk/wp-content/uploads/gold-membership1.png',
  },
]

const Index = props => {
  const theme = useAppTheme()
  const {isDarkMode, isUserLoggedIn} = useSelector(state => state.user) // ✅ useSelector will re-render on state change
  const {navigation} = props
  // const [isDakModleEnalbe, setIsDarkModleEnable] = useState(false);
  const langSelectorRef = useRef()

  // useEffect(() => {
  //   setIsDarkModleEnable(isDarkMode);
  // }, [isDarkMode]);
  useEffect(() => {
    return () => {
      langSelectorRef.current = null // optional safeguard
    }
  }, [])

  // useEffect(() => {

  //   console.log("isDarkMode" , isDarkMode)
  //   if (isDarkMode) {
  //      StatusBar.setBarStyle('dark-content')
  //     // 
  //   } else {
  //    StatusBar.setBarStyle('light-content')
  //   }
  //   // const listenerId = scrollY.addListener(({value}) => {
  //   //   if (value > 50) {
  //   //     if (isDarkMode) {
  //   //       // StatusBar.setBarStyle('light-content');
  //   //       StatusBar.setBarStyle('dark-content');
  //   //     } else {
  //   //       // StatusBar.setBarStyle('dark-content');
  //   //       StatusBar.setBarStyle('light-content');
  //   //     }

  //   //     // StatusBar.setBarStyle('light-content', true);
  //   //     // StatusBar.setBackgroundColor(theme.color.primary); // For Android
  //   //   } else {

  //   //     // StatusBar.setBarStyle('light-content', true);
  //   //     // StatusBar.setBackgroundColor('#ffffff00'); // For Android
  //   //     // StatusBar.setBackgroundColor('#ffffff00'); // For Android
  //   //   }
  //   // });

  //   // return () => {
  //   //   scrollY.removeListener(listenerId);
  //   // };
  // }, [isDarkMode])
  const popularServices = [
    {
      id: '1',
      title: 'Plumber',
      image: theme.assets.plumber,
      isInternal: true,
    },

    {
      id: '2',
      title: 'Electrician',
      image: theme.assets.electrician,
      isInternal: true,
    },
    {
      id: '3',
      title: 'Labour',
      image: theme.assets.serviceLabour,
      isInternal: true,
    },
    {
      id: '4',
      title: 'Painter',
      image: theme.assets.painter,
      isInternal: true,
    },
  ]

  // Handle Scroll Event
  const scrollY = useRef(new Animated.Value(0)).current
  // const lastScrollY = useRef(0);
  // const headerHeight = useRef(new Animated.Value(1)).current; // 1: Visible, 0: Hidden

  // const handleScroll = Animated.event(
  //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
  //   {useNativeDriver: false},
  // );

  // const headerBackgroundColor = scrollY.interpolate({
  //   inputRange: [0, 100], // 👈 Scroll Y position range
  //   outputRange: [theme.color.background, theme.color.primary], // 👈 From transparent to theme color
  //   extrapolate: 'clamp',
  // });

  // const headerTextColor = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [theme.color.textColor, theme.color.background], // 👈 Light text to dark text
  //   extrapolate: 'clamp',
  // });
  return (
    <SafeAreaContainer
      style={{
        backgroundColor: theme.color.background,
      }}>
      {/* Fake StatusBar background for iOS */}
      {/* {Platform.OS === 'ios' && (
        <Animated.View
          style={{
            height: 44, // approximate statusbar height
            backgroundColor: headerBackgroundColor,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            // zIndex: 1,
          }}
        />
      )} */}

      <CustomHeader
        backgroundColor={theme.color.background}
        headerTextColor={theme.color.textColor}
        Hamburger={() => {
          if (isUserLoggedIn == false) {
            showLoginAlert()
          } else {
            navigation.navigate(ROUTES.PROFILE_STACK)
          }
        }}
        onPressNotificaiton={() => {
          if (isUserLoggedIn == false) {
            showLoginAlert()
          } else {
            navigation.navigate(ROUTES.NOTIFICATION_PAGE)
          }
        }}
        walletCount={2}
        onWalletPress={() => {
          if (isUserLoggedIn == false) {
            showLoginAlert()
          } else {
            navigation.navigate(ROUTES.PAYMENT_HISTORY)
          }
        }}
      />

      <View
        style={{
          flex: 1,
        }}>
        <Animated.FlatList
          data={[0, 1, 2, 3, 4, 5, 6]}
          // ref={flatListRef}
          keyExtractor={item => item.toString()} // Ensures unique keys
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{}}
          renderItem={({item, index}) => {
            switch (index) {
              case 0:
                return (
                  <>
                    <View style={{}}>
                      <BannerComponent {...props} />
                    </View>
                  </>
                )
                break
              case 1:
                return (
                  <>
                    <SectionHeaderName sectionName={'Special Access'} />
                    <SquareCardComp
                      data={specialAcces}
                      numColumns={3}
                      onCardPress={item => console.log('Tapped:', item)}
                    />
                  </>
                )
              case 2:
                return (
                  <>
                    <SectionHeaderName
                      sectionName={'Popular Services'}
                      rightText={'See all'}
                      onRightPress={() => {
                        navigation.navigate(ROUTES.SEARCH_STACK)
                      }}
                    />

                    <SquareCardComp
                      data={popularServices}
                      numColumns={3}
                      onCardPress={item => {
                        navigation.navigate(ROUTES.SEARCH_STACK)
                      }}
                    />
                  </>
                )
              case 3:
                return (
                  <>
                    <SectionHeaderName
                      sectionName={'Pro Finder'}
                      rightText={'See all'}
                    />

                    <SquareCardComp
                      data={popularServices}
                      numColumns={3}
                      onCardPress={item => console.log('Tapped:', item)}
                    />
                  </>
                )
            }
          }}
        />
      </View>
    </SafeAreaContainer>
  )
}

export default Index
