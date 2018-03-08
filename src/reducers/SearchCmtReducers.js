const SearchCmtReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_CMT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SearchCmtReducers