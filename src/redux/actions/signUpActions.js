import axios from "axios";

export const actions = {
    SIGN_UP: 'SIGN_UP', 
    SIGN_UP_SUCCESSFUL: 'SIGN_UP_SUCCESSFUL',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
}

export const signUp = () => {
    return {
        type: actions.SIGN_UP,
        payload: 'signing up...'
    }
}

export const signUpSuccess = (data) => {
    return {
        type: actions.SIGN_UP_SUCCESSFUL, 
        payload: data
    }
}

export const signUpError = (error) => {
    return {
        type: actions.SIGN_UP_ERROR,
        payload: error
    }
}

export const signUpFailure = (data) => {
    return {
        type: actions.SIGN_UP_FAILURE, 
        payload: data
    }
}

export const signUpThunk = (userEmail, userUsername, userPassword) => {
    return function(dispatch) {
        dispatch(signUp())
        return axios
        .post('https://academlo-chat.herokuapp.com/api/users/signup', {
                    email: userEmail,
                    username: userUsername,
                    password: userPassword
                })
        .then(function (response) {
            if(response.data.access) {
                dispatch(signUpSuccess(response.data))
            } else {
                dispatch(signUpFailure(response.data))
            }
        })
        .catch(function (error) {
            dispatch(signUpError(error))
        });
        
    }
}