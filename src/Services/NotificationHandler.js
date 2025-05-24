import React, {useEffect} from 'react';
import {AppState} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import NotificationService from './NotificationService';

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Handle notification press
    const unsubscribe = NotificationService.addNotificationListener(
      (screen, data) => {
        if (screen) {
          // Handle special cases for interactive notifications
          if (data?.action === 'accept') {
            // Handle accept action
            navigation.navigate(screen, {action: 'accepted', ...data});
          } else if (data?.action === 'reject') {
            // Handle reject action
            navigation.navigate(screen, {action: 'rejected', ...data});
          } else {
            // Regular notification press
            navigation.navigate(screen, data);
          }
        }
      },
    );

    // Handle app state changes to check for notifications
    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active') {
          checkInitialNotification();
        }
      },
    );

    // Check for initial notification (when app is launched from quit state)
    const checkInitialNotification = async () => {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        NotificationService.handleNotificationPress(
          initialNotification.notification,
        );
      }
    };

    checkInitialNotification();

    return () => {
      unsubscribe();
      appStateSubscription.remove();
    };
  }, [navigation]);

  return null;
};

export default NotificationHandler;
