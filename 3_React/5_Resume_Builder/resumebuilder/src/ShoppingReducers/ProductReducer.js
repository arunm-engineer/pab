import { products } from '../Data/data';

const initialState = [...products];

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}