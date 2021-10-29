// Actions
const addNote = (note) => ({
  type: "ADD_NOTE",
  note
})

const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  noteId
})

const completeNote = (noteId) => ({
  type: "COMPLETE_NOTE",
  noteId
})

const updateNote = () => ({
  type: "UPDATE_NOTE"
})

export { addNote, deleteNote, completeNote, updateNote }
