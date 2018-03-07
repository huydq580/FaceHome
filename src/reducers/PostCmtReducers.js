const PostCmtReducers = (state = [], action) => {
    switch (action.type) {
        case 'POST_CMT':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default PostCmtReducers