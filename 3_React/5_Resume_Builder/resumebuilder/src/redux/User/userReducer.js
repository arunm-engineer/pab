let initialState = {
    users: [],
    loading: true,
    error: ""
}

function userReducer(state = initialState, action) {
    console.log(state);

    // Here we carry out the action
    switch(action.type) {
        case "success_users":
            return {
                users: action.payload,
                loading: false,
                error: ""
            }
        case "error_users":
            return {
                users: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;