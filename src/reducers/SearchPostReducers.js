const SearchPostReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_POST':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SearchPostReducers