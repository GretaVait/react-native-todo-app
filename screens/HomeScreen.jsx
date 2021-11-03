// Base
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SectionList, ScrollView } from 'react-native'
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
import Catgories from '../components/Categories'
// Redux
import { useSelector } from 'react-redux'
import { completeNote, updateNote } from '../redux/actions/noteActions'
import { useDispatch } from 'react-redux'
import Title from '../components/Title'

const HomeScreen = ({ navigation }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const [notesList, setNoteList] = useState([])

  useEffect(() => {
    console.log(notes, 'note')

    setNoteList([
      {
        title: 'Pinned',
        data: notes.filter(note => note.pinned === true)
      },
      {
        title: 'Upcoming',
        data: notes.filter(note => note.pinned === false)
      }
    ])
  }, [notes])

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ width: 32 }}>
        <Catgories />
      </View>

      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>Reminders</Text>

          <ButtonSmall>
            <View style={{ ...styles.menuLine, marginBottom: 4 }} />
            <View style={styles.menuLine} />
          </ButtonSmall>

        </View>

        <SectionList
          sections={notesList}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Note 
              title={item.title}
              body={item.body}
              date="Today, 4:30PM"
              completed={item.completed}
              id={item.id}
              handleCompleteNote={() => { dispatch(completeNote(item.id)) }}
              navigation={navigation}
              // handleEditNote={handleEditNote}
            />
          )}
          renderSectionHeader={({ section: { title }, section }) => (
            section.data.length > 0 &&
              <Title style={styles.subtitle}>{title}</Title>
          )} 
        />

        <TouchableOpacity style={ styles.addNoteButton } onPress={() => { nav.navigate('NoteScreen') }}>
          <Icon name="add-outline" type="ionicon" size={48} color="white" />
        </TouchableOpacity>
      </Container>
    </View>
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
  },
  subtitle: {
    marginBottom: 8
  }
})

export default HomeScreen