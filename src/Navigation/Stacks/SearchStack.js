import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '../RouteName';

import AllScreens from '../../Screens/index';
import { screenOptions, transitionCard } from '../NavigationSettings';
const Stack = createNativeStackNavigator();



export function SearchStack(props) {
    return (
      <>
        <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
          <Stack.Screen name={'SearchOnMap'} component={AllScreens.SearchOnMap} />
        </Stack.Navigator>
      </>
    );
  }
  