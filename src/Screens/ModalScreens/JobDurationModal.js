import React, {useMemo, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {getFontSize, getResHeight} from '../../utility/responsive';
import {VectorIcon} from '../../Components/VectorIcon';
import useAppTheme from '../../Hooks/useAppTheme';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  setJobDuration,
  setSelectedRadius,
} from '../../redux/reducer/SearchReducer';
import {getStyles} from './UserRadiusModal';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 10;
const cardWidth = (screenWidth - cardMargin * 4) / 2;
const jobDurations = [
  {id: 0, label: '1 hour', value: 1},
  {id: 1, label: '2 hours', value: 2},
  {id: 2, label: '3 hours', value: 3},
  {id: 3, label: 'Half day (4 hrs)', value: 4},
  {id: 4, label: 'Full day (8 hrs)', value: 8},
];

const JobDurationModal = ({
  isModalVisible,
  selectedDistance,
  onBackdropPress,
  //   handleSelectDistance,
}) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const {selectedRadius, jobDuration, bookingDate} = useSelector(
    state => ({
      selectedRadius: state.search.selectedRadius,
      jobDuration: state.search.jobDuration,
      bookingDate: state.search.bookingDate,
    }),
    shallowEqual,
  );

  const onSelect = useCallback(
    (item, index) => {
      console.log('Selected_raisu', item);
      //   handleSelectDistance({id: index, distance: item});
      dispatch(setJobDuration(item));

      onBackdropPress();
    },
    [onBackdropPress],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      const isSelected = jobDuration.id === item.id;

      return (
        <>
          <TouchableOpacity
            style={[
              styles.card,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
              isSelected && styles.cardSelected,
            ]}
            activeOpacity={0.85}
            onPress={() => onSelect(item, index)}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="timelapse"
              size={getFontSize(2)}
              color={isSelected ? theme.color.background : theme.color.textColor}
            />
            <Text
              style={[
                styles.cardText,
                {marginLeft: '3%'},
                isSelected && styles.cardTextSelected,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        </>
      );
    },
    [jobDuration],
  );

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={600}
      style={[styles.modal]}>
      <View style={styles.modalContent}>
        <View style={styles.handleIndicator} />
        <Text style={styles.modalTitle}>
          How long do you expect the job to take?
        </Text>

        <TouchableOpacity
          onPress={onBackdropPress}
          style={styles.closeButton}
          activeOpacity={0.8}>
          <VectorIcon
            type="Ionicons"
            name="close-circle-sharp"
            size={getFontSize(4)}
            color={theme.color.textColor}
          />
        </TouchableOpacity>

        <FlatList
          data={jobDurations}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
};

export default JobDurationModal;
