import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '../RouteName';

import AllScreens from '../../Screens/index';

const Stack = createNativeStackNavigator();

export const BookingStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.BOOKING_STACK} component={AllScreens.MyBooking} />

  </Stack.Navigator>
);

