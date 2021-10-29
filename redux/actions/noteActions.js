// Actions
export const addNote = (note) => ({
  type: "ADD_NOTE",
  note
})

export const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  noteId
})

export const completeNote = () => ({
  type: "COMPLETE_NOTE"
})

export { addNote, deleteNote, completeNote }
