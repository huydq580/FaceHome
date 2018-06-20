const MessagesDetailsReducers = (state = [], action) => {
    switch (action.type) {
        case 'MESSAGE_DETAILS':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default MessagesDetailsReducers