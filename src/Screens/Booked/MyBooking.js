import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import useAppTheme from '../../Hooks/useAppTheme';

import TabViewComp from '../../Components/TabViewComp';
import BookingCard from './BookingCard';
import NoDataFound from '../../Components/NoDataFound';
import SafeAreaContainer from '../../Components/SafeAreaContainer';

const MyBooking = props => {
  const {navigation} = props;
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [simulatedDate, setSimulatedDate] = useState(Date.now());

  const flatListRef = useRef(null);

  // Scroll to top when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }
    }, []),
  );

  const addNewBooking = useCallback((daysToAdd = 1) => {
    const newDate = new Date(simulatedDate);
    newDate.setDate(newDate.getDate() + daysToAdd);

    const newBooking = {
      id: Date.now().toString(),
      laborName: 'Ramesh Kumar',
      profilePic:
        'https://www.shutterstock.com/image-photo/engineer-worker-standing-confident-on-260nw-2223884221.jpg',
      serviceType: 'Electrician',
      bookingTimestamp: newDate.getTime(),
      bookingTime: '10:30 AM',
      location: 'Mumbai, Maharashtra',
      status: 'Confirmed',
      cancelable: true,
      progress: 0,
      startTime: null,
    };

    setActiveBookings(prev => [...prev, newBooking]);
  }, [simulatedDate]);

  const cancelBooking = useCallback(id => {
    setActiveBookings(prev => {
      const updatedBookings = prev.map(booking =>
        booking.id === id ? {...booking, status: 'Canceled'} : booking,
      );
      const canceledBooking = updatedBookings.find(booking => booking.id === id);
      if (canceledBooking) {
        setHistoryBookings(prevHistory => [...prevHistory, canceledBooking]);
      }
      return updatedBookings.filter(booking => booking.id !== id);
    });
  }, []);

  const startWork = useCallback(id => {
    setActiveBookings(prev =>
      prev.map(booking =>
        booking.id === id
          ? {...booking, status: 'Ongoing', startTime: Date.now(), progress: 0}
          : booking,
      ),
    );

    const interval = setInterval(() => {
      setActiveBookings(prev => {
        return prev.map(booking => {
          if (booking.id === id) {
            if (booking.progress < 100) {
              return {...booking, progress: booking.progress + 10};
            } else {
              clearInterval(interval);
              const completedBooking = {...booking, status: 'Completed'};
              setHistoryBookings(history => [...history, completedBooking]);
              return completedBooking;
            }
          }
          return booking;
        }).filter(b => b.status !== 'Completed');
      });
    }, 600);
  }, []);

  // Remove cancelable flag after 5 seconds
  useEffect(() => {
    const cancelTimers = activeBookings
      .filter(b => b.status === 'Confirmed' && b.cancelable)
      .map(booking =>
        setTimeout(() => {
          setActiveBookings(prev =>
            prev.map(b =>
              b.id === booking.id ? {...b, cancelable: false} : b,
            ),
          );
        }, 5000),
      );
    return () => cancelTimers.forEach(timer => clearTimeout(timer));
  }, [activeBookings]);

  const handleHireAgain = useCallback(() => {
    addNewBooking(1);
  }, [addNewBooking]);

  const handleViewDetails = useCallback(id => {
    navigation.navigate('EmployeeProfileDetails', {id});
  }, [navigation]);

  const renderActiveItem = useCallback(({item}) => (
    <BookingCard
      data={item}
      viewBtnPress={() => handleViewDetails(item.id)}
      onHireNowBtnPress={() => handleHireAgain(item.id)}
      cancelBooking={cancelBooking}
      startWork={startWork}
    />
  ), [handleViewDetails, handleHireAgain, cancelBooking, startWork]);

  const renderHistoryItem = useCallback(({item}) => (
    <BookingCard
      data={item}
      onHireNowBtnPress={handleHireAgain}
      viewBtnPress={() => handleViewDetails(item.id)}
    />
  ), [handleHireAgain, handleViewDetails]);

  const EmptyComponent = useMemo(() => (
    <View style={{marginTop: getResHeight(-10)}}>
      <NoDataFound />
    </View>
  ), []);

  const SimulationControls = useMemo(() => (
    <View style={styles.controlButtons}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.simulateButton}
        onPress={() => addNewBooking(1)}>
        <Text style={styles.buttonText}>Book for Tomorrow</Text>
      </TouchableOpacity>
    </View>
  ), [addNewBooking, styles]);

  const FirstRoute = useCallback(() => (
    <>
      {SimulationControls}
      <FlatList
        data={activeBookings.filter(b => b.status !== 'Completed')}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderActiveItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyComponent}
      />
    </>
  ), [SimulationControls, activeBookings, renderActiveItem, styles.listContainer, EmptyComponent]);

  const SecondRoute = useCallback(() => (
    <FlatList
      data={historyBookings}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderHistoryItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={EmptyComponent}
    />
  ), [historyBookings, renderHistoryItem, styles.listContainer, EmptyComponent]);

  const routes = useMemo(() => [
    {key: 'first', title: 'My Bookings'},
    {key: 'second', title: 'History'},
  ], []);

  const scenes = useMemo(() => ({
    first: FirstRoute,
    second: SecondRoute,
  }), [FirstRoute, SecondRoute]);

  return (
    <SafeAreaContainer>
      <TabViewComp
        routes={routes}
        scenes={scenes}
      />
    </SafeAreaContainer>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    listContainer: {
      padding: getResWidth(1),
    },
    simulateButton: {
      backgroundColor: '#3F51B5',
      padding: 10,
      borderRadius: 5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.color.textColor,
      fontSize: getFontSize(1.6),
    },
    controlButtons: {
      marginBottom: getResHeight(1),
    },
  });

export default React.memo(MyBooking);
