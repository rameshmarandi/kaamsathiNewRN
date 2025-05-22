import React from 'react';
import {Modal, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../Hooks/ThemeContext';
import SearchFilter from '../SearchPage/SearchFilter';

const BookNowFilterModal = ({
  isModalVisible,
  onBackdropPress,
  onConfirmPress,
}) => {
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={onBackdropPress}
      animationType="fade"
      transparent={true}>
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onBackdropPress}
      />

      {/* Bottom View */}
      <View style={styles.bottomView}>
        <View style={styles.handleIndicator} />
        <Text style={styles.title}>Filter Options</Text>
        <SearchFilter />
        {/* Your content here */}

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPress}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.color.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      paddingBottom: 30,
    },
    handleIndicator: {
      width: 40,
      height: 5,
      backgroundColor: '#ccc',
      borderRadius: 3,
      alignSelf: 'center',
      marginBottom: 15,
    },
    title: {
      fontSize: theme.fontSize.medium,
      color: theme.color.textColor,
      fontFamily: theme.font.medium,
      marginBottom: 20,
      textAlign: 'center',
    },
    confirmButton: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default React.memo(BookNowFilterModal);
