const CanhBaoChayNhanhReducers = (state = [], action) => {
    switch (action.type) {
        case 'CANH_BAO_CHAY':
            return action.payload;
        default:
            return state
    }
}

export default CanhBaoChayNhanhReducers