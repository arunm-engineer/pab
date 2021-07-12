import { combineReducers } from "redux";
import batReducer from "./Bat/batReducer";
import ballReducer from "./Ball/ballReducer";

// Merged store with both reducers of bat & ball
const rootReducer = combineReducers({
    Ball: ballReducer,
    Bat: batReducer
})

export default rootReducer;