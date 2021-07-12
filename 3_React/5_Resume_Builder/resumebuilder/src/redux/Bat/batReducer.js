let initialState = {
    quantity: 20
}

function batReducer(state = initialState, action) {
    console.log(state);
    switch(action.type) {
        case "buy_bat":
            // Store update
            // console.log(action);
            return {
                quantity: state.quantity - action.payload
            }
        default:
            return state;
    }
}

export default batReducer;