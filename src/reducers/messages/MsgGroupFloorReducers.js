const MsgGroupFloorReducers = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_GROUP_FLOOR':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default MsgGroupFloorReducers