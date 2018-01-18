const LoginReducers = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN':
            return {

                    payload: action.payload,

                }
        default:
            return state
    }
}

export default LoginReducers