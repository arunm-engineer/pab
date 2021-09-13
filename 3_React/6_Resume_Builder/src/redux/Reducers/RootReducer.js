import { combineReducers } from "redux";
import contactReducer from "./ContactReducer";
import documentReducer from "./DocumentReducer";
import educationReducer from "./EducationReducer";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    document: documentReducer,
    contact: contactReducer,
    education: educationReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})

export default rootReducer;