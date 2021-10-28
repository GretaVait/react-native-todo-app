// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Navigation
import { useNavigation } from '@react-navigation/core'

const NoteScreen = () => { 
  const nav = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { nav.goBack() }}>
        <Text>Back</Text>
      </TouchableOpacity>
      
      <Text>NoteScreen</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16
  }
})

export default NoteScreen