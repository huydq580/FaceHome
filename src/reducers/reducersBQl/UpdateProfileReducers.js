const UpdateProfileReducers = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            return {
                payload: action.payload
            }
        default:
            return state
    }
}

export default UpdateProfileReducers