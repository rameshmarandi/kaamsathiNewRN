// hooks/useAppTheme.js
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getTheme} from '../utility/theme';
import {storage} from '../utility/mmkvStorage';
import {STORAGE_KEYS} from '../Config/StorageKeys';

const useAppTheme = () => {
  const language = useMemo(() => {
    return storage.getString(STORAGE_KEYS.SELECTED_LANGUAGE); // getString instead of getKey for direct value
  }, []); // Only read once

  const isDarkMode = useSelector(state => state.user.isDarkMode); // Triggers rerender on state change

  const theme = useMemo(() => {
    return getTheme({language, isDarkMode});
  }, [language, isDarkMode]);

  return theme;
};

export default useAppTheme;
