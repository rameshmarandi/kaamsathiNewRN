import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getTheme } from '../utility/theme';
import { storage } from '../utility/mmkvStorage';
import { STORAGE_KEYS } from '../Config/StorageKeys';

const useAppTheme = () => {
  // Optimized useSelector with shallowEqual to prevent unnecessary re-renders
  const { isDarkMode } = useSelector(state => ({
    isDarkMode: state.user.isDarkMode,
  }), shallowEqual);

  // Read language only once during mount (memoized)
  const language = useMemo(() => {
    return storage.getString(STORAGE_KEYS.SELECTED_LANGUAGE) || 'en';
  }, []);

  // Calculate theme based on language and dark mode
  const theme = useMemo(() => getTheme({ language, isDarkMode }), [language, isDarkMode]);

  return theme;
};

export default useAppTheme;
