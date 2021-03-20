import {actions} from '../actions/loginActions';

const {LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_ERROR, LOG_OUT} = actions;

const INITIAL_STATE = {
    response: {}
}

const logInReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state, 
                response: { isLoading: {value: true, message: action.payload} }
            }
        case LOG_IN_SUCCESS:
            return {
                ...state, 
                response: action.payload
            }
        case LOG_IN_ERROR: 
            return {
                ...state, 
                response: { error: action.payload }
            }
        case LOG_IN_FAILURE:
            return {
                ...state, 
                response: action.payload
            }
        case LOG_OUT:
            return {
                ...state, 
                response: action.payload
            }
        default: 
            return state;
    }
}

export default logInReducer;