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

const updateNote = ({ noteId, note }) => ({
  type: "UPDATE_NOTE",
  noteId,
  note
})

export { addNote, deleteNote, completeNote, updateNote }
