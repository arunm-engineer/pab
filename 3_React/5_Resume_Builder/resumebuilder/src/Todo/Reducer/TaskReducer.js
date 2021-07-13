let initialState = {
    tasks: []
}

export default function taskReducer(state = initialState, action) {
    switch(action.type) {
        case "add":
            return {
                tasks: [...state.tasks, action.task]
            }
        case "delete":
            return {
                tasks: state.tasks.filter(task => {
                    return action.task !== task;
                })
            }
        default:
            return state;
    }
}