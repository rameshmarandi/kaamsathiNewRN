import React from 'react';
import {Alert} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useSelector} from 'react-redux';

export const openInAppBrowser = async url => {
  //   const {url} = props;
  //   const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
  //     state => state.user,
  //   );
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: `#012537`,
        preferredControlTintColor: 'white',
        readerMode: true,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: `#012537`,
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: false,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      //   Alert.alert(JSON.stringify(result));
    } else {
      Alert.alert('InAppBrowser is not available');
    }
  } catch (error) {
    // Alert.alert(error.message);
  }
};

// Optionally, if you want a component as well
const InAppBrowserComp = () => {
  return null;
};

export default InAppBrowserComp;
