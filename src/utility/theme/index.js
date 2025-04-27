import {getFontSize, getResHeight} from '../responsive';
import assets from './assets';

import {fonts} from './font';

// You can add bengaliFont, orFont, pnjFont... as needed
const fontMap = {
  en: fonts.en,
  hi: fonts.hi,
  mara: fonts.mar,
  bn: fonts.bn,
  or: fonts.or,
  pnj: fonts.pnj,
};

const commonColors = {
  successPrimary: '#27ae60',
  redBRGA: 'rgba(255, 0, 0, 1)',
  greenBRGA: 'rgba(17, 255, 0, 0.985)',
  // secondary2: '#FF9800',
  primary: '#e6b42a',
  ratingColor:'#FFA500',
  primaryRGBA: 'rgba(230, 180, 42, 0.8)',
  outlineColor: '#999999',
  placeholder: '#C0C0C0',
  white:'#f8f9fe',
  dimBlack: '#383535',
};

const lightColors = {
  ...commonColors,

  background: '#f8f9fe',
  textColor: '#1c1c1e',
  nonActiveTextColor: '#4a4a4a',
  border: '#c0c0c0ff',
  cardBorderColor:"#e9e3e3",
  dimBlack: '#383535',

};

const darkColors = {
  ...commonColors,

  background: '#012537',
  textColor: '#f8f9fe',
  nonActiveTextColor: '#faf6f6',
  border: '#c0c0c070',
  cardBorderColor:'rgba(191, 190, 189, 0.3)',
  dimBlack: '#e9e3e3',
};

const fontSize = {
  xSmall: getFontSize(1.2),
  small: getFontSize(1.4),
  medium: getFontSize(1.6),
  large: getFontSize(1.8),
  extraLarge: getFontSize(2.4),
  xxLarge: getFontSize(3),
};

export const getTheme = ({language = 'en', isDarkMode = false}) => {
  return {
    color: isDarkMode ? darkColors : lightColors,
    font: fontMap[language] || fonts.en,
    fontSize,
    assets,
  };
};
