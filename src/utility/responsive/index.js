import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


  // height: responsiveHeight(50), // 50% of window height
  // width: responsiveWidth(50), // 50% of window width


  // fontSize: responsiveFontSize(2) // 2% of total window size



// Custom method for responsive height
export const getResHeight = (percentage) => {
  return responsiveHeight(percentage);
};

// Custom method for responsive width
export const getResWidth = (percentage) => {
  return responsiveWidth(percentage);
};

// Custom method for responsive font size
export const getFontSize = (percentage) => {
  return responsiveFontSize(percentage);
};

