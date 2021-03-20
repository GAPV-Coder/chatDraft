import axios from "axios";

export const actions = {
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS : 'LOG_IN_SUCCESS',
    LOG_IN_FAILURE : 'LOG_IN_FAILURE',
    LOG_IN_ERROR : 'LOG_IN_ERROR',
    LOG_OUT : 'LOG_OUT',
} 

export const logIn = () => {
    return {
        type: actions.LOG_IN,
        payload: 'logging in...'
    }
}

export const logInSuccess = (data) => {
    return {
        type: actions.LOG_IN_SUCCESS, 
        payload: data
    }
}

export const logInError = (error) => {
    return {
        type: actions.LOG_IN_ERROR,
        payload: error
    }
}

export const logInFailure = (data) => {
    return {
        type: actions.LOG_IN_FAILURE, 
        payload: data
    }
}

export const logOutLoggedIn = () => {
    return {
        type: actions.LOG_OUT,
        payload: {}
    }
}

export const logInThunk = (userEmail, userPassword) => {
    return function(dispatch) {
        dispatch(logIn());
        return axios
        .post('https://academlo-chat.herokuapp.com/api/users/login', {
            email: userEmail,
            password: userPassword, 
        })
        .then((response) => {
            if(response.data.access) {
                dispatch(logInSuccess(response.data));
            } else {
                dispatch(logInFailure(response.data));
            }
        })
        .catch(function (error) {
            dispatch(logInError(error))
        });
    }
}