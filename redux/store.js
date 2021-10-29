import { combineReducers, createStore } from "redux"
import noteReducer from "./reducers/noteReducer"

const reducer = combineReducers({
  notes: noteReducer
});

const store = createStore(reducer)

export default store