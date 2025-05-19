import React, {useState, useEffect, useMemo, useRef} from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps'
import {Slider} from 'react-native-elements'
import {VectorIcon} from '../../Components/VectorIcon'
import useAppTheme from '../../Hooks/useAppTheme'
import {getResHeight, getResWidth} from '../../utility/responsive'
import LottieView from 'lottie-react-native'

const workersDemoData = [
  {latitude: 18.521, longitude: 73.857, name: 'John Doe', skill: 'Plumber'},
  {
    latitude: 18.523,
    longitude: 73.858,
    name: 'Jane Smith',
    skill: 'Electrician',
  },
  {
    latitude: 18.524,
    longitude: 73.859,
    name: 'Alice Johnson',
    skill: 'Carpenter',
  },
  {latitude: 18.526, longitude: 73.86, name: 'Bob Brown', skill: 'Painter'},
  {latitude: 18.527, longitude: 73.861, name: 'Chris Lee', skill: 'Mason'},
]

const messages = [
  {
    id: 1,
    text: 'Looking for available workers near you...',
    animation: require('../../assets/animationLoader/search.json'),
  },
  {
    id: 2,
    text: 'Finding the best match based on your request...',
    animation: require('../../assets/animationLoader/search.json'),
  },
  {
    id: 3,
    text: 'Worker found! Confirming your booking...',
    animation: require('../../assets/animationLoader/search.json'),
  },
  {
    id: 4,
    text: 'Your booking is confirmed.',
    animation: require('../../assets/animationLoader/success.json'),
  },
]

