import React, {useEffect, useRef, useState} from 'react'
import {Animated, FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'
import BannerComponent from '../../Components/BannerComponent'
import CustomHeader from '../../Components/CustomHeader'
import SafeAreaContainer from '../../Components/SafeAreaContainer'

import {SectionHeaderName} from '../../Helpers/CommonCard'
import {useTheme} from '../../Hooks/ThemeContext'
import {ROUTES} from '../../Navigation/RouteName'
import {showLoginAlert} from '../../utility/AlertService'
import {employees} from '../Booked/BookMarks'
import {EmployeeCard} from '../Booked/EmployeeCard'
import SquareCardComp from './SquareCardComp'
import BookNowFilterModal from '../ModalScreens/BookNowFilterModal'
import ModalMap from '../SearchPage/ModalMap'
import {userLocation} from '../SearchPage/Index'

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
export const LOCAL_BASE_URL = 'http://192.168.0.1:8085/api/v1'
const Index = props => {
  const theme = useTheme()
  // const styles = useHomePageStyle();
  const {isDarkMode, isUserLoggedIn} = useSelector(state => state.user) // ✅ useSelector will re-render on state change
  const {navigation} = props
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false)
  const [isMapModalVisible, setIsMapModalVisible] = useState(false)
  const langSelectorRef = useRef()

  // useEffect(() => {
  //   setIsDarkModleEnable(isDarkMode);
  // }, [isDarkMode]);

  useEffect(() => {
    // _apiCalling()
    return () => {
      langSelectorRef.current = null // optional safeguard
    }
  }, [])

  //   const _apiCalling = async()=>{
  //     try {

  //      const res = await axios.get(
  //   `${LOCAL_BASE_URL}/user/getSkills`,
  //   {}, // Request body (empty object if no data is needed)
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',

  //     },
  //   }
  // );

  //     console.log("API_RES", res)
  //   } catch (error) {
  //     console.error("API_Fetch_Error" , error)
  //   }
  // }

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

  return (
    <SafeAreaContainer>
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

      {/* <ModalMap
        isVisible={isMapModalVisible}
        onClose={() => {
          setIsMapModalVisible(false);
          // setSearchText('');
          // setFilteredSkills(uniqueSkills);
          // setIsMapModalVisible(false);
        }}
        onComplete={() => props.navigation.navigate(ROUTES.BOOKING_STACK)}
        userLocation={userLocation}
        onBookNow={() => {}}
      /> */}

      <View
        style={{
          flex: 1,
        }}>
        <View>
          <BookNowFilterModal
            isModalVisible={isBookingModalVisible}
            onBackdropPress={() => {
              console.log('ONPREss_press')
              setIsBookingModalVisible(false)
            }}
            onConfirmPress={() => {
              setIsBookingModalVisible(false)
              setIsMapModalVisible(true)
            }}
          />
        </View>
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
                        setIsBookingModalVisible(true)

                        // navigation.navigate(ROUTES.SEARCH_STACK);
                      }}
                    />
                  </>
                )
              case 3:
                return (
                  <>
                    <View
                      style={{
                        marginBottom: '3%',
                      }}>
                      <SectionHeaderName
                        sectionName={'Pro Finder'}
                        rightText={'See all'}
                        onRightPress={() => {
                          navigation.navigate(ROUTES.SEARCH_STACK, {
                            isProFindSearch: true,
                          })
                        }}
                      />
                    </View>
                    <ProFindComp
                      onHireBtnPress={() => {
                        setIsBookingModalVisible(true)
                      }}
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

const ProFindComp = props => {
  const {onHireBtnPress} = props
  return (
    <FlatList
      data={employees.filter(item => item.isBookmarked)}
      horizontal
      keyExtractor={item => item.id.toString()}
      pagingEnabled
      snapToAlignment='center'
      decelerationRate='fast'
      renderItem={({item, index}) => (
        <View
          style={[
            {
              marginRight: 5,
            },

            {
              marginLeft: index == 0 ? 0 : 5,
            },
          ]}>
          <EmployeeCard
            id={item.id}
            distance={item.distance}
            isSelected={false}
            isHideHeartIcons={true}
            btnText='Hire Now'
            onBtnPress={onHireBtnPress}
            workerDetails={item.workerDetails}
          />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: '5%', // Additional padding if needed
      }}
    />
  )
}
export default Index
