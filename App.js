import {View, Text, LogBox} from 'react-native';
import React, {useRef} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
// import useAppTheme from './src/Hooks/useAppTheme';

import LanguageSelector from './src/Hooks/LanguageSelector';
import MainStack from './src/Navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import { RootNavigator } from './src/Navigation/RootNavigator';
LogBox.ignoreAllLogs(true);
const App = () => {
  // const theme = useAppTheme();
  // const langSelectorRef = useRef();
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
            <LanguageSelector
              ref={ref => (LangModalRef.current = ref)}
              hideIcon={true}
            />
          </GestureHandlerRootView>
        </PersistGate>
      </PaperProvider>
      {/* </ToastProvider> */}
      {/* </LanguageProvider> */}
    </Provider>
  );
};

export default App;