const ModalMap = ({
  isVisible,
  onClose,
  workers = workersDemoData,
  onBookNow,
  onComplete,
}) => {
  const theme = useAppTheme()
  const styles = useMemo(() => getStyles(theme), [theme])

  const userLocation = {latitude: 18.5204, longitude: 73.8567}
  const [selectedRadius, setSelectedRadius] = useState(5)
  const [availableWorkersCount, setAvailableWorkersCount] = useState(0)

  const animatedRadius = useRef(new Animated.Value(0)).current
  const [displayRadius, setDisplayRadius] = useState(selectedRadius * 1000)
  const [isSearching, setIsSearching] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isSearching) return
    let timers = []
    setStep(0)
    messages.forEach((_, i) => {
      const timer = setTimeout(() => {
        setStep(i)
        if (i === messages.length - 1) {
          setTimeout(() => {
            setIsSearching(false)
            onClose()
            onComplete && onComplete()
          }, 3500)
        }
      }, i * 2000)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [isSearching])

  useEffect(() => {
    const radiusInMeters = selectedRadius * 1000
    Animated.timing(animatedRadius, {
      toValue: radiusInMeters,
      duration: 500,
      useNativeDriver: false,
    }).start()

    const count = workers.filter(worker => {
      const distance = getDistance(userLocation, {
        latitude: worker.latitude,
        longitude: worker.longitude,
      })
      return distance <= radiusInMeters
    }).length
    setAvailableWorkersCount(count)
  }, [selectedRadius, workers])

  useEffect(() => {
    const id = animatedRadius.addListener(({value}) => {
      setDisplayRadius(value)
    })
    return () => {
      animatedRadius.removeListener(id)
    }
  }, [])

  const getDistance = (loc1, loc2) => {
    const R = 6371000
    const toRad = d => d * (Math.PI / 180)
    const dLat = toRad(loc2.latitude - loc1.latitude)
    const dLon = toRad(loc2.longitude - loc1.longitude)
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.latitude)) *
        Math.cos(toRad(loc2.latitude)) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const workerDetails = {
    Available_workers: availableWorkersCount,
    Selected_radius: `${selectedRadius} km`,
    skill_name: 'Plumber',
    Estimated_starting_price: '₹ 200-300',
  }

  const getMapRegion = (center, radiusInKm) => {
    const radiusInDegree = radiusInKm / 111
    return {
      latitude: center.latitude,
      longitude: center.longitude,
      latitudeDelta: radiusInDegree * 2.5,
      longitudeDelta: radiusInDegree * 2.5,
    }
  }

  return (
    <Modal
      visible={isVisible}
      animationType='fade'
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <MapView
          style={styles.map}
          region={getMapRegion(userLocation, selectedRadius)}
          zoomEnabled
          zoomControlEnabled
          showsUserLocation
          showsMyLocationButton>
          {workers.map((worker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: worker.latitude,
                longitude: worker.longitude,
              }}
              title={worker.name}
            />
          ))}
          <Circle
            center={userLocation}
            radius={displayRadius}
            strokeColor='#3498db'
            fillColor='rgba(52, 152, 219, 0.2)'
            zIndex={1}
          />
        </MapView>

        <TouchableOpacity
          onPress={onClose}
          style={[
            styles.backButton,
            {
              top: Platform.OS == 'ios' ? getResHeight(5) : getResHeight(3),
            },
          ]}>
          <VectorIcon
            name='arrow-back'
            type='Ionicons'
            size={theme.fontSize.xxLarge}
            color={theme.color.background}
          />
        </TouchableOpacity>

        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <VectorIcon
              name='close'
              type='Ionicons'
              size={theme.fontSize.xxLarge}
              color={theme.color.background}
            />
          </TouchableOpacity>

          {isSearching ? (
            <View style={styles.searchingContainer}>
              <LottieView
                source={messages[step].animation}
                autoPlay
                loop
                style={{height: getResHeight(60), width: getResWidth(60)}}
              />
              <Text style={styles.searchText}>{messages[step].text}</Text>
            </View>
          ) : (
            <>
              <Text style={styles.headerText}>Search Details</Text>
              <View style={styles.detailsContainer}>
                {Object.entries(workerDetails).map(([key, value], index) => (
                  <View style={styles.detailRow} key={index}>
                    <Text style={styles.detailLabel}>
                      {key.replace(/_/g, ' ')}:
                    </Text>
                    <Text style={styles.detailValue}>{value}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>Note :</Text>
                <Text style={styles.noteText}>
                  Price may vary based on job complexity or material cost.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.closeModalButton,
                    {
                      width: availableWorkersCount === 0 ? '100%' : '48%',
                      borderColor: theme.color.textColor,
                    },
                  ]}
                  onPress={onClose}>
                  <Text
                    style={[styles.buttonText, {color: theme.color.textColor}]}>
                    Close
                  </Text>
                </TouchableOpacity>

                {availableWorkersCount > 0 && (
                  <TouchableOpacity
                    style={styles.bookNowButton}
                    onPress={() => {
                      setIsSearching(true)
                      onBookNow()
                    }}>
                    <Text style={styles.buttonText}>Book Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.color.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding:"5%",

    },
    backButton: {
      position: 'absolute',
      top: getResHeight(5),
      left: getResHeight(2),
      height: getResHeight(5),
      width: getResHeight(5),
      backgroundColor: theme.color.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResHeight(100),
      zIndex: 99,
    },
    closeButton: {
      position: 'absolute',
      top: getResHeight(2),
      right: getResHeight(2),
      backgroundColor: theme.color.textColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResHeight(100),
      zIndex: 99,
    },
    headerText: {
      textAlign: 'center',
      fontFamily: theme.font.semiBold,
      fontSize: theme.fontSize.large,
      color: theme.color.textColor,
    },
    detailsContainer: {
      marginTop: '5%',
    },
    detailRow: {
      flexDirection: 'row',
      marginTop: "3%",
    },
    detailLabel: {
      fontFamily: theme.font.bold,
      fontSize: theme.fontSize.medium,
      color: theme.color.textColor,
    },
    detailValue: {
      marginLeft: '2%',
      fontFamily: theme.font.medium,
      fontSize: theme.fontSize.large,
      color: theme.color.textColor,
    },
    noteContainer: {
      marginTop: getResHeight(3),
      marginBottom: getResHeight(2),
      backgroundColor: 'rgba(230, 180, 42, 0.3)',
      padding: '2%',
      borderRadius: 8,
    },
    noteTitle: {
      fontFamily: theme.font.bold,
      fontSize: theme.fontSize.medium,
      color: theme.color.textColor,
    },
    noteText: {
      fontFamily: theme.font.medium,
      fontSize: theme.fontSize.small,
      color: theme.color.textColor,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getResHeight(2),
    },
    closeModalButton: {
      backgroundColor: theme.color.background,
      paddingVertical:  getResHeight(1.4),
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    bookNowButton: {
      backgroundColor: theme.color.primary,
      paddingVertical: getResHeight(1.4),
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
    },
    buttonText: {
      color:  theme.color.textColor,
       fontFamily: theme.font.medium,
      fontSize: theme.fontSize.large,
    },
    searchingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchText: {
      fontSize: theme.fontSize.large,
      color: theme.color.textColor,
      fontFamily: theme.font.semiBold,
      marginTop: getResHeight(2),
    },
  })

export default ModalMap
