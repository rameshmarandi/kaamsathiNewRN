// hooks/useAppTheme.js
import {useSelector} from 'react-redux';
import { getTheme } from '../utility/theme/themeTwo';
// import { getTheme } from '../utility/theme';



const useAppTheme = () => {

  const language = "en"
//   useSelector(state => state.language.selected); // update if your key is different
  const isDarkMode = true
//    useSelector(state => state.theme.isDarkMode); // same here

  return getTheme({language, isDarkMode});
};

export default useAppTheme;
