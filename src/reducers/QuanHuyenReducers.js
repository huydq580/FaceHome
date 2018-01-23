const QuanHuyenReducers = (state = [], action) => {
    switch (action.type) {
        case 'QUAN_HUYEN':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default QuanHuyenReducers