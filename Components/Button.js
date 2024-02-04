import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { spacing } from './StyleHelper';

export default Button = ({ text, textColor, handleClick, disabled }) => {
    const styles = StyleSheet.create({
      textStyle: {
        color: textColor,
        padding: spacing.medium,
        borderRadius: spacing.small,
      },
    });
  
    return (
      <View>
          <TouchableOpacity onPress={handleClick} disabled={disabled}>
              <Text style={styles.textStyle}>{text}</Text>
          </TouchableOpacity>
      </View>
    )
}

