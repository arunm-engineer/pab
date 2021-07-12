let initialState = {
    balls: 5
}

function ballReducer(state = initialState, action) {
    // console.log("In store", action);

    // Action to be carried out according to request, i.e. state update
    switch (action.type) {
        case "buy_ball":
            // Here state gets updated
            return {
                balls: state.balls-1
            }
        case "sell_ball":
            // Here state gets updated
            return {
                balls: state.balls+1
            }
        default:
            return state;
    }
}

export default ballReducer;