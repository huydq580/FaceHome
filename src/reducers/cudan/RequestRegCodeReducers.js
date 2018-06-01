const RequestRegCodeReducers = (state = [], action) => {
    switch (action.type) {
        case 'REG_CODE':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default RequestRegCodeReducers