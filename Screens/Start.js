import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import color from '../Components/Color';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default function Start() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  // Added a useEffect to clear errors as user types
  useEffect(() => {
    if (email) setEmailError('');
    if (phone) setPhoneError('');
  }, [email, phone]);

  const handleEmailInput = (text) => {
    setEmail(text);
  }

  const handlePhoneInput = (text) => {
    setPhone(text);
  }

  const handleStart = () => {
    console.log('Start clicked');
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number (10 digits)');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (isValid) {
      console.log('Start clicked, can submit: ' + email + ', ' + phone);
    }
    
    console.log('Start end...');
  }

  const validateEmail = (text) => {
    console.log('Validating email...');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
  }

  const validatePhone = (text) => {
    console.log('Validating phone...');
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(text);
  }

  const handleReset = () => {
    console.log('Reset clicked');
    setEmail('');
    setPhone('');
    setEmailError('');
    setPhoneError('');
    setCanSubmit(false);
  }

  const isSubmitDisabled = (!email || !phone);
  const submitButtonColor = isSubmitDisabled ? color.invalid : color.text; // if email or phone is empty, disable the button

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Email Address</Text>
        <Input handleInput={handleEmailInput} text={email}/>
        <Text style={styles.errorMessage}>
          {emailError || ' '}
        </Text>

        <Text style={styles.text}>Phone Number</Text>
        <Input handleInput={handlePhoneInput} text={phone}/>
        <Text style={styles.errorMessage}>
          {phoneError || ' '}
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            text="Reset" 
            textColor={color.warning} 
            handleClick={handleReset}/>
          <Button 
            text="Start" 
            textColor={submitButtonColor} 
            disabled={isSubmitDisabled} 
            handleClick={handleStart}/>
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
    errorMessage: {
        color: color.message,
        marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
})