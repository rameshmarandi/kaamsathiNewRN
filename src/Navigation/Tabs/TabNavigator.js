import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from '../Stacks/HomeStack';

import CustomTabBar from './CustomTabBar';
import { ROUTES } from '../Navigation';
import { ProfileStack, SearchStack } from '../StackNav';
import { screenOptions, transitionCard } from '../NavigationSettings';


const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      name={ROUTES.HOME_STACK}
      component={HomeStack}
      options={{ title: 'Home' }}
         screenOptions={{...transitionCard, ...screenOptions}}
    />
    <Tab.Screen
      name={ROUTES.SEARCH_STACK}
      component={SearchStack}
      options={{ title: 'Search' }}
      screenOptions={{...transitionCard, ...screenOptions}}
    />
    <Tab.Screen
      name={ROUTES.PROFILE_STACK}
      component={ProfileStack}
      options={{ title: 'Profile' }}
      screenOptions={{...transitionCard, ...screenOptions}}
    />
  </Tab.Navigator>
);