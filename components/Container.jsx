// Base
import React from 'react'
import { View, StyleSheet } from 'react-native'

const Container = ({ children, handlePress }) => { 

  return (
    <View style={styles.container} onStartShouldSetResponder={handlePress}>
      {children}
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  }
})

export default Container