const GetCategoryReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_CATEGORY_RAOVAT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default GetCategoryReducers