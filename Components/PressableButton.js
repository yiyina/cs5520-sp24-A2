import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({ customStyle, onPressFunction, pressedStyle, children, disabled }) {
    return (
        <Pressable 
            style={({pressed}) => [
                styles.defaultStyle, 
                customStyle, 
                pressed && pressedStyle
            ]} 
            onPress={onPressFunction}
            disabled={disabled}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        borderRadius: 3,
        width: 150,
        padding: 5,
    },
})