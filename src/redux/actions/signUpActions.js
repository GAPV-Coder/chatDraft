import axios from "axios";
export const signUp = () => {
    return {
        type: 'SIGN_UP',
        payload: 'signing up...'
    }
}

export const signUpSuccess = (data) => {
    return {
        type: 'SIGN_UP_SUCCESSFUL', 
        payload: data
    }
}

export const signUpError = (error) => {
    return {
        type: 'SIGN_UP_FAILURE',
        payload: error
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
            console.log(response);
            if(response.data.access) {
                dispatch(signUpSuccess(response.data))
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
}