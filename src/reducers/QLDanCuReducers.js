const QLDanCuReducers = (state = [], action) => {
    switch (action.type) {
        case 'BQL':
            return {
                payload: action.payload
            }
        default:
            return state
    }
}

export default QLDanCuReducers