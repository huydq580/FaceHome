const TinhThanhReducers = (state = [], action) => {
    switch (action.type) {
        case 'TINH_THANH':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default TinhThanhReducers