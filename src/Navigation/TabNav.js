import React, {useCallback, useMemo, memo, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';
import {VectorIcon} from '../Components/VectorIcon';

import {useSelector} from 'react-redux';
import {
  BookMarksStack,
  HistoryStack,
  HomeStack,
  ProfileStack,
  SearchStack,
} from './StackNav';

import {store} from '../redux/store';

import {showLoginAlert} from '../utility/AlertService';
import {useTranslation} from 'react-i18next';
import useAppTheme from '../Hooks/useAppTheme';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {setCurrentActiveTab} from '../redux/reducer/Auth';
const theme = useAppTheme();
const Tab = createBottomTabNavigator();

const tabArrays = [
  {
    // title: 'Home',
    translationKey: 'homeTab',
    icon: {type: 'Feather', name: 'home'},
    activeIcon: {type: 'Entypo', name: 'home'},
    routeNames: 'HomePage',
    component: HomeStack,
  },
  {
    // title: 'Search',
    translationKey: 'searchTab',
    icon: {type: 'Ionicons', name: 'search-outline'},
    activeIcon: {type: 'Ionicons', name: 'search-sharp'},
    routeNames: 'SearchOnMap',
    component: SearchStack,
  },
  {
    translationKey: 'bookingTab',
    icon: {type: 'MaterialCommunityIcons', name: 'history'},
    activeIcon: {type: 'MaterialCommunityIcons', name: 'history'},
    routeNames: 'BookedHistory',
    component: HistoryStack,
  },
  {
    translationKey: 'bookmarkTab',
    icon: {type: 'Ionicons', name: 'bookmark-outline'},
    activeIcon: {type: 'Ionicons', name: 'bookmark'},
    routeNames: 'BookMarks',
    component: BookMarksStack,
  },
  {
    translationKey: 'accountTab',
    icon: {type: 'MaterialCommunityIcons', name: 'account-circle-outline'},
    activeIcon: {type: 'MaterialCommunityIcons', name: 'account-circle'},
    routeNames: 'Profile',
    component: ProfileStack,
  },
];
export const defaultIndexCount = {
  home: 0,
  search: 1,
  history: 2,
  bookmark: 3,
  profile: 4,
};

const CustomTabBar = ({
  navigation,
  selectedTabIndex,

  isDarkMode,
}) => {
  const animatedValue = useRef(new Animated.Value(selectedTabIndex)).current;
  const theme = useAppTheme();
  const {currentActiveTab, isUserLoggedIn} = useSelector(state => state.user);
  const {t, i18n} = useTranslation();

  const onPress = useCallback(
    index => {
      // setSelectedTab(index);
      // if (isUserLoggedIn == false && [2, 3, 4].includes(index)) {
      //   showLoginAlert();
      // } else {
      console.log('isUserLoggedIn_fron_redux', {index, isUserLoggedIn});
      store.dispatch(setCurrentActiveTab(index));
      // store.dispatch
      Animated.timing(animatedValue, {
        toValue: index,
        duration: 100,
        useNativeDriver: false,
      }).start();
      navigation.navigate(tabArrays[index].routeNames);
      // }
    },
    [navigation, animatedValue, isUserLoggedIn],
  );

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: 'white',
        },
      ]}>
      {tabArrays.map((route, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() => onPress(index)}
          style={styles.iconContainer}>
          <Animated.View
            style={[
              currentActiveTab == index && styles.selectedTab,
              {
                backgroundColor:
                  currentActiveTab == index ? 'white' : 'transparent',
              },
            ]}>
            <VectorIcon
              type={
                currentActiveTab == index
                  ? route.activeIcon.type
                  : route.icon.type
              }
              name={
                currentActiveTab == index
                  ? route.activeIcon.name
                  : route.icon.name
              }
              color={
                isDarkMode && currentActiveTab == index ? 'black' : 'red'
                // theme.color.charcolBlack
                // theme.color.whiteText
              }
              style={{
                zIndex: 9999999,
              }}
              size={getFontSize(currentActiveTab == index ? 2.5 : 2.3)}
            />
          </Animated.View>
          <Text
            style={[
              styles.tabText,
              {
                fontFamily:
                  currentActiveTab === index
                    ? theme.font.semiBold
                    : theme.font.medium,
                color:
                  currentActiveTab === index
                    ? 'black'
                    : // theme.color.charcolBlack
                      'red',
                // theme.color.charcolBlack,
              },
            ]}>
            {t(route.translationKey)}
            {/* {route.title} */}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TabNav = memo(props => {
  const {navigation} = props;
  const theme = useAppTheme();
  const {currentBgColor, currentActiveTab, currentTextColor, isDarkMode} =
    useSelector(state => state.user);

  const tabBarOptions = useMemo(
    () => ({
      initialRouteName: tabArrays[0].routeNames,
      currentBgColor,
      currentTextColor,
      selectedTabIndex: 0,
    }),
    [currentBgColor, currentTextColor],
  );
  return (
    <View style={styles.navigatorContainer}>
      <Tab.Navigator
        // sceneContainerStyle={styles.sceneContainer}
        screenOptions={({route}) => {
          console.log('navagtion_routes', route.name);
          // return;
          return {
            tabBarStyle: {
              display: route.name == 'HomePage' ? 'none' : 'flex',
            },
          };
        }}
        tabBar={navigation => (
          <CustomTabBar
            {...navigation}
            {...tabBarOptions}
            currentBgColor={currentBgColor}
            currentTextColor={currentTextColor}
            isDarkMode={isDarkMode}
          />
        )}>
        {tabArrays.map((e, i) => (
          <Tab.Screen
            key={i}
            name={e.routeNames}
            component={e.component}
            options={{headerShown: false}}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
});

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
  },
  tabBar: {
    height: getResHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getResHeight(1), // Dynamic padding to adjust for smaller screens
    minWidth: getResHeight(6),
  },
  selectedTab: {
    paddingHorizontal: getResHeight(2),
    paddingVertical: getResHeight(0.2),
    borderRadius: 20,
  },
  tabText: {
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.4),
    // marginTop: '5%',
  },
});

export default TabNav;
