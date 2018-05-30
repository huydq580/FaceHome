const ThemCanHoReducers = (state = [], action) => {
    switch (action.type) {
        case 'THEM_CAN_HO':
            return {
                payload: action.payload,
            }
        default:
            return state
    }
}

export default ThemCanHoReducers