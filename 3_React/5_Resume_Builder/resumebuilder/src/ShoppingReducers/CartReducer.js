let initialState = {
    items: []
}

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case "add_item":
            return {
                items: [...state.items, action.payload]
            }
        case "remove_item":
            return {
                items: state.items.filter(item => {
                    return item.title !== action.payload
                })
            }
        default:
            return state;
    }
}