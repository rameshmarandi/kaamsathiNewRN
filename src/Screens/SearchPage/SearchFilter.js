import React, {memo, useMemo, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {shallowEqual, useSelector} from 'react-redux'

import moment from 'moment'
import {VectorIcon} from '../../Components/VectorIcon'
import {useTheme} from '../../Hooks/ThemeContext'
import {getFontSize} from '../../utility/responsive'
import JobCalendarModal from '../ModalScreens/JobCalendarModal'
import JobDurationModal from '../ModalScreens/JobDurationModal'
import UserRadiusModal from '../ModalScreens/UserRadiusModal'
import {searchFilterStyles} from './styles/searchFilter.styles'

const filterItems = [
  {
    key: 'calendar',
    label: 'Booking Date',
    icon: 'calendar-clock',
    placeholder: 'Select Date',
  },
  {
    key: 'jobDuration',
    label: 'Job Duration',
    icon: 'timer-sand',
    placeholder: 'Select Duration',
  },
  {
    key: 'radius',
    label: 'Radius',
    icon: 'map-marker-radius',
    placeholder: 'Select Radius',
  },
]

const SearchFilter = ({}) => {
  const theme = useTheme()
  const [activeKey, setActiveKey] = useState(null)

  const [radisModal, setRadisModal] = useState(false)
  const [jobDurationModal, setJobDurationModal] = useState(false)
  const [calendarModal, setCalendarModal] = useState(false)

  // Using shallowEqual to optimize redux state selector
  const {selectedRadius, jobDuration, bookingDate} = useSelector(
    state => ({
      selectedRadius: state.search.selectedRadius,
      jobDuration: state.search.jobDuration,
      bookingDate: state.search.bookingDate,
    }),
    shallowEqual, // This prevents unnecessary re-renders
  )

  // console.log('Selected_Raius_fom_store', selectedRadius.placeholder)
  const styles = searchFilterStyles()

  // Memoized date calculations
  const todayDate = useMemo(() => {
    const today = new Date()

    const formatDate = date => date.toISOString().split('T')[0]
    const todayFormatted = formatDate(today)

    return todayFormatted
  }, [])

  const valueMap = useMemo(
    () => ({
      calendar:
        bookingDate && moment(bookingDate.date).isValid()
          ? moment(bookingDate.date).format('DD MMM YYYY')
          : moment(todayDate).format('DD MMM YYYY'), // Provide a fallback text if invalid

      jobDuration: jobDuration.label || '',
      radius: selectedRadius ? `${selectedRadius.placeholder}` : '',
    }),
    [bookingDate, jobDuration, selectedRadius],
  )

  const handlerMap = key => {
    switch (key) {
      case 'calendar':
        setCalendarModal(true)
        break
      case 'jobDuration':
        setJobDurationModal(true)
        break
      case 'radius':
        setRadisModal(true)
        break
    }
  }

  return (
    <View style={styles.container}>
      <JobCalendarModal
        isModalVisible={calendarModal}
        onBackdropPress={() => setCalendarModal(false)}
      />
      {/* Job duriation modal */}
      <JobDurationModal
        isModalVisible={jobDurationModal}
        onBackdropPress={() => setJobDurationModal(false)}
      />

      <UserRadiusModal
        isModalVisible={radisModal}
        onBackdropPress={() => setRadisModal(false)}
      />

      {filterItems.map(({key, label, icon, placeholder}) => {
        const isActive = activeKey === key

        return (
          <TouchableOpacity
            key={key}
            style={styles.card}
            onPress={() => {
              handlerMap(key)
            }}
            activeOpacity={0.8}>
            <Icon
              name={icon}
              size={theme.fontSize.xxLarge}
              color={theme.color.textColor}
              style={styles.icon}
            />
            <View style={styles.textBox}>
              <Text style={styles.label}>{label}</Text>

              <Text style={styles.value}>{valueMap[key] || placeholder}</Text>
            </View>
            <View style={[styles.arrow]}>
              <VectorIcon
                type='AntDesign'
                name={isActive ? 'upcircle' : 'downcircle'}
                size={getFontSize(2.2)}
                color={theme.color.background}
              />
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default memo(SearchFilter)
