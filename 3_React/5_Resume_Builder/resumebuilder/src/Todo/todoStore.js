import { createStore } from "redux";
import taskReducer from "./Reducer/TaskReducer";

const todoStore = createStore(taskReducer);
export default todoStore;