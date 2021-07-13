import { createStore } from "redux";
import { rootReducer } from "./ShoppingReducers/RootReducer";

const store = createStore(rootReducer);
export default store;