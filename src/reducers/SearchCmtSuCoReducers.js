const SearchCmtSuCoReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_CMT_SUCO':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SearchCmtSuCoReducers