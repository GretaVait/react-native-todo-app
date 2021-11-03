// Base
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Redux
import { useDispatch } from 'react-redux'
import { addNote, deleteNote, updateNote } from '../redux/actions/noteActions'
import { useSelector } from 'react-redux'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
import Title from '../components/Title'
import Toggle from '../components/Toggle'
// Colors
import colors from '../constants/colors'

const NoteScreen = ({ route }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)

  const [note, setNote] = useState({
    title: '',
    body: '',
    pinned: false,
    category: 'personal'
  })

  useEffect(() => {
    if (route.params?.noteId) {
      const noteToEdit = notes.filter(note => note.id === route.params.noteId)

      setNote({
        title: noteToEdit[0]?.title,
        body: noteToEdit[0]?.body,
        pinned: noteToEdit[0]?.pinned,
        category: noteToEdit[0]?.category
      })
    }
  }, [route.params?.noteId])

  const handleAddNote = () => {
    const newNote = {
      title: note.title, 
      body: note.body || '', 
      pinned: note.pinned,
      category: note.category
    }
    if (route.params?.noteId) {
      dispatch(updateNote({ noteId: route.params.noteId, note: newNote }))
    } else if (note.title || note.body) {
      dispatch(addNote(newNote))
    }
    // 
    nav.goBack()
  }

  const handleRemoveNote = () => {
    if (route.params?.noteId) {
      dispatch(deleteNote( route.params.noteId ))
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

          <ButtonSmall handleChange={handleRemoveNote}>
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
          onChangeText={(e) => {
            setNote((prevState) => ({
              ...prevState,
              title: e
            }))
          }}
          value={note.title}
          placeholder="Note's Title"
          multiline={true}
        />

        <TextInput 
          style={styles.body}
          onChangeText={(e) => {
            setNote((prevState) => ({
              ...prevState,
              body: e
            }))
          }}
          value={note.body}
          placeholder="Write your note here..."
          multiline={true}
        />

        <Title>Pinned</Title>
        
        <Toggle 
          active={note.pinned}
          handleToggle={() => {
            setNote((prevState) => ({
              ...prevState,
              pinned: !prevState.pinned
            }))
          }}
        />

        <Title>Category</Title>
        <View style={styles.categoriesList}>
          <CategoryItem 
            title="Personal" 
            color="#9CC9E7" 
            active={note.category === 'personal'} 
            onSelect={() => {
              setNote((prevState) => ({
                ...prevState,
                category: 'personal'
              }))
            }} 
          />
          <CategoryItem 
            title="Work" 
            color="#F69595" 
            active={note.category === 'work'} 
            onSelect={() => {
              setNote((prevState) => ({
                ...prevState,
                category: 'work'
              }))
            }} 
          />
          <CategoryItem 
            title="Ideas" 
            color="#9BBCC6" 
            active={note.category === 'ideas'} 
            onSelect={() => {
              setNote((prevState) => ({
                ...prevState,
                category: 'ideas'
              }))
            }} 
          />
        </View>
      </View>
    </Container>
  ) 
}

const CategoryItem = ({ title, color, active, onSelect }) => (
  <TouchableOpacity style={{ ...styles.category, backgroundColor: color }} onPress={onSelect}>
    <View style={{ ...styles.categorySelected, opacity: active ? 1 : 0 }}>
      <Icon name="checkmark-outline" type="ionicon" size={10} color="white" />
    </View>
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
)

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
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  category: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  categoryText: {
    color: colors.purple,
    fontWeight: 'bold'
  },
  categorySelected: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.purple,
    borderRadius: 500,
    width: 16,
    height: 16
  }
})

export default NoteScreen