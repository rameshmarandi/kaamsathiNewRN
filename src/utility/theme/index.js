// import {getFontSize, getResHeight} from '../responsive';
// import assets from './assets';

// import {fonts} from './font';

// // You can add bengaliFont, orFont, pnjFont... as needed
// const fontMap = {
//   en: fonts.en,
//   hi: fonts.hi,
//   mara: fonts.mar,
//   bn: fonts.bn,
//   or: fonts.or,
//   pnj: fonts.pnj,
// };

// const commonColors = {
//   successPrimary: '#27ae60',
//   successRGBA: '#00AB66',
//   errorPrimary: '#e74c3c',
//   warningPrimary: '#f39c12',

//   redBRGA: 'rgba(255, 0, 0, 1)',
//   greenBRGA: 'rgba(17, 255, 0, 0.985)',
//   // secondary2: '#FF9800',
//   primary: '#e6b42a',
//   ratingColor:'#FFA500',
//   primaryRGBA: 'rgba(230, 180, 42, 0.8)',
//   outlineColor: '#999999',
//   placeholder: '#C0C0C0',
//   white:'#f8f9fe',
//   dimBlack: '#383535',
// };

// const lightColors = {
//   ...commonColors,

//   background: '#f8f9fe',
//   textColor: '#1c1c1e',
//   nonActiveTextColor: '#4a4a4a',
//   border: '#c0c0c0ff',
//   cardBorderColor:"#e9e3e3",
//   dimBlack: '#383535',

// };

// const darkColors = {
//   ...commonColors,

//   background: '#012537',
//   textColor: '#f8f9fe',
//   nonActiveTextColor: '#faf6f6',
//   border: '#c0c0c070',
//   cardBorderColor:'rgba(191, 190, 189, 0.3)',
//   dimBlack: '#e9e3e3',
// };

// const fontSize = {
//   xSmall: getFontSize(1.2),
//   small: getFontSize(1.4),
//   medium: getFontSize(1.6),
//   large: getFontSize(1.8),
//   extraLarge: getFontSize(2.4),
//   xxLarge: getFontSize(3),
// };

// export const getTheme = ({language = 'en', isDarkMode = true}) => {
//   return {
//     color: isDarkMode ? darkColors : lightColors,
//     font: fontMap[language] || fonts.en,
//     fontSize,
//     assets,
//   };
// };

import {getFontSize} from '../responsive';
import assets from './assets';
import {fonts} from './font';

// Font preloading registry
const loadedFonts = new Set();

// Font mapping with fallbacks
const fontMap = Object.freeze({
  en: Object.freeze(fonts.en),
  hi: Object.freeze(fonts.hi),
  mara: Object.freeze(fonts.mar),
  bn: Object.freeze(fonts.bn),
  or: Object.freeze(fonts.or),
  pnj: Object.freeze(fonts.pnj),
});

// Immutable color definitions
const commonColors = Object.freeze({
  successPrimary: '#27ae60',
  successRGBA: '#00AB66',
  errorPrimary: '#e74c3c',
  warningPrimary: '#f39c12',
  redBRGA: 'rgba(255, 0, 0, 1)',
  greenBRGA: 'rgba(17, 255, 0, 0.985)',
  primary: '#e6b42a',
  ratingColor: '#FFA500',
  primaryRGBA: 'rgba(230, 180, 42, 0.8)',
  outlineColor: '#999999',
  placeholder: '#C0C0C0',
  white: '#f8f9fe',
  dimBlack: '#383535',
});

const lightColors = Object.freeze({
  ...commonColors,
  background: '#f8f9fe',
  textColor: '#1c1c1e',
  nonActiveTextColor: '#4a4a4a',
  border: '#c0c0c0ff',
  cardBorderColor: '#e9e3e3',
  dimBlack: '#383535',
});

export const darkColors = Object.freeze({
  ...commonColors,
  background: '#012537',
  textColor: '#f8f9fe',
  nonActiveTextColor: '#faf6f6',
  border: '#c0c0c070',
  cardBorderColor: 'rgba(191, 190, 189, 0.3)',

  dimBlack: '#e9e3e3',
});

// Memoized font sizes
const fontSize = Object.freeze({
  xSmall: getFontSize(1.2),
  small: getFontSize(1.4),
  medium: getFontSize(1.6),
  large: getFontSize(1.8),
  xLarge: getFontSize(2.4),
  xxLarge: getFontSize(2.7),
  xxxLarge: getFontSize(3),
});

// Theme cache
const themeCache = new Map();

export const getTheme = ({language = 'en', isDarkMode = true}) => {
  const cacheKey = `${language}_${isDarkMode ? 'dark' : 'light'}`;

  // Return cached theme if available
  if (themeCache.has(cacheKey)) {
    return themeCache.get(cacheKey);
  }

  // Preload font if not already loaded
  const fontFamily = fontMap[language] || fonts.en;
  if (!loadedFonts.has(language)) {
    loadedFonts.add(language);
  }

  const theme = Object.freeze({
    color: Object.freeze(isDarkMode ? darkColors : lightColors),
    font: Object.freeze(fontFamily),
    fontSize,
    assets: Object.freeze(assets),
    meta: {
      language,
      mode: isDarkMode ? 'dark' : 'light',
      generatedAt: Date.now(),
    },
  });

  // Cache the theme
  themeCache.set(cacheKey, theme);

  // Limit cache size
  if (themeCache.size > 20) {
    const firstKey = themeCache.keys().next().value;
    themeCache.delete(firstKey);
  }

  return theme;
};
