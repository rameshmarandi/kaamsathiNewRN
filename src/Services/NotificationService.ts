import notifee, {
  AndroidImportance,
  Notification,
  NotificationIOS,
} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  try {
    console.log('Disaply_inside', remoteMessage);

    // Ensure channel exists (Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const iosParam: NotificationIOS = {
      sound: 'sound_notification.wav',
      critical: true,
    };

    const notifyPayload: Notification = {
      title: remoteMessage?.notification?.title ?? '',
      body: remoteMessage?.notification?.body ?? '',
      subtitle: '',
      android: {
        channelId: 'default',
        sound: 'sound_notification.wav',
        pressAction: {id: 'default'},
      },
      ios: iosParam,
      data: remoteMessage?.data ?? {},
    };

    await notifee.displayNotification(notifyPayload);
  } catch (error: unknown) {
    console.error('Display_notification error:', error);
  }
};

export const NotificationUtils = {
  displayNotification,
};
