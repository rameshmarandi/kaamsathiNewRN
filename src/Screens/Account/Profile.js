import React, {useCallback, useState, useRef, useMemo, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {VectorIcon} from '../../Components/VectorIcon';
import CustomHeader from '../../Components/CustomHeader';
import CustomSwitch from '../../Components/CustomSwitch';
import WaveButton from '../../Components/WaveButton';
import ProfileSection from './ProfileSection';
import SafeAreaContainer from '../../Components/SafeAreaContainer';
import useAppTheme from '../../Hooks/useAppTheme';
import LanguageSelector from '../../Hooks/LanguageSelector';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {store} from '../../redux/store';
import {
  setCurrentActiveTab,
  setDarkMode,
  setIsUserLoggedIn,
  setIsUserOnline,
} from '../../redux/reducer/Auth';
import {onShareClick} from '../../Helpers/CommonHelpers';
import {ROUTES} from '../../Navigation/RouteName';
import CustomButton from '../../Components/CustomButton';

const menuOptions = [
  {icon: 'user', translationKey: 'profile', screen: ROUTES.PROFILE_DETAILS},
  {
    icon: 'credit-card',
    translationKey: 'paymentHistory',
    screen: 'PaymentHistory',
  },
  {icon: 'share', translationKey: 'share', ishare: true},
  {icon: 'feedback', translationKey: 'feedback', screen: 'HelpSupport'},
  {icon: 'shield', translationKey: 'privacy', screen: ROUTES.PRIVACY_POLICY},
  {icon: 'headphones', translationKey: 'help', screen: ROUTES.HELP_SUPPORT},
  {icon: 'language', translationKey: 'language', isLanguage: true},
  {icon: 'moon', translationKey: 'darkMode', isDarkModeMenu: true},
  {
    icon: 'trash',
    translationKey: 'Delecte Account',
    screen: 'HelpSupport',
    delete: true,
  },
];

const Profile = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {isUserOnline, isDarkMode} = useSelector(state => state.user);

  console.log("Loginves" , isDarkMode)
  const theme = useAppTheme();
  const dispatch = useDispatch()
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [isSharing, setIsSharing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(1)).current;
  const lastScrollY = useRef(0);
  const langSelectorRef = useRef(null);




  const toggleOnlineStatus = () =>
    store.dispatch(setIsUserOnline(!isUserOnline));
  const toggleDarkMode = () => {dispatch(setDarkMode(!isDarkMode))};

  const handleShare = () => {
    onShareClick(
      '🚀 *KaamSathi* - Your Ultimate Earning Partner! 💰\n\n✨ Refer & Earn BIG! Share this app with your friends and get exciting rewards. 🎁\n\n🔥 *Your Exclusive Referral Code:* *123456* 🔥\n\n📲 Download now:\n',
      'https://www.google.com',
      'Share & Earn',
      setIsSharing,
    );
  };

  const handleMenuPress = option => {
    if (option.delete) {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to permanently delete your account? This action cannot be undone.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', onPress: () => {}},
        ],
      );
    } else if (option.isDarkModeMenu) toggleDarkMode();
    else if (option.isLanguage) langSelectorRef.current?.openModal();
    else if (option.ishare) handleShare();
    else if (option.screen) navigation.navigate(option.screen);
  };

  const handleMomentumScrollEnd = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY.current + 10) {
      Animated.timing(headerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current - 5) {
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    lastScrollY.current = currentScrollY;
  };

  const handleLogout = () => {
    // console.log('User logged out');
    // store.dispatch(setIsUserLoggedIn(false));
    // store.dispatch(setCurrentActiveTab(0));
    // // navigation.goBack();
    // // resetNavigation('LoginPage');
    // navigation.navigate('LoginPage');
  };
  return (
    <SafeAreaContainer>
      <Animated.View style={styles.headerContainer}>
        <CustomHeader
          backPress={() => navigation.goBack()}
          onPressShare={handleShare}
          screenTitle="Account Settings"
          shareDisabled={isSharing}
        />
      </Animated.View>
      <LanguageSelector hideIcon={true} ref={langSelectorRef} />
      <FlatList
        data={[0, 1, 2]}
        keyExtractor={item => item.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{paddingBottom: getResHeight(10)}}
        renderItem={({index}) => {
          if (index === 0) return <ProfileSection />;
          if (index === 1) {
            return (
              <View
                style={[
                  styles.statusContainer,
                  {
                    borderColor: isUserOnline
                      ? theme.color.successPrimary
                      : theme.color.redBRGA,
                  },
                ]}>
                <View style={styles.statusTextContainer}>
                  {isUserOnline ? (
                    <WaveButton
                      onPress={() => {}}
                      circleContainer={styles.circleStyle}
                      circleStyle={styles.circleStyle}
                      disabled
                    />
                  ) : (
                    <VectorIcon
                      type="FontAwesome"
                      name="circle"
                      size={16}
                      color={theme.color.redBRGA}
                    />
                  )}
                  <Text style={styles.statusText}>
                    {isUserOnline ? 'Online' : 'Offline'}
                  </Text>
                  {/* <Text style={styles.statusText}>{isUserOnline ? t('isOnline') : t('isOffline')}</Text> */}
                </View>
                <CustomSwitch
                  value={isUserOnline}
                  onValueChange={toggleOnlineStatus}
                />
              </View>
            );
          }
          if (index === 2) {
            return (
              <View style={styles.optionsContainer}>
                {menuOptions.map((option, i) => (
                  <AccountOption
                    key={i}
                    item={option}
                    isDarkMode={isDarkMode}
                    onPress={() => handleMenuPress(option)}
                    disabled={isSharing}
                  />
                ))}
              </View>
            );
          }
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          leftIcon={
            <VectorIcon
              type="MaterialCommunityIcons"
              name="logout"
              size={24}
              color={theme.color.textColor}
            />
          }
        />
      </View>
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </SafeAreaContainer>
  );
}

const AccountOption = memo(({item, onPress, disabled, isDarkMode}) => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const {icon, translationKey, isDarkModeMenu} = item;

  const getIcon = () => {
    if (icon === 'feedback')
      return (
        <VectorIcon
          type="MaterialIcons"
          name={icon}
          size={getFontSize(2.5)}
          color={theme.color.textColor}
        />
      );
    if (icon === 'moon') {
      return (
        <VectorIcon
          type="MaterialCommunityIcons"
          name={isDarkMode ? 'lightbulb-on' : 'lightbulb-on-outline'}
          size={getFontSize(2.5)}
          color={theme.color.textColor}
        />
      );
    }
    return (
      <VectorIcon
        type="FontAwesome"
        name={icon}
        size={getFontSize(2.5)}
        color={theme.color.textColor}
      />
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={styles.option}
      onPress={onPress}>
      <View style={styles.optionContent}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: isDarkMode
                ? theme.color.cardBorderColor
                : 'rgba(230, 180, 42, 0.3)',
            },
          ]}>
          {getIcon()}
        </View>
        <Text style={styles.optionText}>{t(translationKey)}</Text>
      </View>
      <VectorIcon
        type="Entypo"
        name="chevron-right"
        size={20}
        color={theme.color.textColor}
      />
      
    </TouchableOpacity>
  );
});

