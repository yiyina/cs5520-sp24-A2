import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { color, spacing } from './StyleHelper';

/**
 * Render the Input component with text, handleInput and onFocus properties.
 * 
 * @param {object} props - input properties
 * @param {string} props.text - input text
 * @param {function} props.handleInput - input text change event handler
 * @param {function} props.onFocus - input focus event handler
 * @returns {JSX.Element} - Input component
 */
export default Input = ({ text, handleInput, onFocus }) => {

  /**
   * Handle text change event and call handleInput function.
   * 
   * @param {string} text - input text
   */
  const textChange = (text) => {
    handleInput(text);
  }

  return (
    <View>
      <TextInput 
        style={styles.box} 
        value={text} 
        onChangeText={textChange}
        onFocus={onFocus} />
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