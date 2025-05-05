import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import useAppTheme from '../Hooks/useAppTheme';

const SearchBarComp = ({
  autoFocus = false,
  disabled = false,
  placeholder = 'Search...',
  containerStyle,
  onChangeText,
  value,
  placeholderTextColor,
  autoCapitalize = 'none',
  isLoading = false,
  onFocus,
  onClear = () => {},
  round = 10,
}) => {
  const theme = useAppTheme();
  const {currentTextColor, isDarkMode} = useSelector(state => state.user);

  return (
    <View style={{zIndex: 9999}}>
      <SearchBar
        placeholder={placeholder}
        placeholderTextColor={
          isDarkMode ? theme.color.background : theme.color.textColor
        }
        searchIcon={{
          color: isDarkMode ? theme.color.background : theme.color.textColor,
          size: getFontSize(2.5),
        }}
        clearIcon={{
          color: isDarkMode ? theme.color.background : theme.color.textColor,
          size: getFontSize(2.5),
        }}
        disabled={disabled}
        showLoading={isLoading}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
        round
        onClear={onClear}
        cursorColor={
          isDarkMode ? theme.color.background : theme.color.textColor
        }
        containerStyle={[
          styles.container,
          {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          containerStyle,
        ]}
        inputContainerStyle={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode
              ? theme.color.textColor
              : theme.color.primary,
            borderColor: theme.color.border,
            borderWidth: 1,
          },
        ]}
        inputStyle={{
          color: isDarkMode ? theme.color.background : theme.color.textColor,
          fontSize: getFontSize(1.8),
          fontFamily: theme.font.medium,
        }}
      />

      {/* <SearchBar
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.color.placeholder}
        searchIcon={{
          color: theme.color.textColor,
          size: getFontSize(2.5),
        }}
        clearIcon={{
          color: theme.color.textColor,
          size: getFontSize(2.5),
        }}
        disabled={disabled}
        showLoading={isLoading}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
        round
        onClear={onClear}
        cursorColor={currentTextColor}
        containerStyle={[
          styles.container,
          { backgroundColor: 'transparent' },
          containerStyle,
        ]}
        inputContainerStyle={[
          styles.inputContainer,
          {
            backgroundColor: theme.color.backgroundLight,
            borderColor: theme.color.border,
          },
        ]}
        inputStyle={{
          color: theme.color.textColor,
          fontSize: getFontSize(1.8),
          fontFamily: theme.font.medium,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getResWidth(90),
    alignSelf: 'center',
    paddingHorizontal: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginVertical: getResHeight(1),
  },
  inputContainer: {
    height: getResHeight(6),
    borderWidth: 1,
    borderRadius: getResHeight(3),
    paddingHorizontal: getResWidth(2),
  },
});

export default React.memo(SearchBarComp);
