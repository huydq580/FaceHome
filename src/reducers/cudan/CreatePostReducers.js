const CreatePostReducers = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_POST':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default CreatePostReducers