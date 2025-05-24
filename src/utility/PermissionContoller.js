// import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {store} from '../redux/store';
import {setUserLocation} from '../redux/reducer/Auth';

import {useDispatch} from 'react-redux';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {generateFCMToken} from '../Helpers/CommonHelpers';
import {storage} from './mmkvStorage';
import {STORAGE_KEYS} from '../Config/StorageKeys';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
};

const requestAndroidPermission = async permission => {
  try {
    const result = await PermissionsAndroid.request(permission);
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting Android permission:', error);
    return false;
  }
};

const requestIOSPermission = async permission => {
  try {
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting iOS permission:', error);
    return false;
  }
};

const checkPermission = async permission => {
  try {
    const result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

const requestMultiplePermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      return await handleAndroidPermissions();
    } else if (Platform.OS === 'ios') {
      return await handleIosPermissions();
    }

    // await storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
    return false;
  } catch (error) {
    console.error('Permission request failed:', error);
    // await storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
    return false;
  }
};

const handleAndroidPermissions = async () => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ];

  const result = await PermissionsAndroid.requestMultiple(permissions);

  const allGranted = permissions.every(
    permission => result[permission] === PermissionsAndroid.RESULTS.GRANTED,
  );

  console.log('Android permissions granted:', allGranted);

  if (allGranted) {
    await handleGrantedPermissions();
    storage.set(STORAGE_KEYS.LOCATION_PERMISSION, true);
  }

  return allGranted;
};

const handleIosPermissions = async () => {
  try {
    // Request notification permissions
    const notificationSettings = await notifee.requestPermission({
      sound: true,
      announcement: true,
    });

    // Request location permission
    const locationStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    const allGranted =
      notificationSettings.authorizationStatus >= 1 && // 1=authorized, 2=provisional
      locationStatus === RESULTS.GRANTED;

    if (allGranted) {
      storage.set(STORAGE_KEYS.LOCATION_PERMISSION, true);
    }
    // await storeAsyncData(StorageKeys.LOCATION_PERMISSION, allGranted);
    return allGranted;
  } catch (error) {
    console.error('iOS permission error:', error);
    return false;
  }
};

const handleGrantedPermissions = async () => {
  // Generate FCM token regardless of location
  generateFCMToken();

  // Request notification permissions
  const notificationSettings = await notifee.requestPermission({
    sound: true,
    announcement: true,
  });

  // Initialize with loading state
  store.dispatch(
    setUserLocation({latitude: '', longitude: '', address: 'Fetching...'}),
  );

  return;

  try {
    const position = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });
    });

    const {latitude, longitude} = position.coords;
    console.log('Current location:', {latitude, longitude});

    try {
      const json = await Geocoder.from({latitude, longitude});
      const formattedAddress = json.results[0]?.formatted_address || '';
      store.dispatch(
        setUserLocation({latitude, longitude, address: formattedAddress}),
      );
    } catch (geocodeError) {
      console.warn('Geocoding failed:', geocodeError);
      store.dispatch(setUserLocation({latitude, longitude, address: ''}));
    }
  } catch (locationError) {
    console.error('Location error:', locationError);
    store.dispatch(
      setUserLocation({
        latitude: 'error',
        longitude: 'error',
        address: '',
      }),
    );
    Alert.alert('Error', 'Unable to retrieve your location.');
  }
};

// const requestMultiplePermissions = async () => {
//   // const dispatch = useDispatch();
//   if (Platform.OS === 'android') {
//     const permissions = [
//       'android.permission.POST_NOTIFICATIONS',
//       'android.permission.ACCESS_FINE_LOCATION',
//       'android.permission.ACCESS_COARSE_LOCATION',
//     ];

//     try {
//       // Request permissions once
//       const result = await PermissionsAndroid.requestMultiple(permissions);

//       // Check if all permissions were granted
//       const allGranted = permissions.every(
//         permission => result[permission] === PermissionsAndroid.RESULTS.GRANTED,
//       );

//       console.log('Permission_android', allGranted);

//       if (allGranted) {
//         generateFCMToken();
//         // storeAsyncData(StorageKeys.LOCATION_PERMISSION, true);
//         store.dispatch(
//           setUserLocation({latitude: '', longitude: '', address: 'Fetching..'}),
//         );

//         Geolocation.getCurrentPosition(
//           position => {
//             const {latitude, longitude} = position.coords;
//             console.log('my_Latitude:', {latitude, longitude});

//             store.dispatch(setUserLocation({latitude, longitude, address: ''}));

//             Geocoder.from({latitude, longitude})
//               .then(json => {
//                 const formattedAddress = json.results[0].formatted_address;
//                 console.log('my_current_address', formattedAddress);
//                 store.dispatch(
//                   setUserLocation({
//                     latitude,
//                     longitude,
//                     address: formattedAddress,
//                   }),
//                 );
//               })
//               .catch(error => {
//                 store.dispatch(
//                   setUserLocation({
//                     latitude: 'error',
//                     longitude: 'error',
//                     address: '',
//                   }),
//                 );
//               });
//           },
//           error => {
//             store.dispatch(
//               setUserLocation({
//                 latitude: 'error',
//                 longitude: 'error',
//                 address: '',
//               }),
//             );
//             console.error(error);
//             Alert.alert('Error', 'Unable to retrieve your location.');
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 15000,
//             maximumAge: 10000,
//           },
//         );
//       }
//       return allGranted;
//     } catch (err) {
//       console.error('Failed to request permissions:', err);
//       storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
//       return false;
//     }
//   } else if (Platform.OS === 'ios') {
//     // Request permission with sound enabled
//     const settings = await notifee.requestPermission({
//       sound: true,
//       announcement: true,
//     });
//     // Request iOS permissions one by one
//     const notificationPermission = await requestIOSPermission(
//       PERMISSIONS.IOS.NOTIFICATIONS,
//     );
//     const locationPermission = await requestIOSPermission(
//       PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//     );

