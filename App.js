import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, LogBox, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import i18n, {languageOptions} from './i18n';
import {STORAGE_KEYS} from './src/Config/StorageKeys';
import {generateFCMToken} from './src/Helpers/CommonHelpers';
import {ThemeProvider} from './src/Hooks/ThemeContext';
import {navigationRef} from './src/Navigation/NavigationService';
import {RootNavigator} from './src/Navigation/RootNavigator';
import {persistor, store} from './src/redux/store';
import {storage} from './src/utility/mmkvStorage';
import {requestMultiplePermissions} from './src/utility/PermissionContoller';
import notifee, {EventType} from '@notifee/react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NotificationUtils} from './src/Services/NotificationService';

LogBox.ignoreAllLogs(true);

// Wrap the part that needs Redux access in a separate component
const AppContent = () => {
  const isDarkMode = useSelector(state => state.user.isDarkMode);
  let language = 'en';
  // useSelector(state => state.settings.language);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '983551644958-utnh4i017esnvnhlp11suje6rc8qvuia.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    requestMultiplePermissions();
    NotificationInitilization();
    // console.log('is_reuest_Allowd', res);
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      //
      // 2. Initialize language settings
      const storedLang = storage.getString(STORAGE_KEYS.SELECTED_LANGUAGE);
      const isValidLang = languageOptions.some(
        lang => lang.code === storedLang,
      );

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
  const NotificationInitilization = async () => {
    // called when app is in background and user click on push notification.
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // redirectionHandler(remoteMessage.notification);
    });

    // called when app is in quit state and user click on push notification.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          redirectionHandler(remoteMessage);
        }
      });

    // called when app is in foreground and user click on notification which throw by notifee.
    const unsubscribeNotifeeOnForeground = notifee.onForegroundEvent(
      notification => {
        if (
          notification.type === EventType.PRESS ||
          notification.type === EventType.ACTION_PRESS
        ) {
          console.log('notification:--->', JSON.stringify(notification));
          if (notification.detail.notification) {
            const data = notification.detail.notification;
            redirectionHandler(data);
          }
        }
      },
    );

    // called when app is in foreground state and receive push notification.
    // so we trigger manual local notification.
    const unsubscribeFirebaseOnMessage = messaging().onMessage(
      async remoteMessage => {
        console.log('Message received in foreground:', remoteMessage);
        NotificationUtils.displayNotification(remoteMessage);
      },
    );

    // called when app is in background and user click on notification which throw by notifee.
    notifee.onBackgroundEvent(async ({type, detail}) => {
      try {
        const {notification} = detail;

        if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
          if (notification) {
            redirectionHandler(notification);
          }
          // Remove the notification
          await notifee.cancelNotification(notification?.id ?? '0');
        }
      } catch (err) {
        log('onBackgroundEvent :- ', JSON.stringify(err));
      }
    });

    return () => {
      unsubscribeFirebaseOnMessage();
      unsubscribeNotifeeOnForeground();

      Linking.removeAllListeners();
    };
  };

  if (!fontsReady) {
    return null; // Replace with your SplashScreen component if available
  }

  return (
    <ThemeProvider language={language || 'en'} isDarkMode={isDarkMode}>
      <PaperProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
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
