import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import color from './Components/StyleHelper';
import Start from './Screens/Start';

export default function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    setLoginSuccess(true);
    console.log('Login? : ' + loginSuccess);
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Start handleLogin={handleLogin}/>
      </View>
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
