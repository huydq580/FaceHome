const NhaBQLReducers = (state = [], action) => {
    switch (action.type) {
        case 'NHA_BQL':
            return action.payload
        default:
            return state
    }
}

export default NhaBQLReducers