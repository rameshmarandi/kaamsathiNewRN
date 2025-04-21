import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from './TabNav';
import {HomeStack, SettingsStack} from './StackNav';
// import DrawerItems from '../Screens/Drawer/DrawerItems';
import {useSelector} from 'react-redux';
import AllScreens from '../Screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOptions, transitionCard} from './NavigationSettings';

const Stack = createNativeStackNavigator();
export default function MainStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          name="Home"
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
          component={TabNav}
        />
         {/* <Stack.Screen
                  initialRouteName={'BookedHistory'}
                  name={'BookedHistory'}
                  component={AllScreens.BookedHistory}
                  // options={screenOptions}
                /> */}
        <Stack.Screen name={'LoginPage'} component={AllScreens.LoginPage} />
        {/* <Stack.Screen name={'LoginPage'} component={AllScreens.LoginPage} />

        <Stack.Screen
          name={'Registration'}
          component={AllScreens.Registration}
        />


        <Stack.Screen name={'SearchOnMap'} component={AllScreens.SearchOnMap} />
        <Stack.Screen
          name={'EmployeeProfileDetails'}
          component={AllScreens.EmployeeProfileDetails}
        />

        <Stack.Screen
          name={'EmployeeFound'}
          component={AllScreens.EmployeeFound}
        />

        <Stack.Screen
          name={'ProfileDetails'}
          component={AllScreens.ProfileDetails}
          options={screenOptions}
        />
        <Stack.Screen
          name={'EditProfile'}
          component={AllScreens.EditProfile}
          options={screenOptions}
        />
        <Stack.Screen
          name={'HelpSupport'}
          component={AllScreens.HelpSupport}
          options={screenOptions}
        />
        <Stack.Screen
          name={'ChangePassword'}
          component={AllScreens.ChangePassword}
          options={screenOptions}
        />
        <Stack.Screen
          name={'PaymentHistory'}
          component={AllScreens.PaymentHistory}
          options={screenOptions}
        />
        <Stack.Screen
          name={'PrivacyPolicy'}
          component={AllScreens.PrivacyPolicy}
          options={screenOptions}
        />
        <Stack.Screen
          name={'Notification'}
          component={AllScreens.Notification}
          options={screenOptions}
        /> */}
      </Stack.Navigator>
    </>
  );
}




// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AllScreens from '../Screens/index';
// import { screenOptions, transitionCard } from './NavigationSettings';

// const Stack = createNativeStackNavigator();

// const screens = [
//   {
//     name: 'LoginPage',
//     component: AllScreens.LoginPage,
//     options: { headerShown: false }, // example customization
//   },
//   {
//     name: 'Registration',
//     component: AllScreens.Registration,
//   },
//   {
//     name: 'SearchOnMap',
//     component: AllScreens.SearchOnMap,
//   },
//   {
//     name: 'EmployeeProfileDetails',
//     component: AllScreens.EmployeeProfileDetails,
//   },
//   {
//     name: 'EmployeeFound',
//     component: AllScreens.EmployeeFound,
//   },
//   {
//     name: 'ProfileDetails',
//     component: AllScreens.ProfileDetails,
//   },
//   {
//     name: 'EditProfile',
//     component: AllScreens.EditProfile,
//   },
//   {
//     name: 'HelpSupport',
//     component: AllScreens.HelpSupport,
//   },
//   {
//     name: 'ChangePassword',
//     component: AllScreens.ChangePassword,
//   },
//   {
//     name: 'PaymentHistory',
//     component: AllScreens.PaymentHistory,
//   },
//   {
//     name: 'PrivacyPolicy',
//     component: AllScreens.PrivacyPolicy,
//   },
//   {
//     name: 'Notification',
//     component: AllScreens.Notification,
//   },
// ];

// export default function MainStack() {
//   return (
//     <Stack.Navigator screenOptions={{ ...transitionCard, ...screenOptions }}>
//       {screens.map(({ name, component, options }) => (
//         <Stack.Screen
//           key={name}
//           name={name}
//           component={component}
//           options={options || {}}
//         />
//       ))}
//     </Stack.Navigator>
//   );
// }
