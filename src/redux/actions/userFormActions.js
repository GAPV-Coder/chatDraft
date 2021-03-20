export const actions = {
    FORM_SUBMITTED: 'FORM_SUBMITTED', 
    LOG_OUT: 'LOG_OUT'
}

export const userForm = (inputData) => {
    return {
        type: actions.FORM_SUBMITTED,
        payload: inputData
    }
}

export const logOutForm = () => {
    return {
        type: actions.LOG_OUT, 
        payload: {}
    }
}