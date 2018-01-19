const SoanTinReducers = (state = [], action) => {
    switch (action.type) {
        case 'SOAN_TIN':
            return {
                payload: action.payload,
                payload1: action.payload1
            }
        default:
            return state
    }
}

export default SoanTinReducers