const GetDetailRaoVatReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_DETAIL_RAOVAT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default GetDetailRaoVatReducers