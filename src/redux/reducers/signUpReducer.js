const INITIAL_STATE = {
    response: {}
}

const signUpReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SIGN_UP':
            return {
                ...state, 
                response: { isLoading: {value: true, message: action.payload} }
            }
        case 'SIGN_UP_SUCCESSFUL':
        return {
            ...state, 
            response: action.payload
        }
        case 'SIGN_UP_FAILURE': 
            return {
                ...state, 
                response: { error: action.payload }
            }
        default: 
            return state;
    }
}

export default signUpReducer;