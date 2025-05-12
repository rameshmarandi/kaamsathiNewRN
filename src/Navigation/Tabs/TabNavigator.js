import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import {ROUTES} from '../RouteName';

import {HomeStack} from '../Stacks/HomeStack';
import {BookingStack} from '../Stacks/BookingStack';
import {SearchStack} from '../Stacks/SearchStack';
import {BookMarkStack} from '../Stacks/BookMarkStack';
import {ProfileStack} from '../Stacks/ProfileStack';

import {screenOptions, transitionCard} from '../NavigationSettings';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
   
    initialRouteName={ROUTES.HOME_STACK}
    screenOptions={{
      ...transitionCard,
      ...screenOptions,
      headerShown: false,
   
    }}>
    <Tab.Screen
      name={ROUTES.HOME_STACK}
      component={HomeStack}
      options={{title: 'Home'}}
    />
    <Tab.Screen
      name={ROUTES.BOOKING_STACK}
      component={BookingStack}
      options={{title: 'Booking'}}
    />
    <Tab.Screen
      name={ROUTES.SEARCH_STACK}
      component={SearchStack}
      options={{title: 'Search'}}
    />
    <Tab.Screen
      name={ROUTES.BOOKMARK_STACK}
      component={BookMarkStack}
      options={{title: 'BookMarks'}}
    />
    <Tab.Screen
      name={ROUTES.PROFILE_STACK}
      component={ProfileStack}
      options={{title: 'Profile'}}
    />
  </Tab.Navigator>
);
