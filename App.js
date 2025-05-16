import React, { useEffect, useRef, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import i18n, { languageOptions } from './i18n';
import { STORAGE_KEYS } from './src/Config/StorageKeys';
import { navigationRef } from './src/Navigation/NavigationService';
import { RootNavigator } from './src/Navigation/RootNavigator';
import { storage } from './src/utility/mmkvStorage';
import { preloadFonts } from './src/utility/theme';
import { ThemeProvider } from './src/Hooks/ThemeContext';

LogBox.ignoreAllLogs(true);

// Wrap the part that needs Redux access in a separate component
const AppContent = () => {
  const isDarkMode = useSelector(state => state.user.isDarkMode);
  let language = "en"
  // useSelector(state => state.settings.language);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Preload all fonts first
        // await preloadFonts();
        
        // 2. Initialize language settings
        const storedLang = storage.getString(STORAGE_KEYS.SELECTED_LANGUAGE);
        const isValidLang = languageOptions.some(lang => lang.code === storedLang);
        
        if (!storedLang || !isValidLang) {
          storage.set(STORAGE_KEYS.SELECTED_LANGUAGE, 'en');
          i18n.changeLanguage('en');
        } else {
          language = storedLang;
          i18n.changeLanguage(storedLang);
        }
        
        setFontsReady(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setFontsReady(true); // Still continue even if fonts fail to load
      }
    };

    initializeApp();
  }, []);

  if (!fontsReady) {
    return null; // Replace with your SplashScreen component if available
  }

  return (
    <ThemeProvider language={language || 'en'} isDarkMode={isDarkMode}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar 
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeProvider>
  );
};

// Main App component with proper Provider wrapping
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;