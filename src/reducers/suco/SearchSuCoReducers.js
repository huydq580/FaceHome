const SearchSuCoReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_SUCO':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default SearchSuCoReducers