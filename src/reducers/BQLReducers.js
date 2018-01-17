const BQLReducers = (state = [], action) => {
    switch (action.type) {
        case 'BQL':
            return action.payload;
        default:
            return state
    }
}

export default BQLReducers