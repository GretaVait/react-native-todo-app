// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Lib
import { Icon } from 'react-native-elements'
// Colors
import colors from '../constants/colors'
// Comp
import Container from '../components/Container'

const HomeScreen = () => { 
  const nav = useNavigation()

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <TouchableOpacity style={styles.menu}>
          <View style={{ ...styles.menuLine, marginBottom: 4 }} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={ styles.addNoteButton } onPress={() => { nav.navigate('NoteScreen') }}>
        <Icon name="add-outline" type="ionicon" size={48} color="white" />
      </TouchableOpacity>
    </Container>
  ) 
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addNoteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.purple,
    borderRadius: 500,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menu: {
    backgroundColor: colors.lightGrey,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.black,
  }
})

export default HomeScreen