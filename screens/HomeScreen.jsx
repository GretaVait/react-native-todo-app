// Base
import React, { useEffect, useState } from 'react'
// Comp
import Category from '../sections/Category'
// Redux
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => { 
  const notes = useSelector(state => state.notes)
  const [notesList, setNoteList] = useState([])

  useEffect(() => {
    const sortedNotes = notes.sort((a, b) => { return b.id - a.id })

    setNoteList([
      {
        title: 'Pinned',
        data: sortedNotes.filter(note => note.pinned === true && note.category === 'personal')
      },
      {
        title: 'Upcoming',
        data: sortedNotes.filter(note => note.pinned === false && note.category === 'personal')
      }
    ])
  }, [notes])

  return (
    <Category navigation={navigation} title="Personal" notes={notesList} />
  ) 
}

export default HomeScreen