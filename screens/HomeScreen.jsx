// Base
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Colors
import colors from '../constants/colors'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
import Note from '../components/Note'
// Redux
import { useSelector } from 'react-redux'

const HomeScreen = () => { 
  const nav = useNavigation()
  const notes = useSelector(state => state.notes)

  useEffect(() => {
    console.log(notes, 'note')
  }, [notes])

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>

        <ButtonSmall>
          <View style={{ ...styles.menuLine, marginBottom: 4 }} />
          <View style={styles.menuLine} />
        </ButtonSmall>

      </View>

      <FlatList 
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item: { title, body } }) => (
          <Note 
            title={title}
            body={body}
            date="Today, 4:30PM"
          />
        )}
      />

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
    justifyContent: 'space-between',
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
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
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.black,
  }
})

export default HomeScreen