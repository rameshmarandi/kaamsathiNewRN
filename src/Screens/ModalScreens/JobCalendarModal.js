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
  const datePickerStyles = useMemo(
    () => ({
      today: {
        borderColor: theme.color.textColor,
      },

      selected: {
        backgroundColor: theme.color.textColor,
        color: theme.color.textColor,

        backgroundColor: theme.color.primaryRGBA,
      },
      selected_label: {
        color: theme.color.background,
        fontFamily: theme.font.bold,
        fontSize: getFontSize(1.8),
      },
      disabled: {
        color: 'red',
        opacity: 0.2,
        backgroundColor: theme.color.nonActiveTextColor,
      },
    }),
    [theme.color.textColor],
  )

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
          How long do you expect the job to take?
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

        <View style={{backgroundColor: 'white'}}>
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
