import React, {memo, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import useAppTheme from '../Hooks/useAppTheme';
import {useTheme} from '../Hooks/ThemeContext';

const CustomButton = memo(
  ({
    title = 'Hire Now',
    onPress,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
  }) => {
    const theme = useTheme();

    const styles = getStyles()
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={disabled || loading}
          style={[
            styles.hireButton,
            (disabled || loading) && styles.disabledButton,
          ]}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.color.textColor} />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {leftIcon && leftIcon}
                <Text
                  style={[
                    styles.hireButtonText,
                    leftIcon && {
                      marginLeft: getResWidth(1),
                    },
                  ]}>
                  {title}
                </Text>
                {rightIcon && rightIcon}
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  },
);

const getStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        footer: {
          backgroundColor: theme.color.primary,
          overflow: 'hidden',
          borderRadius: getResHeight(3),
        },
        hireButton: {
          width: '100%',
          alignSelf: 'center',
          backgroundColor: theme.color.primary,
          borderRadius: getResHeight(3),
          paddingVertical: getResHeight(1),
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        hireButtonText: {
          fontSize: theme.fontSize.large,
          fontFamily: theme.font.medium,
          color: theme.color.textColor,
          textAlign: 'center',
        },
        disabledButton: {
          backgroundColor: theme.color.grey, // Adjust the disabled color as per your theme
          opacity: 0.6,
        },
      }),
    [theme],
  );
};

export default CustomButton;
