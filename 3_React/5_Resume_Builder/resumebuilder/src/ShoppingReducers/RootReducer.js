import { combineReducers } from "redux";
import productsReducer from "./ProductReducer";
import cartReducer from "./CartReducer";

export const rootReducer = combineReducers({
    Product: productsReducer,
    Cart: cartReducer 
})