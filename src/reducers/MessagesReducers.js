const MessagesReducers = (state = [], action) => {
    switch (action.type) {
        case 'MESSAGE':
            return {
                payload : action.payload,
                payload1 : action.payload1,
            }
        default:
            return state
    }
}

export default MessagesReducers