import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../utility/theme';
import { storage } from '../utility/mmkvStorage';
import { STORAGE_KEYS } from '../Config/StorageKeys';

const useAppTheme = () => {
  // Directly select only the needed value from state
  const isDarkMode = useSelector(state => state.user.isDarkMode);
  

  // Memoize language reading
  const language = useMemo(() => {
    return storage.getString(STORAGE_KEYS.SELECTED_LANGUAGE) || 'en';
  }, []);

  // Memoize theme calculation
  const theme = useMemo(() => {
    return getTheme({ language, isDarkMode });
  }, [language, isDarkMode]);

  return theme;
};



export default useAppTheme;