import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { VectorIcon } from '../../Components/VectorIcon';
import { ROUTES } from '../RouteName';
import { getFontSize, getResHeight } from '../../utility/responsive';
import useAppTheme from '../../Hooks/useAppTheme';

const ICONS = {
  [ROUTES.HOME_STACK]: {
    active: { name: 'home', type: 'Entypo' },
    inactive: { name: 'home', type: 'Feather' },
    translationKey: 'homeTab',
  },
  [ROUTES.BOOKING_STACK]: {
    active: { name: 'history', type: 'MaterialCommunityIcons' },
    inactive: { name: 'history', type: 'MaterialCommunityIcons' },
    translationKey: 'bookingTab',
  },
  [ROUTES.SEARCH_STACK]: {
    active: { name: 'search-sharp', type: 'Ionicons' },
    inactive: { name: 'search-sharp', type: 'Ionicons' },
    translationKey: 'searchTab',
  },
  [ROUTES.BOOKMARK_STACK]: {
    active: { name: 'bookmark', type: 'Ionicons' },
    inactive: { name: 'bookmark-outline', type: 'Ionicons' },
    translationKey: 'bookmarkTab',
  },
  [ROUTES.PROFILE_STACK]: {
    active: { name: 'account-circle', type: 'MaterialCommunityIcons' },
    inactive: { name: 'account-circle-outline', type: 'MaterialCommunityIcons' },
    translationKey: 'accountTab',
  },
};

const DEFAULT_ICON = {
  active: { name: 'square', type: 'Ionicons' },
  inactive: { name: 'square-outline', type: 'Ionicons' },
};

const getIconSet = (routeName) => ICONS[routeName] || DEFAULT_ICON;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation();
  const { isDarkMode } = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          console.log("isFocused_in_tab", isFocused)
          const { options } = descriptors[route.key];
          const iconSet = getIconSet(route.name);
          const isMiddleTab = index === Math.floor(state.routes.length / 2);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
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

            route.name === ROUTES.SEARCH_STACK&&  {
              shadowColor: theme.color.black,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 6,
            }
          ];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.iconWrapper, isMiddleTab && styles.middleTabWrapper]}
              activeOpacity={0.8}
            >
              <View style={iconContainerStyle}>
                <VectorIcon
                  type={isFocused ? iconSet.active.type : iconSet.inactive.type}
                  name={isFocused ? iconSet.active.name : iconSet.inactive.name}
                  size={getFontSize(isMiddleTab ? 3.5 : 2.8)}

                  color={isFocused ? theme.color.white :isMiddleTab ? theme.color.textColor : theme.color.nonActiveTextColor}
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
                  ]}
                >
                  {t(iconSet.translationKey)}
                  {/* {t(options.title || route.name)} */}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.color.background,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.color.card,
      borderRadius: getResHeight(4),
      paddingVertical: getResHeight(2),
      paddingHorizontal: getResHeight(2),
      borderWidth: 0.7,
      borderColor: theme.color.border,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    iconWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    iconCircle: {
      padding: getResHeight(0.7),
      borderRadius: getResHeight(2),
    },
    middleTabWrapper: {},
    middleIcon: {
      height: getResHeight(6.5),
      width: getResHeight(6.5),
      borderRadius: getResHeight(3.25),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.color.primary,
      borderWidth: 3,
      borderColor: theme.color.white,
    },
    tabText: {
      marginTop: getResHeight(0.5),
      fontSize: theme.fontSize.xSmall,
    },
  });

export default React.memo(CustomTabBar);
