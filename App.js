// App.js
// Root navigator.
// After login, routes to a role-specific stack:
//   worker   → WorkerStack  (Phase 3 — not yet built)
//   resident → ResidentStack

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen   from './screens/LoginScreen';
import ResidentStack from './navigation/ResidentStack';
// import WorkerStack from './navigation/WorkerStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login"    component={LoginScreen}   />
          {/* Route to role-specific stacks after authentication */}
          <Stack.Screen name="ResidentHome" component={ResidentStack} />
          {/* <Stack.Screen name="WorkerHome" component={WorkerStack} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}