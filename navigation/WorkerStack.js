// navigation/WorkerStack.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../styles/colors';

import WorkerDashboard from '../screens/Worker/WorkerDashboard';
import WorkerJobs      from '../screens/Worker/WorkerJobs';
import WorkerProfile   from '../screens/Worker/WorkerProfile';

const Tab = createBottomTabNavigator();

export default function WorkerStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.skillPrimary,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'JobOffers') iconName = focused ? 'flash'     : 'flash-outline';
          if (route.name === 'MyJobs')    iconName = focused ? 'briefcase' : 'briefcase-outline';
          if (route.name === 'MyProfile') iconName = focused ? 'person'    : 'person-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="JobOffers" component={WorkerDashboard} options={{ tabBarLabel: 'Job Offers' }} />
      <Tab.Screen name="MyJobs"    component={WorkerJobs}      options={{ tabBarLabel: 'My Jobs'    }} />
      <Tab.Screen name="MyProfile" component={WorkerProfile}   options={{ tabBarLabel: 'My Profile' }} />
    </Tab.Navigator>
  );
}