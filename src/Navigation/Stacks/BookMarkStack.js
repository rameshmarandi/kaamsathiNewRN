import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '../RouteName';

import AllScreens from '../../Screens/index';

const Stack = createNativeStackNavigator();

export const BookMarkStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.BOOKMARK_STACK} component={AllScreens.BookMarks} />

  </Stack.Navigator>
);

