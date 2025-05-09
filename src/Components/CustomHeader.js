import React, {
  components,
  createRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  TextInput as RNInput,
  Platform,
  StyleSheet,
  Text,
  TouchableSensitivity,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Button} from 'react-native-elements';
import {VectorIcon} from './VectorIcon';
import PropTypes from 'prop-types';
import theme from '../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {backgroundColorHandler, textColorHandler} from './commonHelper';
import {useSelector} from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import WaveButton from './WaveButton';
import useAppTheme from '../Hooks/useAppTheme';

const CustomHeader = props => {
  const insets = useSafeAreaInsets();

  const theme = useAppTheme()
  const {
    Hamburger,
    backPress,
    onPressNotificaiton,
    walletCount,
    onWalletPress,
    backgroundColor,
    screenTitle,
    centerLogo,
    filterIcon,
    rightNumber,
    onPressShare,
    isDelete,
    headerTextColor,
    shareDisabled,
  } = props;

  let {
    isDarkMode,
    isUserOnline,
    userLocation,
    currentBgColor,
    currentTextColor,
    isUserLoggedIn,
  } = useSelector(state => state.user);


  const unreadCount = 10

  const waveButtonProps = useCallback(
    color => ({
      onPress: () => {
        /* Navigation action */
      },
      circleContainer: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
      circleStyle: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
    }),
    [],
  );

  // let isOnline = true;

  const onlineWaveStyles = waveButtonProps(theme.color.greenBRGA);
  const offlineWaveStyles = waveButtonProps(theme.color.errorPrimary);
  return (
    <>
      {/* <SafeAreaView style={{}}> */}
        <Animated.View
          style={{
            paddingVertical: getResHeight(0.5),
            width: '100%',
            paddingHorizontal: '4%',
            paddingVertical: '3%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:backgroundColor ? backgroundColor : theme.color.background
           
  
          }}>
          {Hamburger && (
            <>
              <TouchableOpacity activeOpacity={0.8} onPress={Hamburger}>
                <View
                  style={[
                    {
                      height: getResHeight(6),
                      width: getResHeight(6),
                      borderRadius: getResHeight(8),
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    !isUserLoggedIn && {
                      borderWidth: 2,
                      borderColor: 
                      // theme.color.greenBRGA,
                      isUserOnline
                        ? theme.color.greenBRGA
                        : theme.color.redBRGA,

                      zIndex: -99999,
                      backgroundColor: currentBgColor,
                    },
                  ]}>
                  {isUserLoggedIn ? (
                    <>
                      <VectorIcon
                        type={'FontAwesome'}
                        name={'user-circle'}
                        size={getFontSize(5.5)}
                        color={theme.color.white}
                        style={{}}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        source={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s',
                          height: '100%',
                          width: '100%',
                        }}
                      />
                    </>
                  )}
                </View>

                {/* {isUserLoggedIn && ( */}
                  <View
                    style={[
                      {
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: 100,
                        zIndex: 99999,
                      },
                      !isUserOnline && {
                        backgroundColor: 'red',
                        height: getResHeight(2),
                        width: getResHeight(2),
                      },
                    ]}>
                    {isUserOnline  ? (
                      <WaveButton {...onlineWaveStyles} disabled />
                    ) :  <WaveButton {...offlineWaveStyles} disabled />}
                  </View>
                {/* )} */}
              </TouchableOpacity>
              {userLocation.address !== 'error' && (
                <>
                  <TouchableOpacity activeOpacity={0.8} >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <VectorIcon
                        type={'Ionicons'}
                        name={'location'}
                        size={ theme.font.small}
                        color={theme.color.background}
                      />
                      <Animated.Text
                        style={{
                          color:headerTextColor,
                          paddingTop: getResHeight(0.3),
                          fontSize:  theme.fontSize.medium,
                          textAlign: 'center',
                          fontFamily: theme.font.medium,
                        }}>
                        Address
                      </Animated.Text>
                     
                    </View>
                    <Animated.Text
                      style={{
                        color: headerTextColor,

                        marginTop: getResHeight(0.3),
                        textAlign: 'center',
                        fontFamily: theme.font.medium,
                        fontSize: theme.fontSize.small,
                      }}>
                        Bhalekar nagar, pimple..
                      {/* {userLocation.address.length > 20
                        ? `${userLocation.address.slice(0, 20)}...`
                        : userLocation.address} */}
                    </Animated.Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {backPress && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Button
                type={'clear'}
                onPress={backPress}
                iconPosition="right"
                activeOpacity={0.8}
                icon={
                  <VectorIcon
                    type={'Ionicons'}
                    name={'chevron-back'}
                    size={getFontSize(2.5)}
                    color={isDarkMode? theme.color.textColor : theme.color.background}
                    style={{}}
                  />
                }
                iconContainerStyle={{}}
                containerStyle={[
                  {
                    width: getResHeight(5),
                    height: getResHeight(5),

                    backgroundColor:isDarkMode? theme.color.primary: theme.color.primary,
                  
                    borderRadius: getResHeight(100),
                  },
                ]}
                buttonStyle={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  },
                ]}
              />

              <Text
                style={{
                  fontSize: theme.font.medium,
                  fontFamily: theme.font.medium,
                  color: theme.color.textColor,

                  // marginTop: getResHeight(1),
                  marginLeft: '6%',
                }}>
                {screenTitle}
              </Text>
            </View>
          )}
       

          <View style={{
            flexDirection: 'row',
          }}>
           {walletCount && (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onWalletPress}>
                <Button
                  type={'clear'}
                  onPress={onWalletPress}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'Ionicons'}
                      name={'wallet-outline'}
                      size={getFontSize(3.5)}
                      color={isDarkMode? theme.color.textColor : theme.color.background}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',

                      borderRadius: getResHeight(100),
                    },
                  ]}
                  buttonStyle={[
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    },
                  ]}
                />
                <View
                  style={{
                    height: getResHeight(2.5),
                    width: getResHeight(2.5),
                    borderRadius: getResHeight(100),
                    borderWidth: 0.8,
                    borderColor: 'white',

                    backgroundColor: 'red',

                    position: 'absolute',
                    right: '2%',
                    top: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color:  theme.color.background,

                      fontFamily: theme.font.medium,
                      fontSize:  theme.fontSize.small
                    }}>
                    {walletCount ? walletCount : 0}
                  </Text>
                </View>
              </TouchableOpacity>
              {rightNumber && (
                <Text style={{color: theme.color.textColor}}>{rightNumber}</Text>
              )}
            </>
          )}
          {onPressNotificaiton && (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressNotificaiton}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',}}
                >
                <Button
                  type={'clear'}
                  onPress={onPressNotificaiton}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'MaterialIcons'}
                      name={'notifications'}
                      size={getFontSize(3.5)}
                      color={  theme.color.textColor}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',

                      borderRadius: getResHeight(100),
                    },
                  ]}
                  buttonStyle={[
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    },
                  ]}
                />
                <View
                  style={{
                    height: getResHeight(1),
                    width: getResHeight(1),
                 
                    borderRadius: getResHeight(100),
                    borderWidth: 0.8,
                    borderColor: 'white',

                    backgroundColor: 'red',

                    position: 'absolute',
                    right: '22%',
                    top: '21%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Text
                    style={{
                      color: 'white',

                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.5),
                    }}>
                    {unreadCount ? unreadCount : 0}
                  </Text> */}
                </View>
              </TouchableOpacity>
              {/* {rightNumber && (
                <Text style={{color: currentTextColor}}>{rightNumber}</Text>
              )} */}
            </>
          )}
          </View>
         
          {onPressShare && (
            <>
              <TouchableOpacity
                disabled={shareDisabled}
                activeOpacity={0.8}
                onPress={onPressShare}>
                <Button
                  type={'clear'}
                  onPress={onPressShare}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'MaterialIcons'}
                      name={'share'}
                      size={getFontSize(3.5)}
                      color={theme.color.textColor}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',

                      borderRadius: getResHeight(100),
                    },
                  ]}
                  buttonStyle={[
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    },
                  ]}
                />
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      {/* </SafeAreaView> */}
    </>
  );
};
CustomHeader.propTypes = {
  screenTitle: PropTypes.string,
  backPress: PropTypes.func,
  filterIcon: PropTypes.func,
  centerLogo: PropTypes.bool,
  Hamburger: PropTypes.func,
  rightNumber: PropTypes.string,
  backgroundColor : PropTypes.string,
  headerTextColor : PropTypes.string,
};
export default React.memo(CustomHeader);
