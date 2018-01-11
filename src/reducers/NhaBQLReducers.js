const NhaBQLReducers = (state = [], action) => {
    switch (action.type) {
        case 'NHA_BQL':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    dataNha: action.dataNha,
                    completed: false
                }
            ]
        default:
            return state
    }
}

export default NhaBQLReducers