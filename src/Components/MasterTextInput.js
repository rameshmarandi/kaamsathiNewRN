import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  useColorScheme,
  Easing,
} from 'react-native';
import {TextInput as PaperTextInput, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../utility/theme';
import {getFontSize, getResHeight} from '../utility/responsive';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {VectorIcon} from './VectorIcon';
import {dateFormatHander} from './commonHelper';
import useAppTheme from '../Hooks/useAppTheme';
import {useTheme} from '../Hooks/ThemeContext';

const MasterTextInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      timePicker,
      placeholder,
      mode = 'outlined',
      secureTextEntry = false,
      keyboardType = 'default',
      autoCapitalize,
      isDate = false,
      onSubmitEditing,
      topLableName,
      style,
      roundness,
      error,
      minDate,
      maxDate,
      calendarMode,
      maxLength,
      multiline,
      isDropdown = false,
      dropdownData = [],
      onDropdownChange,
      dropdownSearch,
      isValid,
      isMendotary = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = getStyles();
    // useMemo(() => getStyles(theme), [theme])

    // State to manage the visibility of the date picker modal
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    // Fetching current theme settings from Redux store
    const {isDarkMode, isAdmin} = useSelector(state => state.user);
    let colorScheme = useColorScheme();
    const isDarkModeAvailable = colorScheme == 'dark' ? true : false;

    let currentTextColor = theme.color.outlineColor;
    // State to manage secure text entry visibility
    const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);
    // Reference to the text input field
    const textInputRef = useRef(null);

    // Animated value for shake effect
    const shakeAnim = useRef(new Animated.Value(0)).current;

    // Expose focus and blur methods for the text input field to parent components via ref
    useImperativeHandle(ref, () => ({
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
    }));

    // Handle the date selection and format the date as 'YYYY-MM-DD HH:mm'
    // const handleConfirm = useCallback(
    //   params => {
    //     const selectedDate = new Date(params.date);
    //     // Get the year, month, and date explicitly to avoid timezone issues
    //     const year = selectedDate.getFullYear();
    //     const month = selectedDate.getMonth() + 1; // Months are 0-based, so we add 1
    //     const day = selectedDate.getDate();

    //     console.log('Selected_dATes', selectedDate);
    //     // Format the date as YYYY-MM-DD without any timezone or time adjustment
    //     const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
    //       day < 10 ? '0' : ''
    //     }${day}`;

    //     console.log('Selected Date:', formattedDate);
    //     onChangeText(formattedDate); // Send the formatted date back to the parent or handle it
    //   },
    //   [onChangeText],
    // );

    const handleConfirm = useCallback(
      params => {
        const selectedDate = new Date(params.date);

        // Get the UTC time and adjust it to Indian Standard Time (IST)
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 in milliseconds
        const istDate = new Date(selectedDate.getTime() + istOffset);

        // Get the year, month, and day explicitly for your needs
        const year = istDate.getFullYear();
        const month = istDate.getMonth() + 1; // Months are 0-based, so we add 1
        const day = istDate.getDate();

        console.log('Selected Dates:', istDate);

        // Return the date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
        const isoFormattedDate = istDate.toISOString();

        console.log('ISO Formatted Date in IST:', isoFormattedDate);

        // If you need just the date part in 'YYYY-MM-DD', you can also extract it
        // const dateOnly = isoFormattedDate.split('T')[0];

        // You can send the dateOnly to onChangeText if you prefer that format
        onChangeText(isoFormattedDate); // or send isoFormattedDate based on your requirements
      },
      [onChangeText],
    );

    // Toggle visibility of secure text entry (e.g., show/hide password)
    const toggleSecureEntry = useCallback(() => {
      setIsSecureEntry(prev => !prev);
    }, []);

    // Function to trigger shake animation
    const triggerShake = () => {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -10, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -5, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 5, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0, // Reset position
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Trigger shake animation if there's an error
    React.useEffect(() => {
      if (error) {
        triggerShake();
      }
    }, [error]);

    // Memoized function to render the date picker modal
    const renderDatePicker = useMemo(
      () => (
        <Modal
          isVisible={showDatePicker}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationOutTiming={500}
          animationInTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setShowDatePicker(false)}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              // Set defaults for mode and date, ensuring proper value handling
              mode={calendarMode || 'single'}
              date={value ? new Date(value) : new Date()}
              onChange={handleConfirm}
              // Simplified timePicker logic
              timePicker={timePicker || false}
              displayFullDays={true}
              locale="en"
              minDate={minDate || new Date('1950-01-01')}
              maxDate={maxDate || new Date('2030-12-31')}
              style={[
                styles.datePicker,
                {
                  fontFamily: theme.font.bold,
                  backgroundColor: 'red',
                },
              ]}
              // Styling for today and other components
              todayTextStyle={
                {
                  // color: '#ff0000',
                  // backgroundColor: 'green',
                  // backgroundColor: theme.color.secondary,
                }
              }
              headerTextStyle={[
                styles.headerTextStyle,
                {color: theme.color.textColor},
              ]}
              todayContainerStyle={{
                backgroundColor: theme.color.secondary,
                color: 'blue',
                borderColor: theme.color.black,
                fontFamily: theme.font.semiBold,
              }}
              weekDaysTextStyle={{
                color: 'black',
                fontFamily: theme.font.semiBold,
              }}
              yearContainerStyle={{backgroundColor: theme.color.textColor}}
              timePickerTextStyle={{color: 'black'}}
              timePickerIndicatorStyle={{
                color: 'black',
                backgroundColor: 'red',
              }}
              dayContainerStyle={{
                backgroundColor: 'black',
                color: 'black',
              }}
              monthContainerStyle={{backgroundColor: theme.color.textColor}}
              // Style for unselected and selected dates
              itemTextStyle={{
                color: '#f90000',
                backgroundColor: 'red',
                borderColor: 'red',
              }} // Unselected dates
              selectedTextStyle={{
                fontFamily: theme.font.extraBold,
                fontSize: getFontSize(1.3),
                color: '#f30000', // Selected date color
                borderColor: 'red',
              }}
              // Button styles for OK and Close
              headerButtonColor={theme.color.textColor}
              selectedItemColor={theme.color.textColor}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: 'transparent',
                    borderColor: theme.color.textColor,
                    //  theme.color.primary,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setShowDatePicker(false)}>
                <Text style={[styles.closeButtonText, {color: 'black'}]}>
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {backgroundColor: theme.color.secondary},
                ]}
                onPress={() => setShowDatePicker(false)}>
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ),
      [
        showDatePicker,
        value,
        calendarMode,
        timePicker,
        minDate,
        maxDate,
        handleConfirm,
      ],
    );

    // Define border color based on error presence
    const borderColor = error ? 'red' : theme.color.textColor;
    // currentTextColor;
    let activeBorderColor = error ? 'red' : theme.color.textColor;
    const animatedStyle = {
      transform: [
        {
          translateX: shakeAnim,
        },
      ],
    };

    return (
      <View style={[styles.container, style]}>
        {topLableName && (
          <Text
            style={{
              color: theme.color.textColor,

              fontFamily: theme.font.medium,
              fontSize: theme.fontSize.large,
              marginVertical: getResHeight(1),
            }}>
            {topLableName}
            {isMendotary && <Text style={{color: 'red'}}>{' *'}</Text>}
          </Text>
        )}
        {isDate ? (
          <>
            <TouchableOpacity
              style={[
                styles.dateInputWrapper,
                {
                  backgroundColor: theme.color.background,
                  textAlignVertical: 'center',
                  height: getResHeight(6),
                  borderColor: currentTextColor,
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setShowDatePicker(true)}>
              <View
                style={{
                  marginLeft: '1%',
                }}>
                <VectorIcon
                  type="Ionicons"
                  name="calendar-sharp"
                  size={getFontSize(2.7)}
                  color={theme.color.textColor}
                />
              </View>
              <Text
                style={[
                  styles.dateInputText,
                  {
                    color: theme.color.textColor,

                    marginLeft: '4%',
                  },
                ]}>
                {value
                  ? timePicker
                    ? dateFormatHander(value, 'DD MMM YYYY LT')
                    : dateFormatHander(value, 'DD MMM YYYY')
                  : placeholder}
              </Text>
            </TouchableOpacity>
            {renderDatePicker}
          </>
        ) : isDropdown ? (
          <Dropdown
            data={dropdownData}
            labelField="label"
            valueField="value"
            search={dropdownSearch}
            placeholder={placeholder}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onDropdownChange}
            style={[
              styles.dropdown,
              {
                borderColor: borderColor,
                backgroundColor: theme.color.background,
              },
            ]}
            selectedTextProps={{
              color: 'red',
            }}
            activeColor={theme.color.background}
            containerStyle={{
              backgroundColor: theme.color.background,
              // backgroundColor: 'green', // Ensure this is your intended background color
              borderBottomLeftRadius: getResHeight(2),
              borderBottomRightRadius: getResHeight(2),
              borderTopLeftRadius: getResHeight(2),
              borderTopRightRadius: getResHeight(2),
              marginTop: getResHeight(-0.1),
              borderWidth: 1,
              borderColor: currentTextColor,
              overflow: 'hidden',
              paddingVertical: 0, // Ensure padding is minimal
            }}
            itemTextStyle={{
              color: theme.color.textColor,
              height: 20,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.6),
              marginVertical: 0, // Remove vertical spacing
              paddingVertical: 0, // Remove padding
            }}
            itemContainerStyle={{
              maxHeight: getResHeight(7), // Fixed height
              margin: 0,
              padding: 0,
              backgroundColor: theme.color.offWhite,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            placeholderStyle={{
              color: theme.color.grey,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.6),
            }}
            renderRightIcon={() => (
              <VectorIcon
                type={'AntDesign'}
                name={isFocus ? 'upcircle' : 'downcircle'}
                size={getFontSize(2.1)}
                color={theme.color.textColor}
                style={{
                  zIndex: 1,
                }}
              />
            )}
            selectedTextStyle={{
              color: theme.color.textColor,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.6),
              // backgroundColor: theme.color.dimGrey,
            }}
          />
        ) : (
          <View style={styles.textInputWrapper}>
            <Animated.View style={[animatedStyle]}>
              <PaperTextInput
                mode={mode}
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                secureTextEntry={isSecureEntry}
                outlineColor={borderColor}
                multiline={multiline}
                placeholderTextColor={theme.color.textColor}
                activeOutlineColor={activeBorderColor}
                keyboardType={keyboardType}
                onSubmitEditing={onSubmitEditing}
                // cursorColor={theme.color.dimBlack}
                maxLength={maxLength}
                selectionColor={theme.color.dimBlack}
                cursorColor={theme.color.textColor}
                labelStyle={{
                  color: 'red',
                  marginLeft: '5%',
                }}
                theme={{
                  roundness: roundness ? roundness : 23,
                }}
                style={{
                  backgroundColor: theme.color.background,
                  textAlignVertical: 'center',
                  borderRadius: 50,
                }}
                contentStyle={[
                  {
                    width: '100%',

                    fontSize: theme.fontSize.medium,
                    textAlignVertical: 'center',
                    height: getResHeight(6),

                    fontFamily: theme.font.medium,
                    color: theme.color.textColor,
                  },
                  multiline && {
                    width: '100%',

                    height: getResHeight(14),
                    textAlignVertical: 'top',
                    lineHeight: getResHeight(3),
                  },
                ]}
                textColor={currentTextColor}
                ref={textInputRef}
                {...rest}
              />
            </Animated.View>
            {secureTextEntry && (
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleSecureEntry}>
                <Icon
                  name={isSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={currentTextColor}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {error && (
          <>
            <Text
              style={{
                fontFamily: theme.font.medium,
                marginTop: '2%',
                marginLeft: '4%',
                fontSize: getFontSize(1.5),
                color: '#ff0038',
              }}>
              {error}
            </Text>

            {!secureTextEntry && (
              <>
                <AntDesign
                  name="closecircle"
                  size={getResHeight(2.3)}
                  color={'#ff0038'}
                  style={styles.eyeIcon}
                />
              </>
            )}
          </>
        )}
        {isValid && !error && (
          <Icon
            name="check-circle"
            size={getResHeight(2.7)}
            color={theme.color.primary}
            style={styles.eyeIcon}
          />
        )}
      </View>
    );
  },
);
const getStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: getResHeight(1),
        },
        dateInputWrapper: {
          borderRadius: 50,
          borderRadius: 4,

          borderRadius: 50,
          // borderRadius: getResHeight(2),
          padding: 12,
          borderWidth: 1,
          borderColor: 'gray',
          justifyContent: 'center',
        },
        dateInputText: {
          fontSize: getFontSize(1.8),
          fontFamily: theme.font.regular, // color: 'orange',
        },
        datePickerContainer: {
          backgroundColor: 'white',
          padding: 20,

          borderRadius: 10,
          // borderRadius: getResHeight(2),
          alignSelf: 'center',
          backgroundColor: 'white',
          // '#F4FAF3',
        },
        datePicker: {
          width: '100%',
        },
        headerTextStyle: {
          fontFamily: theme.font.bold,
          fontSize: getFontSize(2),
        },
        yearContainerStyle: {
          backgroundColor: 'red',
        },
        monthContainerStyle: {
          backgroundColor: 'red',
        },
        textInputWrapper: {
          position: 'relative',
        },
        eyeIcon: {
          position: 'absolute',
          right: getResHeight(1.5),
          top: getResHeight(2.5),
        },
        buttonContainer: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        closeButton: {
          width: '48%',
          padding: 10,
          backgroundColor: theme.color.green,

          borderRadius: 50,
          // borderRadius: 5,
          alignItems: 'center',
        },
        closeButtonText: {
          color: 'white',
          fontSize: 16,
        },
        dropdown: {
          height: getResHeight(6),

          borderRadius: 50,

          padding: 12,
          borderWidth: 1,
          justifyContent: 'center',
        },
      }),
    [theme],
  );
};

export default React.memo(MasterTextInput);
