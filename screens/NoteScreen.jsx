// Base
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Keyboard, Platform } from 'react-native'
// Lib
import BottomSheet from 'reanimated-bottom-sheet'
import { Camera } from 'expo-camera'
// Redux
import { useSelector } from 'react-redux'
// Comp
import NoteScreenBottomSheet from '../components/NoteScreenBottomSheet'
import TakePicture from '../components/TakePicture'
// Colors
import colors from '../constants/colors'
import NoteForm from '../components/NoteForm'

const NoteScreen = ({ route }) => { 
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

  // BOTTOM SHEET CONTENT //
  const renderContent = () => (
    <View style={{
      marginTop: 20
    }}>
      <View style={styles.bottomContainer}>
        <View style={styles.handle}>
          <View style={styles.handleItem} />
        </View>
        <NoteScreenBottomSheet note={note} setNote={setNote} onOpenCamera={onOpenCamera} />
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

  // OPTION BUTTON FUNCION
  const handleOptionsButton = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
      setSnapPoint(500)
      sheetRef.current.snapTo(0)
    } else {
      setActionModal(true)
    }
  }

  // TAKE A PICTURE //
  const [openCamera, setOpenCamera] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)

  const onOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === 'granted')
    setOpenCamera(true)
  }
  

  if (hasPermission === null || !openCamera) {
    return (
      <View style={{ flex: 1 }}>

        <NoteForm note={note} setNote={setNote} handleOptionsButton={handleOptionsButton} setActionModal={setActionModal} route={route} />
        
        <View style={{...styles.actionsModal, opacity: actionModal ? 1 : 0}} pointerEvents={actionModal ? 'auto' : 'none'} >
          <NoteScreenBottomSheet note={note} setNote={setNote} onOpenCamera={onOpenCamera} />
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
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <TakePicture note={note} setNote={setNote} setOpenCamera={setOpenCamera} onOpenCamera={onOpenCamera} />
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
  },
})

export default NoteScreen