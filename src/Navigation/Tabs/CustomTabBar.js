import React, {useMemo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {VectorIcon} from '../../Components/VectorIcon';
import {ROUTES} from '../RouteName';
import {getFontSize, getResHeight} from '../../utility/responsive';

import {SafeAreaView} from 'react-native-safe-area-context';
import {showLoginAlert} from '../../utility/AlertService';
import {useTabBarStyles} from './CustomTabBar.styles';
import {useTheme} from '../../Hooks/ThemeContext';
import {resetSearch} from '../../redux/reducer/SearchReducer';

const ICONS = {
  [ROUTES.HOME_STACK]: {
    active: {name: 'home', type: 'Entypo'},
    inactive: {name: 'home', type: 'Feather'},
    translationKey: 'homeTab',
  },

  [ROUTES.BOOKING_STACK]: {
    active: {name: 'calendar-check', type: 'MaterialCommunityIcons'},
    inactive: {name: 'calendar-check', type: 'MaterialCommunityIcons'},
    translationKey: 'bookingTab',
  },
  [ROUTES.SEARCH_STACK]: {
    active: {name: 'search-sharp', type: 'Ionicons'},
    inactive: {name: 'search-sharp', type: 'Ionicons'},
    translationKey: 'searchTab',
  },
  [ROUTES.BOOKMARK_STACK]: {
    active: {name: 'bookmark', type: 'Ionicons'},
    inactive: {name: 'bookmark-outline', type: 'Ionicons'},
    translationKey: 'bookmarkTab',
  },
  [ROUTES.PROFILE_STACK]: {
    active: {name: 'account-circle', type: 'MaterialCommunityIcons'},
    inactive: {name: 'account-circle-outline', type: 'MaterialCommunityIcons'},
    translationKey: 'accountTab',
  },
};

const DEFAULT_ICON = {
  active: {name: 'square', type: 'Ionicons'},
  inactive: {name: 'square-outline', type: 'Ionicons'},
};

const getIconSet = routeName => ICONS[routeName] || DEFAULT_ICON;

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {t} = useTranslation();
  const {isDarkMode, isUserLoggedIn} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  const styles = useTabBarStyles();
  return (
    <SafeAreaView
      edges={['bottom']}
      style={
        {
          // flex: 1,
        }
      }>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const iconSet = useMemo(() => getIconSet(route.name), [route.name]);

            const isMiddleTab = index === Math.floor(state.routes.length / 2);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                if (
                  isUserLoggedIn == false &&
                  ['BookMarksStack', 'ProfileStack', 'MyBookings'].includes(
                    route.name,
                  )
                ) {
                  showLoginAlert();
                } else if (route.name == ROUTES.SEARCH_STACK) {
                  navigation.navigate(route.name);
                  dispatch(resetSearch());
                } else {
                  navigation.navigate(route.name);
                }
              }
            };

            const iconContainerStyle = [
              isMiddleTab ? styles.middleIcon : styles.iconCircle,
              {
                backgroundColor:
                  route.name === ROUTES.SEARCH_STACK || isFocused
                    ? theme.color.primary
                    : 'transparent',
                borderWidth: route.name === ROUTES.SEARCH_STACK ? 2 : 0,
                borderColor:
                  route.name === ROUTES.SEARCH_STACK && isDarkMode
                    ? theme.color.textColor
                    : theme.color.background,
              },

              route.name === ROUTES.SEARCH_STACK && {
                shadowColor: theme.color.black,
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 6,
              },
            ];

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={[
                  styles.iconWrapper,
                  isMiddleTab && styles.middleTabWrapper,
                ]}
                activeOpacity={0.8}>
                <View style={iconContainerStyle}>
                  <VectorIcon
                    type={
                      isFocused ? iconSet.active.type : iconSet.inactive.type
                    }
                    name={
                      isFocused ? iconSet.active.name : iconSet.inactive.name
                    }
                    size={getFontSize(isMiddleTab ? 3.5 : 2.8)}
                    color={
                      isFocused
                        ? theme.color.white
                        : isMiddleTab
                        ? theme.color.textColor
                        : theme.color.nonActiveTextColor
                    }
                  />
                </View>

                {!isMiddleTab && (
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isFocused
                          ? theme.color.textColor
                          : theme.color.nonActiveTextColor,
                        fontFamily: isFocused
                          ? theme.font.bold
                          : theme.font.medium,
                      },
                    ]}>
                    {t(iconSet.translationKey)}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(CustomTabBar);
