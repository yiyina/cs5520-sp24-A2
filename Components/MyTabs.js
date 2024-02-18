import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import React from 'react';
import AllActivities from '../Screens/AllActivities';
import SpecialActivities from '../Screens/SpecialActivities';
import { color, spacing } from './StyleHelper';

// Create a bottom tab navigator.
const Tab = createBottomTabNavigator();

/**
 * Render the MyTabs component.
 * 
 * @param {object} props - MyTabs properties
 * @returns {JSX.Element} - MyTabs component
 */
export default MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerStyle: {
          backgroundColor: color.cardBackground,
          height: spacing.headerHeight,
        },
        headerTintColor: color.invalid,
        headerTitleAlign: 'center',
        tabBarStyle:{
          backgroundColor: color.cardBackground,
        },
        tabBarActiveTintColor: color.alert,
        tabBarInactiveTintColor: color.gray,
      }}>
      <Tab.Screen 
        name="All Activities" 
        component={AllActivities} 
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontWeight: 'bold' }}>$</Text> 
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>All Activities</Text>
          ),
        }} 
      />
      <Tab.Screen 
        name="Special Activities" 
        component={SpecialActivities} 
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontWeight: 'bold' }}>!</Text> 
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Special Activities</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
