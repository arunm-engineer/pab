export async function userFetchMiddleWare(dispatch) {
    // Here in this middleware the actual async process is carried out
    // Further when the async task completes we dispatch the object with data and the action. And this dispatch with data will move forward to the reducer
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await response.json();
        dispatch({
            type: "success_users",
            payload: users
        })
    }
    catch(err) {
        dispatch({
            type: "error_users",
            payload: err.message
        })
    }
}