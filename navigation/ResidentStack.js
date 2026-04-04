// navigation/ResidentStack.js
// Stack navigator for all resident-role screens.
// Screens registered here:
//   ResidentDashboard  — main portal (root of this stack)
//   FindWorkers        — ML match results after booking flow completes

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ResidentDashboard from '../screens/Resident/ResidentDashboard';
import FindWorkers       from '../screens/Resident/FindWorkers';

const Stack = createNativeStackNavigator();

export default function ResidentStack({ route }) {
  // Pass the authenticated user object down to the first screen
  const user = route.params?.user;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ResidentDashboard"
        component={ResidentDashboard}
        initialParams={{ user }}
      />
      <Stack.Screen
        name="FindWorkers"
        component={FindWorkers}
        // request object is passed when navigating from BookingModal submit
      />
    </Stack.Navigator>
  );
}