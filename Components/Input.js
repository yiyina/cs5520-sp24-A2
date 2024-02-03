import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import React from 'react';
import color from './Color';

export default function Input({ handleInput, text }) {

  const textChange = (text) => {
    handleInput(text);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.box} value={text} onChangeText={textChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  box: {
    backgroundColor: color.background,
    borderColor: color.text,
    borderWidth: 2,
    height: 30,
    borderRadius: 5,
    paddingLeft: 5,
  }
})