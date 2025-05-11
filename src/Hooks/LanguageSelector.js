import React, { useState, memo, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { VectorIcon } from '../Components/VectorIcon';
import { MultiLngModal } from '../Components/ModalsComponent';
import { languageOptions } from '../../i18n';
import { getFontSize, getResWidth } from '../utility/responsive';
import useAppTheme from './useAppTheme';

const LanguageSelector = forwardRef(({ isOnlyIcon = false, hideIcon = false }, ref) => {
  const { i18n } = useTranslation();
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [isModalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
  }));

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectedLanguage =
    languageOptions.find(lang => lang.code === i18n.language)?.label || 'Select';

  return (
    <View>
      {/* Language Modal */}
      <MultiLngModal
        isModalVisible={isModalVisible}
        onBackdropPress={closeModal}
      />

      {/* Conditional UI */}
      {!hideIcon && (
        <TouchableOpacity onPress={openModal} style={styles.languageSelector}>
          <VectorIcon
            type="Ionicons"
            name="language"
            size={getFontSize(3)}
            color={theme.color.textColor}
          />
          {!isOnlyIcon && (
            <>
              <Text style={styles.languageText}>{selectedLanguage}</Text>
              <VectorIcon
                type="MaterialCommunityIcons"
                name="chevron-down"
                size={getFontSize(2)}
                color={theme.color.textColor}
              />
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
});

const getStyles = theme =>
  StyleSheet.create({
    languageSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.color.border,
      paddingHorizontal: getResWidth(1.3),
      paddingVertical: getResWidth(0.8),
      borderRadius: getResWidth(1.5),
      backgroundColor: theme.color.background,
      justifyContent: 'space-between',
    },
    languageText: {
      fontSize: getFontSize(1.5),
      fontFamily: theme.font.semiBold,
      color: theme.color.textColor,
      paddingHorizontal: getResWidth(1),
    },
  });

export default memo(LanguageSelector);
