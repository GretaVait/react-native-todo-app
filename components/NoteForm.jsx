// Base
import React from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Navigation
import { useNavigation } from "@react-navigation/core"
// Redux
import { useDispatch } from "react-redux"
import { addNote, deleteNote, updateNote } from '../redux/actions/noteActions'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
// Colors
import colors from '../constants/colors'

const NoteForm = ({ note, setNote, handleOptionsButton, setActionModal, route }) => {
  const dispatch = useDispatch()
  const nav = useNavigation()

  // ADD NOTE //
  const handleAddNote = () => {
    const newNote = {
      title: note.title, 
      body: note.body || '', 
      pinned: note.pinned,
      category: note.category,
      date: note.date,
      files: note.files
    }
    if (route.params?.noteId) {
      dispatch(updateNote({ noteId: route.params.noteId, note: newNote }))
    } else if (note.title || note.body || note.files.length > 0) {
      dispatch(addNote(newNote))
    }
    // 
    nav.goBack()
  }

  // REMOVE NOTE //
  const handleRemoveNote = () => {
    if (route.params?.noteId) {
      dispatch(deleteNote( route.params.noteId ))
    }
    //
    nav.goBack()
  }

  return (
    <Container handlePress={() => { setActionModal(false) }}>
      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <ButtonSmall handleChange={handleAddNote} style={styles.actionsButton}>
            <Icon name="arrow-back-outline" type="ionicon" size={20} />
          </ButtonSmall>

          <ButtonSmall handleChange={handleRemoveNote}>
            <Icon name="trash-outline" type="ionicon" size={20} />
          </ButtonSmall>
        </View>

        <ButtonSmall handleChange={handleOptionsButton}>
          <Icon name="options-outline" type="ionicon" size={20} />
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
          returnKeyType="done"
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
          returnKeyType="done"
        />
        {
          note.files &&
          <View style={styles.files}>
            {
              note.files.map((file) => (
                <TouchableOpacity onLongPress={() => {
                  setNote((prevState) => ({
                    ...prevState,
                    files: note.files.filter(newFile => newFile.id != file.id )
                  }))
                }}
                key={file.id}>
                  <Image
                    source={{ uri: file?.localUri }}
                    style={{ 
                      ...styles.thumbnail,
                      width: ((Dimensions.get('screen').width / 2) - 24),
                      height: ((Dimensions.get('screen').width / 2) - 24)
                    }}
                  />
                </TouchableOpacity>
              ))
            }
          </View>
        }
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
    fontSize: 14,
    color: colors.purple,
    marginBottom: 24
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
})

export default NoteForm