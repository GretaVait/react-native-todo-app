// Base
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Colors
import colors from '../constants/colors'
// Comp
import Container from '../components/Container'
import ButtonSmall from '../components/ButtonSmall'
import Note from '../components/Note'
import Catgories from '../components/Categories'
// Redux
import { completeNote } from '../redux/actions/noteActions'
import { useDispatch } from 'react-redux'
import Title from '../components/Title'
import Overlay from '../components/Overlay'
import OverlayItem from '../components/OverlayItem'

const Category = ({ navigation, title, notes }) => { 
  const nav = useNavigation()
  const dispatch = useDispatch()
  
  const [overlay, setOverlay] = useState(false)

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      
      <Overlay open={overlay} onClose={() => { setOverlay(false) }}>
        <OverlayItem 
          title="History"
          icon={{ name: "history", type: "material" }}
        />
      </Overlay>
      
      <View style={{ width: 32 }}>
        <Catgories />
      </View>

      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <ButtonSmall handleChange={() => { setOverlay(true) }}>
            <View style={{ ...styles.menuLine, marginBottom: 4 }} />
            <View style={styles.menuLine} />
          </ButtonSmall>

        </View>

        <SectionList
          sections={notes}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Note
              note={item}
              handleCompleteNote={() => { dispatch(completeNote(item.id)) }}
              navigation={navigation}
            />
          )}
          renderSectionHeader={({ section: { title }, section }) => (
            section.data.length > 0 &&
              <Title style={styles.subtitle}>{title}</Title>
          )} 
        />

        <TouchableOpacity style={ styles.addNoteButton } onPress={() => { nav.navigate('NoteScreen') }}>
          <Icon name="add-outline" type="ionicon" size={48} color="white" />
        </TouchableOpacity>
      </Container>
    </View>
  ) 
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  addNoteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.purple,
    borderRadius: 500,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.black,
  },
  subtitle: {
    marginBottom: 8
  }
})

export default Category