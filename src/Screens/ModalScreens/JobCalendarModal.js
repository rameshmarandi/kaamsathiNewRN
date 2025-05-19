import moment from 'moment'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import Modal from 'react-native-modal'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {VectorIcon} from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import {setBookingDate} from '../../redux/reducer/SearchReducer'
import {getFontSize, getResHeight} from '../../utility/responsive'
import {getStyles} from './UserRadiusModal'

const JobCalendarModal = ({
  isModalVisible,

  onBackdropPress,
}) => {
  const theme = useAppTheme()
  const dispatch = useDispatch()
  // Memoized selector
  const bookingDate = useSelector(
    state => state.search.bookingDate,
    shallowEqual,
  )
  const styles = useMemo(() => getStyles(theme), [theme])

  const [lastCheckedDate, setLastCheckedDate] = useState(null)

  // Memoized date calculations
  const {datesArray, todayFormatted} = useMemo(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const formatDate = date => date.toISOString().split('T')[0]
    const todayFormatted = formatDate(today)

    return {
      datesArray: [
        {id: 1, date: todayFormatted, text: 'Today'},
        {id: 2, date: formatDate(tomorrow), text: 'Tomorrow'},
      ],
      todayFormatted,
    }
  }, [])

  // Check if we should skip selection for today
  const shouldSkipSelection = useMemo(() => {
    if (!lastCheckedDate) return false
    return moment(lastCheckedDate).isSame(moment(), 'day')
  }, [lastCheckedDate])

  const onSelect = useCallback(
    (item, index) => {
      dispatch(setBookingDate(item))

      onBackdropPress()
    },
    [dispatch, onBackdropPress, shouldSkipSelection],
  )

  const currentSelection =
    bookingDate?.id !== undefined ? bookingDate : {id: 1, date: todayFormatted}

  const renderItem = useCallback(
    ({item, index}) => {
      const isSelected = currentSelection.id === item.id
      const isTodayDisabled = shouldSkipSelection && item.id === 1

      return (
        <TouchableOpacity
          style={[
            styles.card,
            isSelected && styles.cardSelected,
            {
              flexDirection: 'row',
              paddingVertical: getResHeight(0.3),
              paddingHorizontal:0
            },
          ]}
          activeOpacity={0.85}
          onPress={() => onSelect(item, index)}
          disabled={isTodayDisabled}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <VectorIcon
              type='MaterialCommunityIcons'
              name='calendar'
              size={getFontSize(3)}
              color={
                isSelected ? theme.color.background : theme.color.textColor
              }
            />
          </View>
          <View
            style={{
              marginLeft: '4%',
            }}>
            <Text
              style={[
                styles.cardText,
                isSelected && styles.cardTextSelected,

                isTodayDisabled && styles.disabledText,
                {
                  marginBottom: 0,
                },
              ]}>
              {item.text}
            </Text>
            <Text
              style={[
                styles.cardText,
                isSelected && styles.cardTextSelected,
                isTodayDisabled && styles.disabledText,
                {
                  marginTop: 0,
                  fontSize: theme.fontSize.small,
                },
              ]}>
              {moment(item.date).format('DD MMM YYYY')}
            </Text>
          </View>
        </TouchableOpacity>
      )
    },
    [currentSelection.id, onSelect, shouldSkipSelection],
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
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View style={[styles.modalContent]}>
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

        <FlatList
          data={datesArray}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  )
}

export default React.memo(JobCalendarModal)
