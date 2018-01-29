const SuCoReducers = (state = [], action) => {
    switch (action.type) {
        case 'SU_CO':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default SuCoReducers