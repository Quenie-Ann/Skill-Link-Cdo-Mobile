// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen  from './screens/LoginScreen';
import ResidentTabs from './navigation/ResidentTabs';
import WorkerTabs   from './navigation/WorkerTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login"        component={LoginScreen}  />
          <Stack.Screen name="ResidentHome" component={ResidentTabs} />
          <Stack.Screen name="WorkerHome"   component={WorkerTabs}   />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
