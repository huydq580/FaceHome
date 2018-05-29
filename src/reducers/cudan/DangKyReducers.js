const DangKyReducers = (state = [], action) => {
    switch (action.type) {
        case 'DANG_KY':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default DangKyReducers