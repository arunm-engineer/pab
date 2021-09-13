import * as actionTypes from '../actionTypes';
import initialState from '../initialState.json';

export default function educationReducer(state = initialState.educationSection, action) {
    switch(action.type) {
        case actionTypes.SET_EDUCATION:
            return {...action.payload}
        case actionTypes.UPDATE_EDUCATION:
            return {...action.payload}
        default:
            return state;
    }
}