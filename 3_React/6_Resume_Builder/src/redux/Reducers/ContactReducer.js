import initialState from '../initialState.json';
import * as actionTypes from '../actionTypes';

export default function contactReducer(state = initialState.contactSection, action) {
    switch(action.type) {
        case actionTypes.SET_CONTACT:
            return {...action.payload}
        case actionTypes.UPDATE_CONTACT:
            return {...action.payload}
        default:
            return state;
    }
}