// Base
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'

const Toggle = ({ active, handleToggle }) => { 

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={styles.toggle}
    >
      <View style={{ 
        ...styles.circle, 
        transform: active ? [{ translateX: 24 }] : [{ translateX: 0 }],
        backgroundColor: active ? colors.purple : 'white'
      }} />
    </TouchableOpacity>
  ) 
}

const styles = StyleSheet.create({
  toggle: {
    position: 'relative',
    width: 52,
    height: 28,
    borderRadius: 500,
    backgroundColor: colors.grey
  },
  circle: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 24,
    height: 24,
    borderRadius: 500
  }
})

export default Toggle