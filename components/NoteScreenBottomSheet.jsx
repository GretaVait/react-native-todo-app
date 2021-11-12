// Base
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
// Comp
import Title from '../components/Title'
import Toggle from '../components/Toggle'
import CustomDateTimePicker from '../components/CustomDateTimePicker'
// Colors
import colors from '../constants/colors'

const NoteScreenBottomSheet = ({ note, setNote, onOpenCamera }) => { 

  // PICK AN IMAGE //
  let openImagePickerAsync = async () => {
    // ask for permission to access photos
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    // get picked img data
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // set picked img data to state
    if (pickerResult.cancelled === true) {
      return;
    }
    setNote((prevState) => ({
      ...prevState,
      files: [
        ...note.files,
        {
          id: pickerResult.uri.substr(pickerResult.uri.length - 12) + pickerResult.width,
          localUri: pickerResult.uri, 
          width: pickerResult.width, 
          height: pickerResult.height
        }
      ]
    }))
  }

  return (
    <View>

      <View style={styles.settings}>
        <Title style={styles.settingsTitle}>Attach File</Title>

        <View style={styles.attach}>
          <TouchableOpacity style={styles.attachItem} onPress={() => { onOpenCamera() }}>
            <Icon name="camera" type="ionicon" size={24} color={colors.black} />
            <Text style={styles.attachTitle}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachItem} onPress={() => { openImagePickerAsync() }}>
            <Icon name="image" type="ionicon" size={24} color={colors.black} />
            <Text style={styles.attachTitle}>Image</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settings}>
        <Title style={styles.settingsTitle}>Category</Title>
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

      <View style={styles.settings}>
        <Title style={styles.settingsTitle}>Pinned</Title>
        
        <Toggle 
          active={note.pinned}
          handleToggle={() => {
            setNote((prevState) => ({
              ...prevState,
              pinned: !prevState.pinned
            }))
          }}
        />
      </View>
      
      <CustomDateTimePicker note={note} setNote={setNote} />
    </View>
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
  settings: {
    marginBottom: 32
  },
  settingsTitle: {
    marginBottom: 4
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
  },
  attach: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  attachItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 16
  },
  attachTitle: {
    color: colors.black,
    fontSize: 12
  }
})

export default NoteScreenBottomSheet