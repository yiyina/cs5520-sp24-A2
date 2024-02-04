import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import React from 'react';
import AllActivities from '../Screens/AllActivities';
import SpecialActivities from '../Screens/SpecialActivities';
import { color } from './StyleHelper';

const Tab = createBottomTabNavigator();

export default MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerStyle: {
          backgroundColor: color.cardBackground,
        },
        headerTintColor: color.invalid,
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
            <Text style={{ color }}>All Activities</Text> // 自定义标签文本
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
            <Text style={{ color }}>Special Activities</Text> // 自定义标签文本
          ),
        }}
      />
    </Tab.Navigator>
  );
}