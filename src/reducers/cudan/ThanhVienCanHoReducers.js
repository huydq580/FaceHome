const ThanhVienCanHoReducers = (state = [], action) => {
    switch (action.type) {
        case 'THANH_VIEN':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default ThanhVienCanHoReducers