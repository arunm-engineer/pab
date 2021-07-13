import { combineReducers } from "redux";
import batReducer from "./Bat/batReducer";
import ballReducer from "./Ball/ballReducer";
import userReducer from "./User/userReducer";

// Merged store with both reducers of bat & ball
const rootReducer = combineReducers({
    Ball: ballReducer,
    Bat: batReducer,
    User: userReducer
})

export default rootReducer;