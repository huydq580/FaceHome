const SearchFaceHomeReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_FACEHOME':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default SearchFaceHomeReducers