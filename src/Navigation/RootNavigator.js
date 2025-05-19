import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {TabNavigator} from './Tabs/TabNavigator'
import AllScreens from '../Screens/index'
import {ROUTES} from './RouteName'
import {screenOptions, transitionCard} from './NavigationSettings'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      // Disable ALL transition animations
      animation: 'none', // Disables built-in animations
      animationEnabled: false, // Older prop for backwards compatibility
      transitionSpec: {
        open: {animation: 'timing', config: {duration: 1000}},
        close: {animation: 'timing', config: {duration: 1000}},
      },
      cardStyleInterpolator: () => ({}), // Empty interpolator
      cardOverlayEnabled: false,
    }}>
    <Stack.Screen name='Main' component={TabNavigator} />
    <Stack.Screen
      name={`${ROUTES.PROFILE_DETAILS}`}
      component={AllScreens.ProfileDetails}
    />
    <Stack.Screen
      name={`${ROUTES.PRIVACY_POLICY}`}
      component={AllScreens.PrivacyPolicy}
    />
    <Stack.Screen
      name={`${ROUTES.HELP_SUPPORT}`}
      component={AllScreens.HelpSupport}
    />
    <Stack.Screen
      name={`${ROUTES.NOTIFICATION_PAGE}`}
      component={AllScreens.Notification}
    />
    <Stack.Screen
      name={`${ROUTES.PAYMENT_HISTORY}`}
      component={AllScreens.PaymentHistory}
    />
    <Stack.Screen
      name={`${ROUTES.COIN_PURCHASE}`}
      component={AllScreens.CoinPurchase}
    />
    <Stack.Screen
      name={`${ROUTES.LOGIN_PAGES}`}
      component={AllScreens.LoginPage}
    />
    <Stack.Screen
      name={`${ROUTES.REGISTRATION_PAGES}`}
      component={AllScreens.Registration}
    />
    {/* Add modal screens or auth screens here if needed */}
  </Stack.Navigator>
)
