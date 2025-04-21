import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet , Animated} from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../Navigation';
import { storage } from '../../utility/mmkvStorage';
import { setCurrentActiveTab } from '../../redux/reducer/Auth';

// const CustomTabBar = (props) => {
//   const{navigation, selectedTabIndex, isDarkMode} = props
//   console.log("CustomTabBar_tabprops" , navigation, selectedTabIndex);
//   const animatedValue = useRef(new Animated.Value(selectedTabIndex)).current;
//   const theme = useAppTheme();
//   const styles = getStyles(theme);
//   const {currentActiveTab, isUserLoggedIn} = useSelector(state => state.user);
//   const {t} = useTranslation();

//   const onPress = useCallback(
//     index => {
//       storage.dispatch(setCurrentActiveTab(index));
//       Animated.timing(animatedValue, {
//         toValue: index,
//         duration: 150,
//         useNativeDriver: false,
//       }).start();
//       navigation.navigate(tabArrays[index].routeNames);
//     },
//     [navigation, animatedValue],
//   );

//   return (
//     <View style={styles.tabContainer}>
//       <View
//         style={[
//           styles.floatingBar,
//           {
//             backgroundColor: theme.color.card,
//             borderColor: theme.color.border,
//           },
//         ]}>
//         {tabArrays.map((route, index) => {
//           const isFocused = currentActiveTab === index;
//           const isMiddleTab = index === 2;

//           return (
//             <TouchableOpacity
//               key={index}
//               activeOpacity={0.85}
//               onPress={() => onPress(index)}
//               style={[
//                 styles.iconWrapper,
//                 isMiddleTab && styles.middleTabWrapper,
//               ]}>
//               <Animated.View
//                 style={[
//                   isFocused && styles.activeIconWrapper,
//                   isMiddleTab
//                     ? {
//                         ...styles.middleIcon,
//                         backgroundColor: theme.color.primary, // Override only when focused

//                         shadowColor: theme.color.nonActiveTextColor,
//                       }
//                     : {
//                         backgroundColor: isFocused
//                           ? theme.color.primaryRGBA
//                           : 'transparent',
//                       },
//                 ]}>
//                 <VectorIcon
//                   type={isFocused ? route.activeIcon.type : route.icon.type}
//                   name={isFocused ? route.activeIcon.name : route.icon.name}
//                   size={
//                     isMiddleTab
//                       ? getFontSize(3.5)
//                       : getFontSize(isFocused ? 2.6 : 2.3)
//                   }
//                   color={
//                     isMiddleTab
//                       ? 'white'
//                       : isFocused
//                       ? theme.color.textColor
//                       : theme.color.nonActiveTextColor
//                   }
//                 />
//               </Animated.View>
//               {!isMiddleTab && (
//                 <Text
//                   style={[
//                     styles.tabText,
//                     {
//                       fontFamily: isFocused
//                         ? theme.font.small
//                         : theme.font.xSmall,
//                       color: isFocused
//                         ? theme.color.textColor
//                         : theme.color.nonActiveTextColor,
//                     },
//                   ]}>
//                   {t(route.translationKey)}
//                 </Text>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };
const CustomTabBar = (props) => {
  const getIconName = (routeName) => {
    switch (routeName) {
      case ROUTES.HOME_STACK:
        return 'home-outline';
      case ROUTES.SEARCH_STACK:
        return 'search-outline';
      case ROUTES.PROFILE_STACK:
        return 'person-outline';
      default:
        return 'square-outline';
    }
  };

  return (
    <BottomTabBar
      {...props}
      style={styles.tabBar}
      render={({ navigation, descriptors, state }) => (
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

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

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tab}>
                <Icon
                  name={getIconName(route.name)}
                  size={24}
                  color={isFocused ? '#0066CC' : '#999'}
                />
                <Text style={[styles.label, { color: isFocused ? '#0066CC' : '#999' }]}>
                  {options.title || route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
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

export default CustomTabBar;