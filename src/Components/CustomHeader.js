import React, {useCallback, useMemo} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {VectorIcon} from './VectorIcon';
import PropTypes from 'prop-types';
import {getFontSize, getResHeight} from '../utility/responsive';
import {shallowEqual, useSelector} from 'react-redux';
import WaveButton from './WaveButton';


import {useTheme} from '../Hooks/ThemeContext';

const CustomHeader = props => {
  const theme = useTheme();

  const styles = useHomePageStyle();

  const {
    Hamburger,
    backPress,
    onPressNotificaiton,
    walletCount,
    onWalletPress,
    backgroundColor,
    screenTitle,
    filterIcon,
    rightNumber,
    onPressShare,
    isDelete,
    headerTextColor,
    shareDisabled,
  } = props;

  // const {
  //   isDarkMode,
  //   isUserOnline,
  //   userLocation,
  //   currentBgColor,
  //   currentTextColor,
  //   isUserLoggedIn,
  // } = useSelector((state) => state.user);

  const {
    isDarkMode,
    isUserOnline,
    isUserLoggedIn,
    userLocation,
    currentBgColor,
    currentTextColor,
  } = useSelector(
    state => ({
      isDarkMode: state.user.isDarkMode,
      isUserOnline: state.user.isUserOnline,
      isUserLoggedIn: state.user.isUserLoggedIn,
      userLocation: state.user.userLocation,
      currentBgColor: state.user.currentBgColor,
      currentTextColor: state.user.currentTextColor,
    }),
    shallowEqual,
  );

  console.log('isUserLoggedIn', isUserLoggedIn);
  const unreadCount = 10;

  const waveButtonProps = useCallback(
    color => ({
      onPress: () => {},
      circleContainer: styles.circle(color),
      circleStyle: styles.circle(color),
    }),
    [],
  );

  const onlineWaveStyles = waveButtonProps(theme.color.greenBRGA);
  const offlineWaveStyles = waveButtonProps(theme.color.errorPrimary);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: backgroundColor || theme.color.background},
      ]}>
      {Hamburger && (
        <>
          <TouchableOpacity activeOpacity={0.8} onPress={Hamburger}>
            <View
              style={[
                styles.hamburgerWrapper,
                isUserLoggedIn && {
                  borderWidth: 2,
                  borderColor: isUserOnline
                    ? theme.color.greenBRGA
                    : theme.color.redBRGA,
                  backgroundColor: currentBgColor,
                },
              ]}>
              {!isUserLoggedIn ? (
                <VectorIcon
                  type="FontAwesome"
                  name="user-circle"
                  size={getFontSize(5.5)}
                  color={theme.color.white}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s',
                    height: '100%',
                    width: '100%',
                  }}
                />
              )}
            </View>

            {isUserLoggedIn && (
              <>
                <View style={styles.statusDot}>
                  {isUserOnline ? (
                    <WaveButton {...onlineWaveStyles} disabled />
                  ) : (
                    <WaveButton {...offlineWaveStyles} disabled />
                  )}
                </View>
              </>
            )}
          </TouchableOpacity>
          {userLocation.address !== 'error' && (
            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.locationRow}>
                <VectorIcon
                  type="Ionicons"
                  name="location"
                  size={theme.font.small}
                  color={theme.color.background}
                />
                <Animated.Text
                  style={[styles.locationTitle, {color: headerTextColor}]}>
                  Address
                </Animated.Text>
              </View>
              <Animated.Text
                style={[styles.addressText, {color: headerTextColor}]}>
                Bhalekar nagar, pimple..
              </Animated.Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {backPress && (
        <View style={styles.backRow}>
          <Button
            type="clear"
            onPress={backPress}
            iconPosition="right"
            activeOpacity={0.8}
            icon={
              <VectorIcon
                type="Ionicons"
                name="chevron-back"
                size={getFontSize(2.5)}
                color={
                  isDarkMode ? theme.color.textColor : theme.color.background
                }
              />
            }
            containerStyle={styles.backButtonContainer}
            buttonStyle={styles.backButton}
          />
          <Text style={[styles.screenTitle, {color: theme.color.textColor}]}>
            {screenTitle}
          </Text>
        </View>
      )}

      <View style={styles.rightIcons}>
        {walletCount && (
          <>
            <TouchableOpacity activeOpacity={0.8} onPress={onWalletPress}>
              <Button
                type="clear"
                onPress={onWalletPress}
                iconPosition="right"
                icon={
                  <VectorIcon
                    type="Ionicons"
                    name="wallet-outline"
                    size={getFontSize(3.2)}
                    color={
                      isDarkMode
                        ? theme.color.textColor
                        : theme.color.background
                    }
                  />
                }
                containerStyle={styles.iconBtnContainer}
                buttonStyle={styles.iconBtn}
              />
              {isUserLoggedIn && (
                <>
                  <View style={styles.walletBadge}>
                    <Text style={styles.walletBadgeText}>
                      {walletCount || 0}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
            {rightNumber && (
              <Text style={{color: theme.color.textColor}}>{rightNumber}</Text>
            )}
          </>
        )}

        {onPressNotificaiton && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressNotificaiton}
            style={styles.notificationWrapper}>
            <Button
              type="clear"
              onPress={onPressNotificaiton}
              iconPosition="right"
              icon={
                <VectorIcon
                  type="MaterialIcons"
                  name="notifications"
                  size={getFontSize(3.5)}
                  color={theme.color.textColor}
                />
              }
              containerStyle={styles.iconBtnContainer}
              buttonStyle={styles.iconBtn}
            />

            {isUserLoggedIn && (
              <>
                <View style={styles.notificationDot} />
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {onPressShare && (
        <TouchableOpacity disabled={shareDisabled} onPress={onPressShare}>
          <Button
            type="clear"
            onPress={onPressShare}
            iconPosition="right"
            icon={
              <VectorIcon
                type="MaterialIcons"
                name="share"
                size={getFontSize(3.5)}
                color={theme.color.textColor}
              />
            }
            containerStyle={styles.iconBtnContainer}
            buttonStyle={styles.iconBtn}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const useHomePageStyle = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: '4%',
          paddingVertical: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        },
        hamburgerWrapper: {
          height: getResHeight(6),
          width: getResHeight(6),
          borderRadius: getResHeight(8),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        },
        circle: color => ({
          width: getResHeight(2),
          height: getResHeight(2),
          borderRadius: getResHeight(1),
          backgroundColor: color,
        }),
        statusDot: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderRadius: 100,
          zIndex: 99999,
        },
        locationRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        locationTitle: {
          paddingTop: getResHeight(0.3),
          fontSize: theme.fontSize.large,
          textAlign: 'center',
          fontFamily: theme.font.semiBold,
        },
        addressText: {
          marginTop: getResHeight(0.3),
          textAlign: 'center',
          fontFamily: theme.font.medium,
          fontSize: theme.fontSize.medium,
        },
        backRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        backButtonContainer: {
          width: getResHeight(5),
          height: getResHeight(5),
          backgroundColor: theme.color.primary,
          borderRadius: 100,
        },
        backButton: {
          width: '100%',
          height: '100%',
          borderRadius: 100,
        },
        screenTitle: {
          fontSize: theme.fontSize.large,
          fontFamily: theme.font.medium,

          marginLeft: '6%',
        },
        rightIcons: {
          flexDirection: 'row',
        },
        iconBtnContainer: {
          width: getResHeight(5),
          height: getResHeight(5),
          justifyContent: 'center',
          borderRadius: 100,
        },
        iconBtn: {
          width: '100%',
          height: '100%',
          borderRadius: 100,
        },
        walletBadge: {
          height: getResHeight(2.8),
          width: getResHeight(2.8),
          borderRadius: 100,
          borderWidth: 0.8,
          borderColor: 'white',
          backgroundColor: 'red',
          position: 'absolute',
          right: '2%',
          top: '1%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        walletBadgeText: {
          color: 'white',
          fontFamily: theme.font.bold,
          fontSize: theme.fontSize.large,
        },
        notificationWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        notificationDot: {
          height: getResHeight(1),
          width: getResHeight(1),
          borderRadius: 100,
          borderWidth: 0.8,
          borderColor: 'white',
          backgroundColor: 'red',
          position: 'absolute',
          right: '22%',
          top: '21%',
        },
      }),
    [theme],
  );
};

// const getStyles = theme =>
//   StyleSheet.create(
//     )

CustomHeader.propTypes = {
  screenTitle: PropTypes.string,
  backPress: PropTypes.func,
  filterIcon: PropTypes.func,
  centerLogo: PropTypes.bool,
  Hamburger: PropTypes.func,
  rightNumber: PropTypes.string,
  backgroundColor: PropTypes.string,
  headerTextColor: PropTypes.string,
};

export default React.memo(CustomHeader);
