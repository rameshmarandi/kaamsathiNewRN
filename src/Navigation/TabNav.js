import React, {useCallback, useMemo, memo, useRef} from 'react';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
  BookMarksStack,
  HistoryStack,
  HomeStack,
  ProfileStack,
  SearchStack,
} from './StackNav';
import {VectorIcon} from '../Components/VectorIcon';
import {store} from '../redux/store';
import {setCurrentActiveTab} from '../redux/reducer/Auth';
import useAppTheme from '../Hooks/useAppTheme';
import {getFontSize, getResHeight} from '../utility/responsive';

const Tab = createBottomTabNavigator();

const tabArrays = [
  {
    translationKey: 'homeTab',
    icon: {type: 'Feather', name: 'home'},
    activeIcon: {type: 'Entypo', name: 'home'},
    routeNames: 'HomePage',
    component: HomeStack,
  },
  {
    translationKey: 'bookingTab',
    icon: {type: 'MaterialCommunityIcons', name: 'history'},
    activeIcon: {type: 'MaterialCommunityIcons', name: 'history'},
    routeNames: 'ConfirmBookedHistory',
    component: HistoryStack,
  },
  {
    translationKey: 'searchTab',
    icon: {type: 'Ionicons', name: 'search-outline'},
    activeIcon: {type: 'Ionicons', name: 'search-sharp'},
    routeNames: 'SearchOnMap',
    component: SearchStack,
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

const CustomTabBar = (props) => {
  const{navigation, selectedTabIndex, isDarkMode} = props
  console.log("CustomTabBar_tabprops" , navigation, selectedTabIndex);
  const animatedValue = useRef(new Animated.Value(selectedTabIndex)).current;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const {currentActiveTab, isUserLoggedIn} = useSelector(state => state.user);
  const {t} = useTranslation();

  const onPress = useCallback(
    index => {
      store.dispatch(setCurrentActiveTab(index));
      Animated.timing(animatedValue, {
        toValue: index,
        duration: 150,
        useNativeDriver: false,
      }).start();
      navigation.navigate(tabArrays[index].routeNames);
    },
    [navigation, animatedValue],
  );

  return (
    <View style={styles.tabContainer}>
      <View
        style={[
          styles.floatingBar,
          {
            backgroundColor: theme.color.card,
            borderColor: theme.color.border,
          },
        ]}>
        {tabArrays.map((route, index) => {
          const isFocused = currentActiveTab === index;
          const isMiddleTab = index === 2;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              onPress={() => onPress(index)}
              style={[
                styles.iconWrapper,
                isMiddleTab && styles.middleTabWrapper,
              ]}>
              <Animated.View
                style={[
                  isFocused && styles.activeIconWrapper,
                  isMiddleTab
                    ? {
                        ...styles.middleIcon,
                        backgroundColor: theme.color.primary, // Override only when focused

                        shadowColor: theme.color.nonActiveTextColor,
                      }
                    : {
                        backgroundColor: isFocused
                          ? theme.color.primaryRGBA
                          : 'transparent',
                      },
                ]}>
                <VectorIcon
                  type={isFocused ? route.activeIcon.type : route.icon.type}
                  name={isFocused ? route.activeIcon.name : route.icon.name}
                  size={
                    isMiddleTab
                      ? getFontSize(3.5)
                      : getFontSize(isFocused ? 2.6 : 2.3)
                  }
                  color={
                    isMiddleTab
                      ? 'white'
                      : isFocused
                      ? theme.color.textColor
                      : theme.color.nonActiveTextColor
                  }
                />
              </Animated.View>
              {!isMiddleTab && (
                <Text
                  style={[
                    styles.tabText,
                    {
                      fontFamily: isFocused
                        ? theme.font.small
                        : theme.font.xSmall,
                      color: isFocused
                        ? theme.color.textColor
                        : theme.color.nonActiveTextColor,
                    },
                  ]}>
                  {t(route.translationKey)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNav = memo(( props) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const {currentBgColor, currentTextColor, currentActiveTab, isDarkMode} =
    useSelector(state => state.user);

  const tabBarOptions = useMemo(
    () => ({
      initialRouteName: tabArrays[0].routeNames,
      currentBgColor,
      currentTextColor,
      selectedTabIndex: currentActiveTab,
    }),
    [currentBgColor, currentTextColor, currentActiveTab],
  );

  return (
    <View style={styles.navigatorContainer}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            display: route.name === 'HomePage' ? 'none' : 'flex',
          },
        })}
        tabBar={navProps => {
          
          console.log("TabNav_tabprops" , navProps);
          return(
          <CustomTabBar
            {...navProps}
            {...tabBarOptions}
            isDarkMode={isDarkMode}
          />
        )}}>
        {tabArrays.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.routeNames}
            component={tab.component}
            options={{headerShown: false}}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
});

const getStyles = theme =>
  StyleSheet.create({
    navigatorContainer: {
      flex: 1,

    },
    tabContainer: {
      position: 'absolute',
      bottom: getResHeight(1.5),
      left: getResHeight(1.8),
      right: getResHeight(1.8),
      zIndex: 999,

    },
    floatingBar: {
      height: getResHeight(8),
      borderRadius: getResHeight(4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderWidth: 0.6,

      // For smooth curved effect, you can add shadow
      // elevation: 8,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.1,
      // shadowRadius: 8,
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    tabText: {
      fontSize: theme.fontSize.xSmall,
    },
    activeIconWrapper: {
      borderRadius: 20,
      padding: getResHeight(0.7),
    },
    middleTabWrapper: {
      top: -getResHeight(3),
      position: 'relative',
    },
    middleIcon: {
      height: getResHeight(6.5),
      width: getResHeight(6.5),
      borderRadius: getResHeight(100),
      backgroundColor: theme.color.primary,
      justifyContent: 'center',
      alignItems: 'center',
      // shadowOpacity: 0.25,
      // shadowRadius: 6,
      // shadowOffset: { width: 0, height: 3 },
      // elevation: 6,
      borderColor: 'white',
      borderWidth: 3,
    },
    // Adding styles to make search tab icon more curved and have a distinct shape
    searchIconWrapper: {
      // backgroundColor: theme.color.primary,
      borderRadius: getResHeight(3), // Curved container shape
      padding: getResHeight(1), // Extra padding for better appearance
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 2},
      elevation: 6,
    },
  });

export default TabNav;
