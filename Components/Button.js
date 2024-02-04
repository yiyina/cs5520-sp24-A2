import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { spacing } from './StyleHelper';

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

