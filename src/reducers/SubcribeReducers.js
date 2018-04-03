const SubcribeReducers = (state = [], action) => {
    switch (action.type) {
        case 'SUBCRIBE':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SubcribeReducers