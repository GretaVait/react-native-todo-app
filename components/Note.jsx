// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
// Navigation
import { CommonActions } from '@react-navigation/native'
// Colors
import colors from '../constants/colors'

const Note = ({ navigation, title, body, date, completed, id, handleCompleteNote }) => {

  const handleEditNote = (id) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'NoteScreen',
        params: {
          noteId: id
        }
      })
    )
  }

  return (
    <TouchableOpacity style={styles.note} onPress={handleCompleteNote} onLongPress={() => { handleEditNote(id) }}>
      <View style={{ ...styles.checkmark, backgroundColor: completed ? colors.purple : 'white', borderColor: completed ? 'white' : colors.purple }}>
        <Icon name="checkmark-outline" type="ionicon" size={16} color="white" style={{ opacity: completed ? 1 : 0 }} />
      </View>
      <View style={{ opacity: completed ? .3 : 1 }}>
        <Text style={styles.noteTitle}>{title}</Text>
        <Text style={styles.noteBody}>{body}</Text>
        <View style={styles.noteDate}>
          <Text style={styles.noteDateText}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    backgroundColor: colors.lightGrey,
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
    marginBottom: 16
  },
  noteTitle: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  noteBody: {
    color: colors.purple,
    fontSize: 14,
    marginBottom: 24
  },
  noteDate: {
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  noteDateText: {
    color: colors.purple
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Note