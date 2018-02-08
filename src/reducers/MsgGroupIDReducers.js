const MsgGroupIDReducers = (state = [], action) => {
    switch (action.type) {
        case 'MSGGROUPID':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default MsgGroupIDReducers