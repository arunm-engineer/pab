import { createStore } from "redux";
import { rootReducer } from "./ShoppingReducers/RootReducer";

const shoppingStore = createStore(rootReducer);
export default shoppingStore;