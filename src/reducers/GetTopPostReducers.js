const GetTopPostReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_TOP_POST':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default GetTopPostReducers