const KDTInfoReducers = (state = [], action) => {
    switch (action.type) {
        case 'KDT_INFO':
            return action.payload;
        default:
            return state
    }
}

export default KDTInfoReducers