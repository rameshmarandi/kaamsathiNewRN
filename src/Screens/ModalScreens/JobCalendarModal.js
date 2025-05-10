import React, {useMemo, useCallback, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-ui-datepicker'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {getFontSize} from '../../utility/responsive'
import {VectorIcon} from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import {setBookingDate} from '../../redux/reducer/SearchReducer'
import {getStyles} from './UserRadiusModal'

const screenWidth = Dimensions.get('window').width

const JobCalendarModal = ({isModalVisible, onBackdropPress}) => {
  const theme = useAppTheme()
  const dispatch = useDispatch()
  const styles = useMemo(() => getStyles(theme), [theme])

  // Memoized selector to prevent unnecessary re-renders
  const bookingDate = useSelector(
    state => state.search.bookingDate,
    shallowEqual,
  )

  // Log only when bookingDate actually changes
  useEffect(() => {
    console.log('BookingDate updated:', bookingDate)
  }, [bookingDate])

  // Stable callback reference
  const handleConfirm = useCallback(
    params => {
      const selectedDate = params?.date
      if (!selectedDate) return

      const isoFormattedDate = new Date(selectedDate).toISOString()

      // Dispatch only if date actually changed
      if (isoFormattedDate !== bookingDate) {
        dispatch(setBookingDate(isoFormattedDate))
      }

      onBackdropPress()
    },
    [bookingDate, dispatch, onBackdropPress],
  )

  // Memoize DatePicker styles
// Memoize DatePicker styles with complete dark mode support
const datePickerStyles = useMemo(
  () => ({
    container: {
      backgroundColor: theme.color.background,
    },
    headerContainer: {
      backgroundColor: theme.color.background,
      borderBottomColor: theme.color.border,
    },
    headerText: {
      color: theme.color.textColor,
      fontFamily: theme.font.semiBold,
    },
    headerSubTitle: {
      color: theme.color.textSecondary,
    },
    dayName: {
      color: theme.color.textSecondary,
      fontFamily: theme.font.medium,
    },
    dayContainer: {
      backgroundColor: theme.color.background,
    },
    day: {
      color: theme.color.textColor,
      fontFamily: theme.font.regular,
    },
    today: {
      backgroundColor: theme.color.primary + '20',
      borderColor: theme.color.primary,
      borderWidth: 1,
      borderRadius: 8,
    },
    selected: {
      backgroundColor: theme.color.primary,
      borderRadius: 8,
    },
    selected_label: {
      color: theme.color.background,
      fontFamily: theme.font.bold,
    },
    disabled: {
      color: theme.color.textSecondary + '80',
    },
    week: {
      backgroundColor: theme.color.backgroundSecondary,
      borderRadius: 8,
      marginVertical: 4,
    },
    monthPickerContainer: {
      backgroundColor: theme.color.background,
      borderColor: theme.color.border,
    },
    yearPicker: {
      backgroundColor: theme.color.background,
      borderColor: theme.color.border,
    },
    headerButton: {
      tintColor: theme.color.textColor,
    },
  }),
  [
    theme.color.background,
    theme.color.backgroundSecondary,
    theme.color.textColor,
    theme.color.textSecondary,
    theme.color.primary,
    theme.color.border,
    theme.font.semiBold,
    theme.font.medium,
    theme.font.regular,
    theme.font.bold
  ]
);
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection='down'
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      animationOutTiming={600}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.handleIndicator} />
        <Text style={styles.modalTitle}>
         {`Choose your preferred \nstart date (today or tomorrow)`}
        </Text>

        <TouchableOpacity
          onPress={onBackdropPress}
          style={styles.closeButton}
          activeOpacity={0.8}>
          <VectorIcon
            type='Ionicons'
            name='close-circle-sharp'
            size={getFontSize(4)}
            color={theme.color.textColor}
          />
        </TouchableOpacity>

        <View style={{backgroundColor:  theme.color.background}}>
          <DatePicker
            mode='single'
            date={bookingDate ? new Date(bookingDate) : new Date()}
            onChange={handleConfirm}
            displayFullDays
            disableMonthPicker
            disableYearPicker
            locale='en'
            minDate={new Date()}
            maxDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
            styles={datePickerStyles}
          />

          {/* Memoize button container */}
          {/* {useMemo(() => (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: 'transparent',
                    borderColor: theme.color.charcolBlack,
                    borderWidth: 1,
                  },
                ]}
                onPress={onBackdropPress}>
                <Text style={[styles.closeButtonText, {color: 'black'}]}>
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {backgroundColor: theme.color.secondary},
                ]}
                onPress={onBackdropPress}>
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          ), [styles, theme.color.charcolBlack, theme.color.secondary, onBackdropPress])} */}
        </View>
      </View>
    </Modal>
  )
}

export default React.memo(JobCalendarModal)
