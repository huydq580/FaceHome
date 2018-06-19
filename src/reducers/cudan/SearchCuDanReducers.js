const SearchCuDanReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_CUDAN':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default SearchCuDanReducers