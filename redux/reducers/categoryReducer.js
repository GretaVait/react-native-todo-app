const categoryInitialState = {
  activeItem: 'personal'
}

const categoryReducer = (state = categoryInitialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      return {
        ...state,
        activeItem: action.activeItem
      }
    default:
      return state
  }
}

export default categoryReducer