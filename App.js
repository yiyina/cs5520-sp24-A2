import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import React from 'react';
import { color, spacing } from './Components/StyleHelper';
import Start from './Screens/Start';
import MyTabs from './Components/MyTabs';
import AddAnActivity from './Screens/AddAnActivity';
import { ActivityProvider } from './Components/ActivityContext'

import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default App = () => {
  return (
    <ActivityProvider>
      <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              headerStyle: {
                backgroundColor: color.cardBackground,
              },
              headerTintColor: color.text,
            }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Activities" component={MyTabs} />
            <Stack.Screen 
              name="Add An Activity" 
              component={AddAnActivity} 
              options={{
                headerShown: true,
                headerTintColor: color.invalid,
                headerStyle : {
                  backgroundColor: color.cardBackground,
                  height: spacing.headerHeight,
                },
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </ActivityProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
