import axios from "axios";

const LOG_IN = 'LOG_IN';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
const LOG_OUT = 'LOG_OUT';

export const logIn = () => {
    return {
        type: LOG_IN,
        payload: 'logging in...'
    }
}

export const logInSuccess = (data) => {
    return {
        type: LOG_IN_SUCCESS, 
        payload: data
    }
}

export const logInError = (error) => {
    return {
        type: LOG_IN_FAILURE,
        payload: error
    }
}

export const logOutLoggedIn = () => {
    return {
        type: LOG_OUT,
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
            console.log(response);
            if(response.data.access) {
                dispatch(logInSuccess(response.data));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}