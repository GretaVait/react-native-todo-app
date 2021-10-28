// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Navigation
import { useNavigation } from '@react-navigation/core'

const WorkCategoryScreen = () => { 
  const nav = useNavigation()

  return (
    <View style={styles.container}>
      <Text>WorkCategoryScreen</Text>
      <TouchableOpacity onPress={() => { nav.navigate('NoteScreen') }}>
        <Text>Add Note</Text>
      </TouchableOpacity>
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

export default WorkCategoryScreen