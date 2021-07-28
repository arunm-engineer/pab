import * as actionTypes from '../actionTypes';
import initialState from '../initialState.json';

export default function documentReducer(state=initialState.document, action) {
    switch(action.type) {
        case actionTypes.SET_SKIN:
            return action.payload;
        case actionTypes.UPDATE_SKIN:
            return {
                id: state.id,
                skinCd: action.payload
            }
        default:
            return state;
    }

}