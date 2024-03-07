import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { color, spacing } from '../Components/StyleHelper';
import { useIsFocused } from '@react-navigation/native';
import Input from '../Components/Input';
import CommonText from '../Components/CommonText';
import PressableButton from '../Components/PressableButton';

/**
 * Render the Start screen component.
 * 
 * @param {object} navigation - navigation object
 * @returns {JSX.Element} - Start screen component
 */
export default Start = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const isFocused = useIsFocused();

  // Added a useEffect to clear fields when user navigates back to Start screen
  useEffect(() => {
    if (isFocused) {
      handleReset();
    }
  }, [isFocused]);

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

  /**
   * Validates email and phone number
   * If valid, navigates to Activities screen
   * If invalid, displays error message
   * 
   * @param {void}
   * @returns {void}
   */
  const handlePressStart = () => {
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
      handleLogin();
    }
  }

  /**
   * Validate email using regex pattern
   * 
   * @param {string} text 
   * @returns {boolean} - true if valid email, false otherwise
   */
  const validateEmail = (text) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
  }

  /**
   * Validate phone number using regex pattern
   * 
   * @param {string} text 
   * @returns {boolean} - true if valid phone number, false otherwise
   */
  const validatePhone = (text) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(text);
  }

  /**
   * Reset email, phone, emailError, phoneError, and canSubmit states
   * 
   * @param {void}
   * @returns {void}
   */
  const handleReset = () => {
    setEmail('');
    setPhone('');
    setEmailError('');
    setPhoneError('');
    setCanSubmit(false);
  }

  /**
   * Login success and navigate to Activities screen
   * 
   * @param {void}
   * @returns {void}
   */
  const handleLogin = () => {
    console.log('Login Success! Your Email: ' + email + ', Phone: ' + phone);
    navigation.navigate('Activities');
  }

  const isSubmitDisabled = !email && !phone ? true : false; // if email or phone is empty, disable the button

  /**
   * Render the Start screen component
   * 
   * @returns {JSX.Element} - Start screen component
   */
  return (
    <View style={styles.container}>
        <CommonText text={'Email Address'} />
        <Input handleInput={handleEmailInput} text={email}/>
        <Text style={styles.errorMessage}>
          {emailError || ' '}
        </Text>

        <CommonText text={'Phone Number'} />
        <Input handleInput={handlePhoneInput} text={phone}/>
        <Text style={styles.errorMessage}>
          {phoneError || ' '}
        </Text>

        <View style={styles.buttonContainer}>
          <PressableButton 
            customStyle={styles.resetButton} 
            onPressFunction={handleReset} 
            pressedStyle={styles.pressedButton}>
            <Text style={styles.buttonText}>Reset</Text>
          </PressableButton>
          <PressableButton 
            customStyle={[styles.startButton, isSubmitDisabled && { opacity: 0.5 }]} 
            onPressFunction={handlePressStart} 
            pressedStyle={styles.pressedButton} 
            disabled={isSubmitDisabled}>
            <Text style={styles.buttonText}>Start</Text>
          </PressableButton>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        width: '100%',
        justifyContent: 'center',
        paddingLeft: spacing.small,
        paddingRight: spacing.small,
    },
    errorMessage: {
        color: color.message,
        marginBottom: spacing.large,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    resetButton: {
      backgroundColor: color.warning,
    }, 
    startButton: {
      backgroundColor: color.cardBackground,
    },
    pressedButton: {
      opacity: 0.5,
    },
    buttonText: {
      color: color.commonText,
      textAlign: 'center',
    }
})