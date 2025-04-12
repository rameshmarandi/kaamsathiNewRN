import { lightColors, darkColors } from './color';
import { fonts } from './font';
import { getFontSize } from '../responsive';

export const getTheme = ({
  isDarkMode,
  language,
}: {
  isDarkMode: boolean;
  language: 'en' | 'hi';
}) => {
  const colors = isDarkMode ? darkColors : lightColors;
  const font = fonts[language] || fonts.en;

  return {
    colors,
    font,
    fontSize: {
      small: getFontSize(1.4),
      medium: getFontSize(1.6),
      large: getFontSize(1.8),
    },
  };
};
