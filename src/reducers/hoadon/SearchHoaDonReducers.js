const SearchHoaDonReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_HOADON':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SearchHoaDonReducers