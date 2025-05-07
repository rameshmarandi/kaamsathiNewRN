import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, shallowEqual} from 'react-redux';
import useAppTheme from '../../Hooks/useAppTheme';
import {VectorIcon} from '../../Components/VectorIcon';
import {getFontSize} from '../../utility/responsive';

const filterItems = [
  {
    key: 'bookingDate',
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
];

const SearchFilter = ({
  onOpenDateModal = () => {},
  onOpenDurationModal = () => {},
  onOpenRadiusModal = () => {},
  isDistanceModalVisible = false,
}) => {
  const theme = useAppTheme();
  const [activeKey, setActiveKey] = useState(null);

  const {selectedRadius, jobDuration, bookingDate} = useSelector(
    state => ({
      selectedRadius: state.search.selectedRadius,
      jobDuration: state.search.jobDuration,
      bookingDate: state.search.bookingDate,
    }),
    shallowEqual,
  );

  const styles = useMemo(() => getStyles(theme), [theme]);

  const valueMap = useMemo(
    () => ({
      bookingDate: bookingDate || '',
      jobDuration: jobDuration.label ? jobDuration.label : '',
      radius: selectedRadius ? `${selectedRadius}` : '',
    }),
    [bookingDate, jobDuration, selectedRadius],
  );

  const handlerMap = useMemo(
    () => ({
      bookingDate: onOpenDateModal,
      jobDuration: onOpenDurationModal,
      radius: onOpenRadiusModal,
    }),
    [onOpenDateModal, onOpenDurationModal, onOpenRadiusModal],
  );

  useEffect(() => {
    if (!isDistanceModalVisible) {
      setActiveKey(null);
      setActiveKey(0);
    }
  }, [isDistanceModalVisible]);

  const rotationAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(rotationAnim, {
  //     toValue: activeKey ? 1 : 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // }, [activeKey]);

  // const rotateInterpolate = rotationAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '180deg'],
  // });

  const handlePress = useCallback(
    key => {
      setActiveKey(key);
      handlerMap[key](); // Proper mapping to the right modal
    },
    [handlerMap],
  );

  return (
    <View style={styles.container}>
      {filterItems.map(({key, label, icon, placeholder}) => {
        const isActive = activeKey === key;

        return (
          <TouchableOpacity
            key={key}
            style={styles.card}
            onPress={() => handlePress(key)}
            activeOpacity={0.8}>
            <Icon
              name={icon}
              size={theme.fontSize.xxLarge}
              color={theme.color.background}
              style={styles.icon}
            />
            <View style={styles.textBox}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{valueMap[key] || placeholder}</Text>
            </View>
            <View style={[styles.arrow]}>
              <VectorIcon
                type="AntDesign"
                name={isActive ? 'upcircle' : 'downcircle'}
                size={getFontSize(2.2)}
                color={theme.color.background}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(SearchFilter);

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
      backgroundColor: theme.color.textColor,
      borderWidth: 1,
      borderColor: theme.color.border,
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
      color: theme.color.background,
    },
    value: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.color.background,
      marginTop: 2,
      textAlign: 'center',
    },
    arrow: {
      position: 'absolute',
      right: '5%',
      top: '5%',
    },
  });
