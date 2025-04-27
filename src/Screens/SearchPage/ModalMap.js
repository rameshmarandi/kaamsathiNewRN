import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { VectorIcon } from '../../Components/VectorIcon'; // Custom vector icon component
import useAppTheme from '../../Hooks/useAppTheme';
import { getResHeight, getResWidth } from '../../utility/responsive';

// Demo Data for Workers (Near Pune's Coordinates)
const workersDemoData = [
  { latitude: 18.521, longitude: 73.857, name: 'John Doe', skill: 'Plumber' },
  { latitude: 18.523, longitude: 73.858, name: 'Jane Smith', skill: 'Electrician' },
  { latitude: 18.524, longitude: 73.859, name: 'Alice Johnson', skill: 'Carpenter' },
  { latitude: 18.526, longitude: 73.86, name: 'Bob Brown', skill: 'Painter' },
  { latitude: 18.527, longitude: 73.861, name: 'Chris Lee', skill: 'Mason' },
];

const ModalMap = ({
  isVisible,
  onClose,
  workers = workersDemoData,
  onBookNow,
}) => {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Pune coordinates for user location
  const userLocation = {
    latitude: 18.5204, // Pune latitude
    longitude: 73.8567, // Pune longitude
  };

  const [selectedRadius, setSelectedRadius] = useState(5); // Default radius 5 km
  const [availableWorkersCount, setAvailableWorkersCount] = useState(0);

  useEffect(() => {
    // Calculate available workers count whenever the radius changes
    const calculateAvailableWorkers = radius => {
      const radiusInMeters = radius * 1000; // Convert to meters
      const count = workers.filter(worker => {
        const distance = getDistance(userLocation, {
          latitude: worker.latitude,
          longitude: worker.longitude,
        });
        return distance <= radiusInMeters;
      }).length;
    //   setAvailableWorkersCount(0);
      setAvailableWorkersCount(count);
    };

    calculateAvailableWorkers(selectedRadius);
  }, [selectedRadius, workers]);

  // Function to calculate distance between two coordinates using the Haversine formula
  const getDistance = (location1, location2) => {
    const R = 6371000; // Radius of the Earth in meters
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.latitude;
    const lon2 = location2.longitude;

    const phi1 = lat1 * (Math.PI / 180);
    const phi2 = lat2 * (Math.PI / 180);
    const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
    const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Returns the distance in meters
  };

  // Function to calculate zoom level based on radius
  const getZoomLevel = radius => {
    const zoomLevel = {
      1: 0.02,
      2: 0.04,
      3: 0.06,
      4: 0.08,
      5: 0.1,
      6: 0.12,
      7: 0.15,
      8: 0.2,
      9: 0.25,
      10: 0.3,
    };
    return zoomLevel[radius] || 0.5; // Default value for larger radii
  };

  // Worker Details to Display in Modal
  const workerDetails = {
    total_workers_available: availableWorkersCount, // Example: 5 workers available
    distance_range: `${selectedRadius} km`, // Example: 5 km
    skill_name: 'Plumber', // Example: Worker skill
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.8}
        style={{
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
        }}>
        <VectorIcon
          name={'arrow-back'}
          type={'Ionicons'}
          size={theme.fontSize.xxLarge}
          color={theme.color.background}
        />
      </TouchableOpacity>

      <View style={styles.modalBackground}>
        {/* Full Screen Map View */}
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: getZoomLevel(selectedRadius),
            longitudeDelta: getZoomLevel(selectedRadius),
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {/* Display Available Workers */}
          {workers.map((worker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: worker.latitude,
                longitude: worker.longitude,
              }}
              title={worker.name}
              icon={
                <VectorIcon
                  type={'Ionicons'}
                  name={'ios-person-circle'}
                  size={40}
                  color={'blue'}
                />
              }
            />
          ))}

          {/* Fixed Radius Circle - Positioned around the user location */}
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={selectedRadius * 900} // Radius in meters (e.g., 5 km)
            strokeColor="#3498db"
            fillColor="rgba(52, 152, 219, 0.2)"
            zIndex={1}
          />
        </MapView>

        {/* Modal Content - Curved Header */}
        <View style={styles.modalContainer}>
        <View>
            {/* Dynamically render worker details */}
            {Object.keys(workerDetails).map((key, index) => (
              <Text style={styles.workerDetails} key={index}>
                {`${key.replace(/_/g, ' ')}: ${workerDetails[key]}`}
              </Text>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {/* Close Button - Full Width if no workers */}
            <Pressable
              style={[
                styles.closeModalButton,
                {
                  borderWidth: 1,
                  borderColor: theme.color.textColor,
                  width: availableWorkersCount === 0 ? '100%' : '48%',
                },
              ]}
              onPress={onClose}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: theme.color.textColor,
                  },
                ]}>
                Close
              </Text>
            </Pressable>

            {/* Book Now Button */}
            {availableWorkersCount > 0 && (
              <Pressable style={styles.bookNowButton} onPress={onBookNow}>
                <Text style={styles.buttonText}>Book Now</Text>
              </Pressable>
            )}
          </View>
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      minHeight: getResHeight(30), // Adjusted height for the modal
      backgroundColor: theme.color.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 10,
    },
    workerDetails: {
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
      marginTop: 10,
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeModalButton: {
      backgroundColor: theme.color.background,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookNowButton: {
      backgroundColor: theme.color.primary,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default ModalMap;
