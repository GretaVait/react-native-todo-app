// Base
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
import BottomSheet from 'reanimated-bottom-sheet'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Redux
import { useDispatch } from 'react-redux'
import { addNote, deleteNote, updateNote } from '../redux/actions/noteActions'
import { useSelector } from 'react-redux'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
import NoteScreenBottomSheet from '../components/NoteScreenBottomSheet'
// Colors
import colors from '../constants/colors'
import Overlay from '../components/Overlay'
import OverlayItem from '../components/OverlayItem'

const NoteScreen = ({ route }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)

  const sheetRef = React.useRef(null)

  const [note, setNote] = useState({
    title: '',
    body: '',
    pinned: false,
    category: 'personal',
    date: new Date()
  })
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    if (route.params?.noteId) {
      const noteToEdit = notes.filter(note => note.id === route.params.noteId)

      setNote({
        title: noteToEdit[0]?.title,
        body: noteToEdit[0]?.body,
        pinned: noteToEdit[0]?.pinned,
        category: noteToEdit[0]?.category,
        date: noteToEdit[0]?.date
      })
    }
  }, [route.params?.noteId])

  const handleAddNote = () => {
    const newNote = {
      title: note.title, 
      body: note.body || '', 
      pinned: note.pinned,
      category: note.category,
      date: note.date
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

  const renderContent = () => (
    <View style={styles.bottomContainer}>
      <View style={styles.handle}>
        <View style={styles.handleItem} />
      </View>
      <NoteScreenBottomSheet note={note} setNote={setNote} />
    </View>
  )


  return (
    <View style={{ flex: 1 }}>
      
      <Overlay open={overlay} onClose={() => { setOverlay(false) }}>
        <OverlayItem title="Take a photo" icon={{ name: "camera", type: "ionicon" }} />
        <OverlayItem title="Add from library" icon={{ name: "image", type: "ionicon" }} />
      </Overlay>

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

          <ButtonSmall handleChange={() => { setOverlay(true) }}>
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
        </View>
        
      </Container>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 300, 100]}
        borderRadius={10}
        renderContent={renderContent}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
    </View>
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
  bottomContainer: {
    backgroundColor: colors.lightGrey,
    height: 300,
    flexGrow: 2,
    padding: 32,
  },
  handle: {
    alignItems: 'center'
  },
  handleItem: {
    width: 48,
    height: 5,
    backgroundColor: colors.black,
    borderRadius: 500,
  }
})

export default NoteScreen