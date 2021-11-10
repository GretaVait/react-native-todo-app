// Base
import React, { useEffect, useState, useRef } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions, Keyboard, Platform } from 'react-native'
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

const NoteScreen = ({ route }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const [snapPoint, setSnapPoint] = useState(500)
  const [actionModal, setActionModal] = useState(false)

  const sheetRef = React.useRef(null)

  const [note, setNote] = useState({
    title: '',
    body: '',
    pinned: false,
    category: 'personal',
    date: new Date(),
    files: []
  })

  // EDIT A NOTE //
  useEffect(() => {
    if (route.params?.noteId) {
      const noteToEdit = notes.filter(note => note.id === route.params.noteId)

      setNote({
        title: noteToEdit[0]?.title,
        body: noteToEdit[0]?.body,
        pinned: noteToEdit[0]?.pinned,
        category: noteToEdit[0]?.category,
        date: noteToEdit[0]?.date,
        files: noteToEdit[0]?.files
      })
    }
  }, [route.params?.noteId])

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

  // BOTTOM SHEET CONTENT //
  const renderContent = () => (
    <View style={{
      marginTop: 20
    }}>
      <View style={styles.bottomContainer}>
        <View style={styles.handle}>
          <View style={styles.handleItem} />
        </View>
        <NoteScreenBottomSheet note={note} setNote={setNote} />
      </View>
    </View>
  )

  // CHECK IF KEYBOARD IS VISIBLE/HIDDEN //
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        sheetRef.current.snapTo(1)
      }
    )

    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        sheetRef.current.snapTo(1)
      }
    )

    return () => {
      keyboardWillShowListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const handleOptionsButton = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
      setSnapPoint(500)
      sheetRef.current.snapTo(0)
    } else {
      setActionModal(true)
    }
  }

  // 

  const wrapperRef = useRef(null)
  // useEffect(() => {
  //   console.log(wrapperRef?.current)
  // }, [wrapperRef])

  return (
    <View style={{ flex: 1 }}>

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
      <View style={{...styles.actionsModal, opacity: actionModal ? 1 : 0}} pointerEvents={actionModal ? 'auto' : 'none'} >
        <NoteScreenBottomSheet note={note} setNote={setNote} />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[snapPoint, 0]}
        initialSnap={1}
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
  bottomContainer: {
    backgroundColor: colors.lightGrey,
    height: 500,
    flexGrow: 2,
    padding: 32,
    marginBottom: -20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 500,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    
    elevation: 24,
  },
  handle: {
    alignItems: 'center'
  },
  handleItem: {
    width: 48,
    height: 5,
    backgroundColor: colors.black,
    borderRadius: 500,
  },
  files: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  thumbnail: {
    resizeMode: "cover",
    marginBottom: 16
  },
  actionsModal: {
    position: 'absolute', 
    right: 0, 
    top: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 24,
    padding: 24
  }
})

export default NoteScreen