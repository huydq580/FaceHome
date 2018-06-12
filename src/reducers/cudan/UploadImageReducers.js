const UploadImageReducers = (state = [], action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default UploadImageReducers