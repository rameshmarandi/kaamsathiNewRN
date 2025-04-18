import React from 'react';
import AllScreens from '../Screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {transitionCard, screenOptions} from './NavigationSettings';

const Stack = createNativeStackNavigator();

export function HomeStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen name={'HomePage'} component={AllScreens.HomePage} />
      </Stack.Navigator>
    </>
  );
}
export function SearchStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen name={'SearchOnMap'} component={AllScreens.SearchOnMap} />
      </Stack.Navigator>
    </>
  );
}

export function HistoryStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          initialRouteName={'BookedHistory'}
          name={'BookedHistory'}
          component={AllScreens.BookedHistory}
          // options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}
export function BookMarksStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          initialRouteName={'BookMarks'}
          name={'BookMarks'}
          component={AllScreens.BookMarks}
        />
      </Stack.Navigator>
    </>
  );
}

export function ProfileStack({navigation, route}) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen name={'Profile'} component={AllScreens.Profile} />
      </Stack.Navigator>
    </>
  );
}
