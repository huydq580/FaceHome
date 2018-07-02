const CmtSuCoReducers = (state = [], action) => {
    switch (action.type) {
        case 'POST_CMT_SUCO':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default CmtSuCoReducers