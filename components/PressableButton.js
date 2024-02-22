import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Color from './Color'

export default function PressableButton({ customStyle, onPress, disabled, children }) {
  return (
    <Pressable 
      style={({ pressed }) => {
        return [styles.defaultStyle, customStyle, pressed && styles.pressed, disabled && styles.disabled]
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 7,
    backgroundColor: Color.primary,
  },
  pressed: {
    opacity: 0.5
  },
  disabled: {
    backgroundColor: 'grey'
  }
})