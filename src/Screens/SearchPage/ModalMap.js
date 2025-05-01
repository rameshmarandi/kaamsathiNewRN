import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import {Slider} from 'react-native-elements';
import {VectorIcon} from '../../Components/VectorIcon';
import useAppTheme from '../../Hooks/useAppTheme';
import {getResHeight, getResWidth} from '../../utility/responsive';
import LottieView from 'lottie-react-native';

// Demo Data for Workers (Near Pune's Coordinates)
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
];
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
];

const ModalMap = ({
  isVisible,
  onClose,
  workers = workersDemoData,
  onBookNow,
  onComplete,
}) => {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userLocation = {latitude: 18.5204, longitude: 73.8567};
  const [selectedRadius, setSelectedRadius] = useState(5);
  const [availableWorkersCount, setAvailableWorkersCount] = useState(0);

  const animatedRadius = useRef(new Animated.Value(0)).current; // for ripple effect
  const [displayRadius, setDisplayRadius] = useState(selectedRadius * 1000);
  const [isSearching, setIsSearching] = useState(false);

  //Search staes
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isSearching) return;
  
    let timers = [];
    setStep(0);
  
    messages.forEach((_, i) => {
      const timer = setTimeout(() => {
        setStep(i);
        if (i === messages.length - 1) {
          setTimeout(() => {
            
            setIsSearching(false);  // Reset searching state
            onComplete && onComplete();  // Call onComplete if provided
            onClose();  // Close the modal after the final confirmation
          }, 3500); // Wait a bit before closing the modal
        }
      }, i * 2000); // 2 seconds per step
  
      timers.push(timer);
    });
  
    return () => timers.forEach(clearTimeout);
  }, [isSearching]);
  
  useEffect(() => {
    const calculateAvailableWorkers = radius => {
      const radiusInMeters = radius * 1000;
      const count = workers.filter(worker => {
        const distance = getDistance(userLocation, {
          latitude: worker.latitude,
          longitude: worker.longitude,
        });
        return distance <= radiusInMeters;
      }).length;
      setAvailableWorkersCount(count);
    };

    calculateAvailableWorkers(selectedRadius);
  }, [selectedRadius, workers]);

  useEffect(() => {
    const radiusInMeters = selectedRadius * 1000;

    // Animate the radius
    Animated.timing(animatedRadius, {
      toValue: radiusInMeters,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Update available workers count
    const count = workers.filter(worker => {
      const distance = getDistance(userLocation, {
        latitude: worker.latitude,
        longitude: worker.longitude,
      });
      return distance <= radiusInMeters;
    }).length;
    setAvailableWorkersCount(count);
  }, [selectedRadius, workers]);

  useEffect(() => {
    const id = animatedRadius.addListener(({value}) => {
      setDisplayRadius(value);
    });
    return () => {
      animatedRadius.removeListener(id);
    };
  }, []);

  const getDistance = (location1, location2) => {
    const R = 6371000;
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.latitude;
    const lon2 = location2.longitude;
    const phi1 = lat1 * (Math.PI / 180);
    const phi2 = lat2 * (Math.PI / 180);
    const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
    const deltaLambda = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const workerDetails = {
    Available_workers: availableWorkersCount,
    Selected_radius: `${selectedRadius} km`,
    skill_name: 'Plumber',
    Estimated_starting_price: '₹ 200-300',
  };

  const getMapRegion = (center, radiusInKm) => {
    const radiusInDegree = radiusInKm / 111; // Approx: 1° ≈ 111 km
    return {
      latitude: center.latitude,
      longitude: center.longitude,
      latitudeDelta: radiusInDegree * 2.5, // 2.5 adds buffer to show the full circle
      longitudeDelta: radiusInDegree * 2.5,
    };
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.8}
        style={styles.backButton}>
        <VectorIcon
          name="arrow-back"
          type="Ionicons"
          size={theme.fontSize.xxLarge}
          color={theme.color.background}
        />
      </TouchableOpacity>

      <View style={styles.modalBackground}>
        <MapView
          style={styles.map}
          region={getMapRegion(userLocation, selectedRadius)}
          zoomEnabled
          zoomControlEnabled
          showsUserLocation
          showsMyLocationButton>
          {/* Worker Markers */}
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

          {/* Circle for selected radius */}
          <Circle
            center={userLocation}
            radius={displayRadius}
            strokeColor="#3498db"
            fillColor="rgba(52, 152, 219, 0.2)"
            zIndex={1}
          />
        </MapView>

        {/* Ripple Effect */}
        <Animated.View
          style={[
            styles.ripple,
            {
              width: selectedRadius * 100, // Adjust size of ripple effect
              height: selectedRadius * 100,
              borderRadius: selectedRadius * 50, // Half the size for circular shape
              transform: [
                {
                  scale: animatedRadius.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
              opacity: animatedRadius.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        />

        {/* Modal Content */}
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.closeButton}>
            <VectorIcon
              name="close"
              type="Ionicons"
              size={theme.fontSize.xxLarge}
              color={theme.color.background}
            />
          </TouchableOpacity>

          {isSearching ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: getResHeight(20),
                  width: '100%',
                  marginTop: getResHeight(-4),
                }}>
                <LottieView
                  source={messages[step].animation}
                  autoPlay
                  loop
                  style={{
                    height: getResHeight(60),
                    width: getResWidth(60),
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: theme.fontSize.large,
                  color: theme.color.textColor,
                  fontFamily: theme.font.semiBold,
                  marginTop: getResHeight(2),
                }}>
                {messages[step].text}
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.headerText}>Search Details</Text>

              <View style={styles.detailsContainer}>
                {Object.keys(workerDetails).map((key, index) => (
                  <View style={styles.detailRow} key={index}>
                    <Text style={styles.detailLabel}>{`${key.replace(
                      /_/g,
                      ' ',
                    )}:`}</Text>
                    <Text
                      style={
                        styles.detailValue
                      }>{` ${workerDetails[key]}`}</Text>
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
                  activeOpacity={0.8}
                  style={[
                    styles.closeModalButton,
                    {
                      width: availableWorkersCount === 0 ? '100%' : '48%',
                      borderWidth: 1,
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
                    activeOpacity={0.8}
                    style={styles.bookNowButton}
                    onPress={() => {
                      setIsSearching(true);
                      onBookNow();
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
  );
};

const getStyles = theme =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    ripple: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: -50, // Half of the radius to center it
      marginTop: -50, // Half of the radius to center it
      backgroundColor: 'rgba(52, 152, 219, 0.3)',
      zIndex: 10,
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      minHeight: getResHeight(35),
      backgroundColor: theme.color.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -5},
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 10,
    },
    backButton: {
      height: getResHeight(5),
      width: getResHeight(5),
      backgroundColor: theme.color.textColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResHeight(100),
      position: 'absolute',
      top: getResHeight(5),
      left: getResHeight(2),
      zIndex: 99,
    },
    closeButton: {
      backgroundColor: theme.color.textColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResHeight(100),
      position: 'absolute',
      top: getResHeight(2),
      right: getResHeight(2),
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
    },
    detailLabel: {
      fontFamily: theme.font.bold,
      textTransform: 'capitalize',
      fontSize: theme.fontSize.medium,
      color: theme.color.textColor,
      marginTop: 10,
    },
    detailValue: {
      fontSize: theme.fontSize.large,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
      marginTop: 10,
      marginLeft: '2%',
    },
    noteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
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
      color: theme.color.textColor,
      fontFamily: theme.font.medium,
      fontSize: theme.fontSize.small,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getResHeight(2),
    },
    closeModalButton: {
      backgroundColor: theme.color.background,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    bookNowButton: {
      backgroundColor: theme.color.primary,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default ModalMap;
