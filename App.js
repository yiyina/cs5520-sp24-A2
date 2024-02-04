import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import React from 'react';
import { color } from './Components/StyleHelper';
import Start from './Screens/Start';
import MyTabs from './Components/MyTabs';

const Stack = createStackNavigator();

export default App = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
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
