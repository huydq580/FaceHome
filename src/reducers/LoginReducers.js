const LoginReducers = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    dataLogin: action.dataLogin,
                    completed: false,

                }
            ]
        default:
            return state
    }
}

export default LoginReducers