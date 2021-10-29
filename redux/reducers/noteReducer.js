// State
const initialState = {
  id: 0,
  title: '',
  body: '',
  date: 0,
  file: [],
  category: '',
  completed: false,
  deleted: false,
  pinned: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        ...action.note
      }
    case "DELETE_NOTE":
      return {
        ...state,
        ...state.filter((note) => note.id !== action.noteId)
      }
    case "COMPLETE_NOTE":
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
};