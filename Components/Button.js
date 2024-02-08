import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { spacing } from './StyleHelper';

/**
 * Render the Button component with text and color properties 
 * and a click handler function to handle button click events 
 * and a disabled property to disable the button if needed.
 * 
 * @param {object} props - button properties
 * @returns {JSX.Element} - Button component
 */
export default Button = ({ text, textColor, handleClick, disabled, style }) => {
  const defaultStyles = StyleSheet.create({
    textStyle: {
      color: textColor,
      padding: spacing.medium,
      borderRadius: spacing.small,
    },
  });
  
  return (
    <View>
        <TouchableOpacity onPress={handleClick} disabled={disabled}>
            <Text style={[defaultStyles.textStyle, style]}>{text}</Text>
        </TouchableOpacity>
    </View>
  )
}

