// Base
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../constants/colors'

const Title = ({ children, style }) => { 

  return (
    <Text style={{ ...styles.title, ...style }}>
      {children}
    </Text>
  ) 
}

const styles = StyleSheet.create({
  title: {
    color: colors.darkGrey,
    fontSize: 12
  }
})

export default Title