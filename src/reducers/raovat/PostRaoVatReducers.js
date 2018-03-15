const PostRaoVatReducers = (state = [], action) => {
    switch (action.type) {
        case 'POST_RAOVAT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default PostRaoVatReducers