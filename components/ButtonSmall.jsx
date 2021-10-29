// Base
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
// Colors
import colors from '../constants/colors'

const ButtonSmall = ({ children, style, handleChange }) => { 

  return (
    <TouchableOpacity onPress={handleChange} style={{ ...styles.button, ...style }}>
      {children}
    </TouchableOpacity>
  ) 
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.grey,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16
  }
})

export default ButtonSmall