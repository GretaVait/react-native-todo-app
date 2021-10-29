// Base
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
// Colors
import colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { addNote, updateNote } from '../redux/actions/noteActions'
import { useSelector } from 'react-redux'
import Title from '../components/Title'
import Toggle from '../components/Toggle'

const NoteScreen = ({ route }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (route.params?.noteId) {
      const noteToEdit = notes.filter(note => note.id === route.params?.noteId)
      // Change states to smth more managable
      setTitle(noteToEdit[0]?.title)
      setBody(noteToEdit[0]?.body)
      setToggle(noteToEdit[0]?.pinned)
    }
  }, [route.params?.noteId])

  const handleAddNote = () => {
    const note = {
      title: title, 
      body: body, 
      pinned: toggle
    }
    if (route.params?.noteId) {
      dispatch(updateNote({ noteId: route.params?.noteId, note }))
    } else if (title || body) {
      dispatch(addNote(note))
    }
    // 
    nav.goBack()
  }

  return (
    <Container>
      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <ButtonSmall handleChange={handleAddNote} style={styles.actionsButton}>
            <Icon name="arrow-back-outline" type="ionicon" size={20} />
          </ButtonSmall>

          <ButtonSmall handleChange={() => { nav.goBack() }}>
            <Icon name="trash-outline" type="ionicon" size={20} />
          </ButtonSmall>
        </View>

        <ButtonSmall>
          <Icon name="attach-outline" type="ionicon" size={20} />
        </ButtonSmall>
        
      </View>
      
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Note's Title"
          multiline={true}
        />

        <TextInput 
          style={styles.body}
          onChangeText={setBody}
          value={body}
          placeholder="Write your note here..."
          multiline={true}
        />

        <Title>Pinned</Title>
        
        <Toggle 
          active={toggle}
          handleToggle={() => { setToggle(prevState => { return !prevState }) }}
        />
      </View>
    </Container>
  ) 
}

const styles = StyleSheet.create({
  input: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: colors.black
  },
  body: {
    fontSize: 16,
    color: colors.purple
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionsButton: {
    marginRight: 8
  }
})

export default NoteScreen