const getStyles = theme =>
  StyleSheet.create({
    headerContainer: {
      zIndex: 10,
    },
    statusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: getResHeight(1),
      margin: getResHeight(2),
      borderWidth: 1.5,
      borderRadius: getResHeight(3),
    },
    statusTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: getResWidth(2),
    },
    statusText: {
      fontSize: getFontSize(1.6),
      marginLeft: 8,
      color: theme.color.textColor,
      fontFamily: theme.font.semiBold,
    },
    circleStyle: {
      width: getResHeight(2),
      height: getResHeight(2),
      borderRadius: getResHeight(1),
      backgroundColor: theme.color.successPrimary,
    },
    optionsContainer: {
      margin: getResWidth(4),
      borderRadius: 12,
      overflow: 'hidden',
      borderColor: theme.color.cardBorderColor,
      borderWidth: 1,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getResHeight(1.5),
      paddingHorizontal: getResWidth(4),
      borderBottomWidth: 1,
      borderBottomColor: theme.color.border,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: getResHeight(4.5),
      height: getResHeight(4.5),
      borderRadius: 999,
      marginRight: getResWidth(2),
    },
    optionText: {
      fontSize: getFontSize(1.6),
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
      textTransform: 'capitalize',
    },
    versionText: {
      textAlign: 'center',
      marginVertical: getResHeight(2),
      fontSize: getFontSize(1.5),
      fontFamily: theme.font.semiBold,
      color: theme.color.outlineColor,
    },
  });

export default memo(Profile); // Export the memoized Profile;
