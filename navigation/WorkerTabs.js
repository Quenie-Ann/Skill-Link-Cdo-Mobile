// navigation/WorkerTabs.js
// Bottom tab navigator for the Worker portal.
// Tabs: Job Offers | My Jobs | Profile

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WorkerDashboard from '../screens/worker/WorkerDashboard';
import WorkerHistory   from '../screens/worker/WorkerHistory';
import WorkerProfile   from '../screens/worker/WorkerProfile';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'JobOffers',  label: 'Job Offers', icon: 'flash',        iconOff: 'flash-outline',        component: WorkerDashboard },
  { name: 'MyJobs',     label: 'My Jobs',    icon: 'briefcase',    iconOff: 'briefcase-outline',    component: WorkerHistory   },
  { name: 'MyProfile',  label: 'Profile',    icon: 'person-circle', iconOff: 'person-circle-outline', component: WorkerProfile  },
];

const PRIMARY = '#10B981';
const DARK    = '#1A2E3B';

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tab         = TABS[index];
        const isFocused   = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            style={styles.tabItem}
          >
            {isFocused && <View style={styles.activePill} />}
            <Ionicons
              name={isFocused ? tab.icon : tab.iconOff}
              size={22}
              color={isFocused ? PRIMARY : '#9CA3AF'}
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function WorkerTabs({ route }) {
  const user = route.params?.user;
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          initialParams={{ user }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection:   'row',
    backgroundColor: '#fff',
    borderTopWidth:  1,
    borderTopColor:  '#F3F4F6',
    paddingBottom:   8,
    paddingTop:      8,
    shadowColor:     '#000',
    shadowOpacity:   0.06,
    shadowRadius:    12,
    elevation:       8,
  },
  tabItem: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position:       'relative',
  },
  activePill: {
    position:        'absolute',
    top:             0,
    width:           32,
    height:          3,
    borderRadius:    2,
    backgroundColor: PRIMARY,
  },
  tabLabel: {
    fontSize:   10,
    fontWeight: '600',
    color:      '#9CA3AF',
    marginTop:  3,
  },
  tabLabelActive: {
    color:      PRIMARY,
    fontWeight: '800',
  },
});