//     // Check if both iOS permissions were granted
//     const allGranted =
//       notificationPermission === 'granted' && locationPermission === 'granted';
//     storeAsyncData(StorageKeys.LOCATION_PERMISSION, allGranted);
//     return allGranted;
//   }
//   generateFCMToken();
//   storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
//   return false;
// };

// const requestMultiplePermissions = async () => {

//   // const isLocationPermission = await getAsyncData(
//   //   StorageKeys.LOCATION_PERMISSION,
//   // );

//   // console.log('isPermission_enalbed', isLocationPermission);

//   // if (isLocationPermission == true) {
//   //   return;
//   // } else {
//     if (Platform.OS === 'android') {
//       const permissions = [
//         'android.permission.POST_NOTIFICATIONS',
//         'android.permission.ACCESS_FINE_LOCATION',
//         'android.permission.ACCESS_COARSE_LOCATION',
//       ];
//       const result = await PermissionsAndroid.requestMultiple(permissions);

//       // Check if all permissions were granted
//       const allGranted = permissions.every(
//         permission => result[permission] === PermissionsAndroid.RESULTS.GRANTED,
//       );

//       console.log('Permission_android', allGranted);
//       if (allGranted) {
//         storeAsyncData(StorageKeys.LOCATION_PERMISSION, true);
//         store.dispatch(
//           setUserLocation({latitude: '', longitude: '', address: 'Fetching..'}),
//         );
//         // Geolocation.getCurrentPosition(
//         //   position => {
//         //     console.log('GEO_current_lOCATION', position);
//         //   },
//         //   error => {
//         //     // See error code charts below.
//         //     console.log(error.code, error.message);
//         //   },
//         //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//         // );

//         Geolocation.getCurrentPosition(
//           position => {
//             const {latitude, longitude} = position.coords;
//             // setLocation({latitude, longitude});
//             console.log('my_Latitude:', {latitude, longitude});

//             // First, dispatch the coordinates without the address
//             store.dispatch(setUserLocation({latitude, longitude, address: ''}));

//             // Fetch address from coordinates
//             Geocoder.from({latitude, longitude})
//               .then(json => {
//                 const formattedAddress = json.results[0].formatted_address;
//                 // setAddress(formattedAddress);
//                 console.log('my_current_address', formattedAddress);

//                 // Dispatch both coordinates and the address
//                 store.dispatch(
//                   setUserLocation({
//                     latitude,
//                     longitude,
//                     address: formattedAddress,
//                   }),
//                 );
//               })
//               .catch(error => {
//                 // console.warn(error)

//                 // First, dispatch the coordinates without the address
//                 store.dispatch(
//                   setUserLocation({
//                     latitude: 'error',
//                     longitude: 'error',
//                     address: '',
//                   }),
//                 );
//               });
//           },
//           error => {
//             // First, dispatch the coordinates without the address
//             store.dispatch(
//               setUserLocation({
//                 latitude: 'error',
//                 longitude: 'error',
//                 address: '',
//               }),
//             );

//             console.error(error);
//             Alert.alert('Error', 'Unable to retrieve your location.');
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 15000,
//             maximumAge: 10000,
//           },
//         );
//       // }
//       return;

//       if (Platform.Version >= 33) {
//         try {
//           // Request multiple permissions
//           const result = await PermissionsAndroid.requestMultiple(permissions);

//           // Check if all permissions were granted
//           const allGranted = permissions.every(
//             permission =>
//               result[permission] === PermissionsAndroid.RESULTS.GRANTED,
//           );

//           return allGranted;
//         } catch (err) {
//           console.error('Failed to request permissions:', err);
//           return false;
//         }
//       }
//       return true; // Permissions not required explicitly for Android < 13
//     } else if (Platform.OS === 'ios') {
//       // Request iOS permissions one by one
//       const notificationPermission = await requestIOSPermission(
//         PERMISSIONS.IOS.NOTIFICATIONS,
//       );
//       const locationPermission = await requestIOSPermission(
//         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//       );

//       // Check if both iOS permissions were granted
//       return (
//         notificationPermission === 'granted' && locationPermission === 'granted'
//       );
//     }
//     storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
//     return false;
//   }
// };

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    return await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  } else if (Platform.OS === 'ios') {
    return await requestIOSPermission(PERMISSIONS.IOS.CAMERA);
  }
  return false;
};

export const requestGalleryPermission = async () => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else {
    permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  }

  try {
    // Check the current permission status
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available on this device.');
        return false;

      case RESULTS.DENIED:
        console.log('Permission denied, requesting...');
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log('Permission granted');
          return true;
        } else {
          console.log('Permission denied');
          return false;
        }

      case RESULTS.GRANTED:
        console.log('Permission is already granted');
        return true;

      case RESULTS.BLOCKED:
        console.log(
          'Permission is blocked. You need to enable it in settings.',
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking or requesting permission:', error);
    return false;
  }
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to save files. Please enable it in the app settings.',
        );
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Permanently Denied',
          'You have permanently denied storage permission. Enable it in the app settings.',
        );
        return false;
      }
    } catch (err) {
      console.warn('Permission Request Error', err);
    }
  } else {
    return true; // No permissions needed for iOS
  }
};

export {
  requestUserPermission,
  requestStoragePermission,
  checkPermission,
  // requestNotificationPermission,
  // requestLocationPermission,
  requestMultiplePermissions,
  requestCameraPermission,
};
