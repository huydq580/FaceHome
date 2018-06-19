const PostSuCoReducers = (state = [], action) => {
    switch (action.type) {
        case 'POST_SUCO':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default PostSuCoReducers