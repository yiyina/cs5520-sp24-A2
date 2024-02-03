import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import color from '../Components/Color';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default function Start() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailInput = (text) => {
    console.log('Email changed = ' + text);
    setEmail(text);
  }

  const handlePhoneInput = (text) => {
    console.log('Phone changed = ' + text);
    setPhone(text);
  }

  const handleReset = () => {
    console.log('Reset clicked');
    setEmail('');
    setPhone('');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Address</Text>
        <Input handleInput={handleEmailInput} text={email}/>
        <Text style={styles.text}>Phone Number</Text>
        <Input handleInput={handlePhoneInput} text={phone}/>
        <View style={styles.buttonContainer}>
          <Button text="Reset" textColor={color.warning} handleClick={handleReset}/>
          <Button text="Start" textColor={color.text}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    text: {
        color: color.text,
        fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
})