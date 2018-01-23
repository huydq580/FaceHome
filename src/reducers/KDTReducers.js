const KDTReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_KDT':
            return {
                payload : action.payload,
                payload1 : action.payload1,
            }
        default:
            return state
    }
}

export default KDTReducers