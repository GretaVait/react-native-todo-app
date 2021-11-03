import { combineReducers, createStore } from "redux"
import categoryReducer from "./reducers/categoryReducer";
import noteReducer from "./reducers/noteReducer"

const reducer = combineReducers({
  notes: noteReducer,
  category: categoryReducer
});

const store = createStore(reducer)

export default store