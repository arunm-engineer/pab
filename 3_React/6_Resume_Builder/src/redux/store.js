import { createStore } from "redux";
import rootReducer from './Reducers/RootReducer';

let store = createStore(rootReducer);
export default store;