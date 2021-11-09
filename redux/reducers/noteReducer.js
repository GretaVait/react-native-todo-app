// State
/*
  id: 0,
  title: '',
  body: '',
  date: 0,
  file: [],
  category: 'personal',
  completed: false,
  deleted: false,
  pinned: false
*/
const initialState = []

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [
        ...state,
        {
          id: state.length + 1,
          title: '',
          body: '',
          date: new Date(),
          files: [],
          category: '',
          completed: false,
          deleted: false,
          pinned: true,
          ...action.note
        }
      ]
    case "DELETE_NOTE":
      return state.filter((note) => note.id !== action.noteId)
    case "COMPLETE_NOTE":
      return state.map((note) => note.id === action.noteId ? { ...note, completed: note.completed ? false : true } : note)
    case "UPDATE_NOTE":
      return state.map((note) => note.id === action.noteId ? { ...note, ...action.note } : note)
    default:
      return state
  }
};