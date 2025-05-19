import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-ui-datepicker';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getFontSize} from '../../utility/responsive';
import {VectorIcon} from '../../Components/VectorIcon';
import useAppTheme from '../../Hooks/useAppTheme';
import {setBookingDate} from '../../redux/reducer/SearchReducer';
import UserRadiusModal, {getStyles} from './UserRadiusModal';
import JobDurationModal from './JobDurationModal';
import JobCalendarModal from './JobCalendarModal';
import SearchFilter from '../SearchPage/SearchFilter';

const BookingFilterModal = ({isModalVisible, onBackdropPress}) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [isDistanceModalVisible, setIsDistanceModalVisible] = useState(false);
  const [isJobDurationModalVisible, setIsJobDurationModalVisible] =
    useState(false);
  const [isJobCalendarModalVisible, setIsJobCalendarModalVisible] =
    useState(false);
  const [selectedDistance, setSelectedDistance] = useState(5);

   const handleOpenCalendarModal = useCallback(
      () => setIsJobCalendarModalVisible(true),
      [],
    )
    const handleOpenDurationModal = useCallback(
      () => setIsJobDurationModalVisible(true),
      [],
    )
    const handleOpenRadiusModal = useCallback(
      () => setIsDistanceModalVisible(true),
      [],
    )
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={100}
      style={{
        flex:1,
        backgroundColor:"red"
      }}>
      <View style={{
        width:"100%"
      }}>
        <View style={styles.handleIndicator} />
        <Text style={styles.modalTitle}>
          {`Choose your preferred \nstart date (today or tomorrow)`}
        </Text>

        <UserRadiusModal
          isModalVisible={isDistanceModalVisible}
          onBackdropPress={() => setIsDistanceModalVisible(false)}
          selectedDistance={selectedDistance}
          handleSelectDistance={item => setSelectedDistance(item)}
        />

        <JobDurationModal
          isModalVisible={isJobDurationModalVisible}
          onBackdropPress={() => setIsJobDurationModalVisible(false)}
        />

        <JobCalendarModal
          isModalVisible={isJobCalendarModalVisible}
          onBackdropPress={() => setIsJobCalendarModalVisible(false)}
        />

        <SearchFilter
          // isDistanceModalVisible={isDistanceModalVisible}
          // onOpenDurationModal={handleOpenDurationModal}
          // onOpenCalendarModal={handleOpenCalendarModal}
          // onOpenRadiusModal={handleOpenRadiusModal}
        />
      </View>
    </Modal>
  );
};

export default React.memo(BookingFilterModal);
