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
import {useDispatch} from 'react-redux';
import {setSelectedRadius} from '../../redux/reducer/SearchReducer';

const screenWidth = Dimensions.get('window').width
const cardMargin = 8;
const cardWidth = (screenWidth - cardMargin * 6) / 2;

const UserRadiusModal = ({
  isModalVisible,
  selectedDistance,
  onBackdropPress,
  handleSelectDistance,
}) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const distances = useMemo(
    () => Array.from({length: 10}, (_, i) => `${i + 1} km`),
    [],
  );

  const currentSelection =
    selectedDistance?.id !== undefined
      ? selectedDistance
      : {id: 4, distance: '5 km'};

  const onSelect = useCallback(
    (item, index) => {
      console.log('Selected_raisu', item);
      handleSelectDistance({id: index, distance: item});
      dispatch(setSelectedRadius(item));

      onBackdropPress();
    },
    [handleSelectDistance, onBackdropPress],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      const isSelected = currentSelection.id === index;
      return (
        <TouchableOpacity
          style={[styles.card, isSelected && styles.cardSelected]}
          activeOpacity={0.85}
          onPress={() => onSelect(item, index)}>
          <Text
            style={[styles.cardText, isSelected && styles.cardTextSelected]}>
            📍 {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [currentSelection.id, styles, onSelect],
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
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.handleIndicator} />
        <Text style={styles.modalTitle}>Set Your Preferred Radius</Text>

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
          data={distances}
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

export const getStyles = theme =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: theme.color.background,

      maxHeight: getResHeight(55),

      paddingBottom: '10%',
      position: 'relative',
      justifyContent:"center",
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalTitle: {
      fontSize: theme.fontSize.xLarge,
      fontFamily: theme.font.bold,
      textAlign: 'center',
      color: theme.color.textColor,
      marginBottom: getResHeight(2),
      marginTop: getResHeight(2),
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    handleIndicator: {
      width: 50,
      height: 6,
      backgroundColor: '#ccc',
      borderRadius: 50,
      alignSelf: 'center',
      marginBottom: 12,
    },
    listContent: {
      // paddingBottom: 20,
    },
    card: {
      width: cardWidth,
      margin: cardMargin,
      paddingVertical: getResHeight(1),
      borderRadius: 100,
      backgroundColor: theme.color.background,
      borderColor: theme.color.border,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    cardSelected: {
      backgroundColor: '#f5b942',
      shadowColor: '#f5b942',
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    cardText: {
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
    },
    cardTextSelected: {
      color: theme.color.background,
      fontFamily: theme.font.semiBold,
      fontSize: theme.fontSize.medium,
    },
  });

export default UserRadiusModal;
