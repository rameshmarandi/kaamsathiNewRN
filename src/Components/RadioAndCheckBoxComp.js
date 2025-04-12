import {View, Text} from 'react-native';
import React from 'react';
import {Checkbox} from 'react-native-paper';
import {useSelector} from 'react-redux';
import theme from '../utility/theme';

const RadioAndCheckBoxComp = React.memo(() => {
  const [checked, setChecked] = React.useState(false);
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  return (
    <View>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        uncheckedColor={theme.color.darkModeTextInputOutline}
        color={currentTextColor}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
});

export default RadioAndCheckBoxComp;
