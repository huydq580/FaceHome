const GetDetailsHoaDonReducers = (state = [], action) => {
    switch (action.type) {
        case 'DETAILS_HOADON':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default GetDetailsHoaDonReducers