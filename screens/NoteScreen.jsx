// Base
import React, { useState } from 'react'
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
import { addNote } from '../redux/actions/noteActions'
import { useSelector } from 'react-redux'

const NoteScreen = () => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const note = useSelector(state => state.note)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleAddNote = () => {
    if (title || body) {
      dispatch(addNote({ title: title, body: body }))
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
        />

        <TextInput 
          style={styles.body}
          onChangeText={setBody}
          value={body}
          placeholder="Write your note here..."
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