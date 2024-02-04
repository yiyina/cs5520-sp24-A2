import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { color, spacing } from './StyleHelper';

export default Input = ({ handleInput, text }) => {

  const textChange = (text) => {
    handleInput(text);
  }

  return (
    <View>
      <TextInput style={styles.box} value={text} onChangeText={textChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: color.background,
    borderColor: color.text,
    borderWidth: 2,
    height: spacing.xlarge,
    borderRadius: spacing.small,
    paddingLeft: spacing.small,
  }
})