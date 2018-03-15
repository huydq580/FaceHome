const SearchRaoVatReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_RAOVAT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SearchRaoVatReducers