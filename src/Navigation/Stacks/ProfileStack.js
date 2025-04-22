
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '../RouteName';

import AllScreens from '../../Screens/index';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.PROFILE_STACK} component={AllScreens.Profile} />

  </Stack.Navigator>
);

