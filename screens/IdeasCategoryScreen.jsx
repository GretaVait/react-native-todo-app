// Base
import React, { useEffect, useState } from 'react'
// Redux
import { useSelector } from 'react-redux'
import Category from '../sections/Category'

const IdeasCategoryScreen = ({ navigation }) => { 
  const notes = useSelector(state => state.notes)
  const [notesList, setNoteList] = useState([])

  useEffect(() => {
    console.log(notes, 'note')
    const sortedNotes = notes.sort((a, b) => { return b.id - a.id })

    setNoteList([
      {
        title: 'Pinned',
        data: sortedNotes.filter(note => note.pinned === true && note.category === 'work')
      },
      {
        title: 'Upcoming',
        data: sortedNotes.filter(note => note.pinned === false && note.category === 'work')
      }
    ])
  }, [notes])

  return (
    <Category navigation={navigation} title="Ideas" notes={notesList} />
  ) 
}

export default IdeasCategoryScreen