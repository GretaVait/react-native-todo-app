// Actions
const addNote = (note) => ({
  type: "ADD_NOTE",
  note
})

const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  noteId
})

const completeNote = () => ({
  type: "COMPLETE_NOTE"
})

const updateNote = () => ({
  type: "UPDATE_NOTE"
})

export { addNote, deleteNote, completeNote, updateNote }
