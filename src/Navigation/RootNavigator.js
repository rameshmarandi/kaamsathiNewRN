import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './Tabs/TabNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={TabNavigator} />
    {/* Add modal screens or auth screens here if needed */}
  </Stack.Navigator>
);