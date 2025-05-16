import React, {memo} from 'react';
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {VectorIcon} from '../../Components/VectorIcon';
import useAppTheme from '../../Hooks/useAppTheme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import { bookingCardStyles } from './styles/bookingCard.style';

// const getStatusColor = status => {

//   switch (status) {
//     case 'Confirmed':
//       return theme.color.successRGBA;
//     case 'Completed':
//       return theme.color.successPrimary;
//     case 'Ongoing':
//       return theme.color.ratingColor;
//     default:
//       return '#9E9E9E';
//   }
// };

const BookingCard = memo(
  ({
    data,
    viewBtnPress,
    onHireNowBtnPress,
    setIsReported,
    isReported = [],
    setIsReviewModalVisible,
    cancelBooking,
    startWork,
  }) => {
    const theme = useAppTheme();
    const styles = bookingCardStyles();

    const {
      bookingTimestamp,
      profilePic,
      laborName,
      serviceType,
      bookingTime,
      location,
      status,
      progress,
      cancelable,
      id,
    } = data;

    const getStatusConfig = () => {
      const theme = useAppTheme();
      switch (status) {
        case 'Confirmed':
          return {
            color: theme.color.successPrimary,
            label: 'Confirmed',
            icon: 'check-circle',
          };
        case 'Ongoing':
          return {
            color: theme.color.warning,
            label: 'In Progress',
            icon: 'clock',
          };
        case 'Completed':
          return {
            color: theme.color.successPrimary,
            label: 'Completed',
            icon: 'check-circle',
          };
        case 'Canceled':
          return {
            color: theme.color.error,
            label: 'Canceled',
            icon: 'x-circle',
          };
        default:
          return {color: '#999', label: status, icon: 'info'};
      }
    };

    const statusConfig = getStatusConfig();

    const isBookingDatePassed = true;
    //    Date.now() >= bookingTimestamp;
    const bookingDate = new Date(bookingTimestamp).toLocaleDateString('en-GB');
    const canStartWork =
      status === 'Confirmed' && !cancelable && isBookingDatePassed;
    const canCancelBooking = status === 'Confirmed' && cancelable;

    const handleReport = () => {
      const alreadyReported = isReported.includes(id);
      Alert.alert(
        'Report User',
        alreadyReported
          ? 'Do you want to remove the report for this user?'
          : 'Do you want to report this user?',
        [
          {text: 'No', style: 'cancel'},
          {
            text: 'Yes',
            onPress: () => {
              setIsReported(prev =>
                alreadyReported
                  ? prev.filter(_id => _id !== id)
                  : [...prev, id],
              );
            },
          },
        ],
      );
    };

    const Button = ({text, onPress, isPrimary}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.button,
          isPrimary ? styles.primaryButton : styles.secondaryButton,
        ]}>
        <Text
          style={[styles.buttonText, isPrimary && styles.primaryButtonText]}>
          {text}
        </Text>
      </TouchableOpacity>
    );

    const openPhone = () => {
      Linking.openURL('tel:9876543210'); // Replace with dynamic number
    };

    const openMap = () => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=28.6139,77.209`,
      ); // Replace with dynamic lat/lng
    };

    return (
      <View style={styles.cardContainer}>
        {/* Top Section */}

        <View style={styles.row}>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              source={{
                uri: 'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
              }}
              style={[
                styles.profilePic,
                {
                  position: 'relative',
                },
              ]}
            />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: getResHeight(0.2), // Adjusted for responsiveness
                right: getResWidth(1.5), // Adjusted for responsiveness
                height: getResHeight(4),
                width: getResHeight(4),
                borderRadius: getResHeight(2), // Ensures circular shape
                backgroundColor: 'white',
                borderColor: theme.color.primary,
                borderWidth: 2,
              }}>
              <VectorIcon
                type="MaterialIcons"
                name={'verified'}
                size={getFontSize(2.4)}
                color={theme.color.successPrimary}
              />
            </View>
          </View>
          {/* <Image source={{ uri: profilePic }} style={styles.profilePic} /> */}

          <View style={styles.detailsContainer}>
            <Text style={styles.laborName}>{laborName}</Text>
            <Text style={styles.serviceType}>{serviceType}</Text>
            <Text
              style={styles.infoText}>{`${bookingDate} | ${bookingTime}`}</Text>
            <Text style={styles.infoText}>{location}</Text>
          </View>

          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: statusConfig.color + '20',
                position: 'absolute',
                right: 0,
                top: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <VectorIcon
              type="Feather"
              name="check-circle"
              size={getFontSize(1.9)}
              color={theme.color.dimBlack}
            />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        {/* Completed: Report & Review */}
        {status === 'Completed' && (
          <View style={styles.reviewContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.quickActionCard}
              onPress={handleReport}>
              <VectorIcon
                type="Ionicons"
                name={isReported.includes(id) ? 'warning' : 'warning-outline'}
                size={getFontSize(2.8)}
                color={theme.color.redBRGA}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsReviewModalVisible(true)}
              style={styles.quickActionCard}>
              <VectorIcon
                type="MaterialIcons"
                name="reviews"
                size={getFontSize(2.8)}
                color={theme.color.textColor}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Ongoing: Progress Bar */}
        {status === 'Ongoing' && (
          <View
            style={[styles.progressContainer, {paddingTop: getResHeight(2.2)}]}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? '#4CAF50' : '#FFC107',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{`${progress}% completed`}</Text>
          </View>
        )}

        {/* Actions (Call & Map) */}
        {status !== 'Canceled' && status !== 'Completed' && (
          <View style={styles.reviewContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.quickActionCard}
              onPress={openPhone}>
              <VectorIcon
                type="Feather"
                name="phone-call"
                size={getFontSize(2.5)}
                color={theme.color.dimBlack}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              disabled={canCancelBooking}
              onPress={openMap}
              style={[
                styles.quickActionCard,
                canCancelBooking && {backgroundColor: '#e8e3e3'},
              ]}>
              <VectorIcon
                type="MaterialCommunityIcons"
                name="map-marker-radius"
                size={getFontSize(3)}
                color={theme.color.dimBlack}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* View & Hire Again */}
        {(status === 'Completed' || status === 'Canceled') && (
          <View style={{flexDirection: 'row', marginTop: getResHeight(2)}}>
            <Button text="View Details" onPress={viewBtnPress} />
            <Button text="Hire Again" onPress={onHireNowBtnPress} isPrimary />
          </View>
        )}

        {/* Cancel Booking */}
        {canCancelBooking && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Alert.alert('Cancel Booking', 'Are you sure?', [
                {text: 'No', style: 'cancel'},
                {text: 'Yes', onPress: () => cancelBooking(id)},
              ])
            }
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}

        {/* Start Work */}
        {canStartWork && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => startWork(id)}
            style={styles.startWorkButton}>
            <Text style={styles.startWorkButtonText}>Start Work</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default BookingCard;
