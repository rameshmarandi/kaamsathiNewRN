import {View, Text, LogBox} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
// import useAppTheme from './src/Hooks/useAppTheme';

import LanguageSelector from './src/Hooks/LanguageSelector';
// import MainStack from './src/Navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import { RootNavigator } from './src/Navigation/RootNavigator';
import { storage } from './src/utility/mmkvStorage';
import { STORAGE_KEYS } from './src/Config/StorageKeys';
import i18n, { languageOptions } from './i18n';
LogBox.ignoreAllLogs(true);
const App = () => {
  // const theme = useAppTheme();
  // const langSelectorRef = useRef();

  useEffect(() => {
    // 1. Check if language exists in storage
    const storedLang = storage.getKey(STORAGE_KEYS.SELECTED_LANGUAGE);

    
    // 2. Validate stored language
    const isValidLang = languageOptions.some(lang => lang.code === storedLang);
    
    if (!storedLang || !isValidLang) {
      // 3. Set English as default if invalid/missing
      storage.set(STORAGE_KEYS.SELECTED_LANGUAGE, 'en');
      i18n.changeLanguage('en');
    } else {
      // 4. Sync i18n with stored language
      i18n.changeLanguage(storedLang);
    }
  }, []);

  const LangModalRef = useRef();
  return (
    <Provider store={store}>
      {/* <LanguageProvider> */}
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer
              // onReady={onNavigationReady}
              // ref={NavigationRef}
              onStateChange={state => {}}>
              {/* <MainStack /> */}
              <RootNavigator />
            </NavigationContainer>
            {/* <LanguageSelector
              ref={ref => (LangModalRef.current = ref)}
              hideIcon={true}
            /> */}
          </GestureHandlerRootView>
        </PersistGate>
      </PaperProvider>
      {/* </ToastProvider> */}
      {/* </LanguageProvider> */}
    </Provider>
  );
};

export default App;
