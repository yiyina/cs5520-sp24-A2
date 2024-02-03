import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Button({ text, textColor, handleClick, disabled }) {
    const styles = StyleSheet.create({
      textStyle: {
        color: textColor,
        padding: 10,
        borderRadius: 5,
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

