import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useSelector, shallowEqual} from 'react-redux'
import useAppTheme from '../../Hooks/useAppTheme'
import {VectorIcon} from '../../Components/VectorIcon'
import {getFontSize} from '../../utility/responsive'
import moment from 'moment'

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

const SearchFilter = ({
  onOpenDateModal = () => {},
  onOpenCalendarModal = () => {},
  onOpenDurationModal = () => {},
  onOpenRadiusModal = () => {},
  isDistanceModalVisible = false,
}) => {
  const theme = useAppTheme()
  const [activeKey, setActiveKey] = useState(null)

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
  const styles = useMemo(() => getStyles(theme), [theme])

  // console.log('Bookin_date', moment(bookingDate).format('YYYY-MM-DD'))
  // Memoize valueMap and handlerMap to prevent recalculations
  const valueMap = useMemo(
    () => ({
      calendar:
        bookingDate && moment(bookingDate).isValid()
          ? moment(bookingDate).format('DD MM YYYY')
          : moment(new Date()).format('DD MM YYYY'), // Provide a fallback text if invalid

      jobDuration: jobDuration.label || '',
      radius: selectedRadius ? `${selectedRadius.placeholder}` : '',
    }),
    [bookingDate, jobDuration, selectedRadius],
  )

  const handlerMap = useMemo(
    () => ({
      bookingDate: onOpenDateModal,
      calendar: onOpenCalendarModal,
      jobDuration: onOpenDurationModal,
      radius: onOpenRadiusModal,
    }),
    [
      onOpenDateModal,
      onOpenCalendarModal,
      onOpenDurationModal,
      onOpenRadiusModal,
    ],
  )

  // Optimize effect to avoid unnecessary state updates
  useEffect(() => {
    if (!isDistanceModalVisible && activeKey !== null) {
      setActiveKey(null)
    }
  }, [isDistanceModalVisible, activeKey])

  const rotationAnim = useRef(new Animated.Value(0)).current

  // Use callback with proper checks to avoid unnecessary state updates
  const handlePress = useCallback(
    key => {
      if (key !== activeKey) {
        // Only update activeKey if it's different
        setActiveKey(key)
        handlerMap[key]() // Proper mapping to the right modal
      }
    },
    [handlerMap, activeKey], // Recreate only when activeKey or handlerMap changes
  )

  return (
    <View style={styles.container}>
      {filterItems.map(({key, label, icon, placeholder}) => {
        const isActive = activeKey === key

        return (
          <TouchableOpacity
            key={key}
            style={styles.card}
            onPress={() => handlePress(key)}
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      backgroundColor: theme.color.background,
    },
    card: {
      flex: 1,
      backgroundColor: theme.color.background,
      borderWidth: 1,
      borderColor: theme.color.primary,
      borderRadius: 12,
      marginHorizontal: 4,
      padding: 10,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      position: 'relative',
    },
    icon: {
      marginBottom: 6,
    },
    textBox: {
      alignItems: 'center',
    },
    label: {
      fontSize: theme.fontSize.small,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
    },
    value: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.color.textColor,
      marginTop: 2,
      textAlign: 'center',
    },
    arrow: {
      position: 'absolute',
      right: '5%',
      top: '5%',
    },
  })
