const CanhBaoChayNhanhReducers = (state = [], action) => {
    switch (action.type) {
        case 'CANH_BAO_CHAY':
            return {
                payload1: action.payload1,
                payload2: action.payload2
            }
        default:
            return state
    }
}

export default CanhBaoChayNhanhReducers