const NhaCuDanReducers = (state = [], action) => {
    switch (action.type) {
        case 'NHA_CUDAN':
            return action.payload
        default:
            return state
    }
}

export default NhaCuDanReducers