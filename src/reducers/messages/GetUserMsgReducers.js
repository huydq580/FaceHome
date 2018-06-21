const GetUserMsgReducers = (state = [], action) => {
    switch (action.type) {
        case 'MESSAGE':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default GetUserMsgReducers