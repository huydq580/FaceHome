const QLDanCuReducers = (state = [], action) => {
    switch (action.type) {
        case 'INFO_CUDAN':
            return {
                payload: action.payload
            }
        default:
            return state
    }
}

export default QLDanCuReducers