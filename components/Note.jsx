// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
// Colors
import colors from '../constants/colors'

const Note = ({ title, body, date, completed, handleCompleteNote }) => {

  return (
    <TouchableOpacity style={styles.note} onPress={handleCompleteNote}>
      <View style={{ ...styles.checkmark, backgroundColor: completed ? colors.purple : 'white', borderColor: completed ? 'white' : colors.purple }}>
        <Icon name="checkmark-outline" type="ionicon" size={16} color="white" style={{ opacity: completed ? 1 : 0 }} />
      </View>
      <Text style={styles.noteTitle}>{title}</Text>
      <Text style={styles.noteBody}>{body}</Text>
      <View style={styles.noteDate}>
        <Text style={styles.noteDateText}>{date}</Text>
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
    alignItems: 'flex-start'
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