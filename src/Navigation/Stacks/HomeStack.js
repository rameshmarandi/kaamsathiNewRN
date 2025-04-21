import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '../Navigation';

import AllScreens from '../../Screens/index';
const Stack = createNativeStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.HOME} component={AllScreens.HomePage} />
    <Stack.Screen name={ROUTES.DETAILS} component={AllScreens.BookedHistory} />
  </Stack.Navigator>
);
