import {StyleSheet} from 'react-native';

import assets from './assets';
import {getFontSize, getResHeight} from '../responsive';

const color = {
  primary: '#27ae60',
  greenBRGA: 'rgba(17, 255, 0, 0.985)',
  dimGreen: '#a8dcab',
  redBRGA: 'rgba(255, 0, 0, 1)',
  // secondary2: '#001F3F',
  secondary2: '#FF9800',
  secondary: '#e6b42a',

  secondaryRGBA: 'rgba(230, 180, 42, 0.8)',
  // secondaryRGBA: 'rgba(230, 180, 42, 0.3)',

  lighYellow: '#FFF8E1',
  dimBlack: '#474545',
  // #424242
  iceWhite: '#F1F1F1',
  white: '#FFFFFF',
  naviBlue: '#263238',
  grey: '#7d7c7c',
  textColor: '#333333',
  black: '#000000',
  dimGrey: '#ECEFF1',
  whiteBg: '#f8f9fe',
  charcolBlack: '#212121',
  whiteText: '#FFFFFF',
  offWhite: '#FAFAFA',
  outlineColor: '#999999',
  placeholder: '#C0C0C0',
  dardkModeOnBGColor: '#e6b42a',
  // '#D99A00',

  // '#E6A700',
  // '#FFDE21',
  // '#FFC107',
  // '#012537',
  darkModeOffBGColor: '#FFFFFF',
};

const englishFont = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  italic: 'Poppins-Italic',
  thin: 'Poppins-Thin',
};
const hindiFont = {
  regular: 'hindi-Regular',
  semiBold: 'hindi-SemiBold',
  medium: 'hindi-Medium',
  bold: 'hindi-Bold',
  extraBold: 'hindi-ExtraBold',
  italic: 'hindi-Thin',
  thin: 'hindi-Thin',
};

const styles = StyleSheet.create({
  roundBtnShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,
  },
  cardEffect: {
    backgroundColor: color.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(0.3),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});

const fontSize = {
  small: getFontSize(1.4),
  medium: getFontSize(1.6),
  large: getFontSize(1.8),
  extraLarge: getFontSize(2),
};

const theme = {
  color,
  font: englishFont,
  styles,
  assets,
  fontSize,
};

export default theme;
