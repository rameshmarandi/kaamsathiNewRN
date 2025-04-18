// hooks/useAppTheme.js
import {useSelector} from 'react-redux';
import {getTheme} from '../utility/theme';
import {storage} from '../utility/mmkvStorage';
import {STORAGE_KEYS} from '../Config/StorageKeys';

const useAppTheme = () => {
  const language = storage.getKey(STORAGE_KEYS.SELECTED_LANGUAGE);

  const {isDarkMode} = useSelector(state => state.user); // ✅ useSelector will re-render on state change

  return getTheme({language, isDarkMode});
};

export default useAppTheme;
