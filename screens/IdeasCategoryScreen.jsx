// Base
import React, { useEffect, useState } from 'react'
// Redux
import { useSelector } from 'react-redux'
import Category from '../sections/Category'

const IdeasCategoryScreen = ({ navigation }) => { 
  const notes = useSelector(state => state.notes)
  const [notesList, setNoteList] = useState([])

  useEffect(() => {
    const sortedNotes = notes.sort((a, b) => { return b.id - a.id })

    setNoteList([
      {
        title: 'Pinned',
        data: sortedNotes.filter(note => note.pinned === true && note.category === 'ideas')
      },
      {
        title: 'Upcoming',
        data: sortedNotes.filter(note => note.pinned === false && note.category === 'ideas')
      }
    ])
  }, [notes])

  return (
    <Category navigation={navigation} title="Ideas" notes={notesList} />
  ) 
}

export default IdeasCategoryScreen