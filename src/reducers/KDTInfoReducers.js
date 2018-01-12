const KDTInfoReducers = (state = [], action) => {
    switch (action.type) {
        case 'KDT_INFO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    dataKDTInfo: action.dataKDTInfo,
                    completed: false
                }
            ]
        default:
            return state
    }
}

export default KDTInfoReducers