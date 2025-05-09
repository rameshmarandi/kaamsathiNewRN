import React, { useMemo, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-ui-datepicker'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getFontSize } from '../../utility/responsive'
import { VectorIcon } from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import { setBookingDate } from '../../redux/reducer/SearchReducer'
import { getStyles } from './UserRadiusModal'

const screenWidth = Dimensions.get('window').width
const JobCalendarModal = ({
  isModalVisible,
  onBackdropPress,
}) => {
  const theme = useAppTheme()
  const dispatch = useDispatch()
  const styles = useMemo(() => getStyles(theme), [theme])

  const { bookingDate } = useSelector(
    state => ({ bookingDate: state.search.bookingDate }),
    shallowEqual,
  )

  // const handleConfirm = useCallback((params) => {
  //   const selectedDate = params?.date
  //   if (!selectedDate) return

  //   // Convert to ISO format
  //   const isoFormattedDate = new Date(selectedDate).toISOString()
  //   dispatch(setBookingDate(isoFormattedDate))
  //   onBackdropPress()
  // }, [dispatch, onBackdropPress])

  const handleConfirm = useCallback(
    (params) => {
      const selectedDate = params?.date
      if (!selectedDate) return
  
      const isoFormattedDate = new Date(selectedDate).toISOString()
  
      // Prevent unnecessary dispatches
      if (isoFormattedDate !== bookingDate) {
        dispatch(setBookingDate(isoFormattedDate))
      }
  
      onBackdropPress()
    },
    [ bookingDate]
  )
  

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={600}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.handleIndicator} />
        <Text style={styles.modalTitle}>
          How long do you expect the job to take?
        </Text>

        <TouchableOpacity
          onPress={onBackdropPress}
          style={styles.closeButton}
          activeOpacity={0.8}
        >
          <VectorIcon
            type="Ionicons"
            name="close-circle-sharp"
            size={getFontSize(4)}
            color={theme.color.textColor}
          />
        </TouchableOpacity>

        <View style={{ backgroundColor: 'white' }}>
          <DatePicker
            mode="single"
            date={bookingDate}
            onChange={handleConfirm}
            displayFullDays
            disableMonthPicker
            disableYearPicker
            locale="en"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
            styles={{
              day: { color: '#ffe600' },
              today: {
                borderColor: theme.color.textColor,
                borderWidth: 1,
                borderRadius: 100,
                color: 'red',
              },
              selected: {
                backgroundColor: theme.color.textColor,
                color: 'red',
                borderRadius: 100,
              },
              selected_label: { color: 'red' },
              disabled: { color: 'gray', opacity: 0.4 },
            }}
          />

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
              onPress={onBackdropPress}
            >
              <Text style={[styles.closeButtonText, { color: 'black' }]}>
                Close
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: theme.color.secondary },
              ]}
              onPress={onBackdropPress}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default React.memo(JobCalendarModal)
