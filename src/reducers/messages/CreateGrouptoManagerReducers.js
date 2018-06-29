const CreateGrouptoManagerReducers = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_GROUP_MANAGER':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default CreateGrouptoManagerReducers