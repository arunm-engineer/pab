import { combineReducers } from "redux";
import documentReducer from "./DocumentReducer";

const rootReducer = combineReducers({
    document: documentReducer
})

export default rootReducer;