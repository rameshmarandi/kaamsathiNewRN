
import {Alert} from 'react-native'
import {navigate} from '../Navigation/NavigationService'
import { ROUTES } from '../Navigation/RouteName'

export const showLoginAlert = () => {
  Alert.alert(
    'Login Required',
    'You need to log in to access this section. Do you want to log in now?',
    [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => navigate(ROUTES.LOGIN_PAGES),
      },
    ],
  )
}
