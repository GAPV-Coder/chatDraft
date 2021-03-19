export const userForm = (inputData) => {
    return {
        type: 'FORM_SUBMITTED',
        payload: inputData
    }
}

export const logOutForm = () => {
    return {
        type: 'LOG_OUT', 
        payload: {}
    }
}