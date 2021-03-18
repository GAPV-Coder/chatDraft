const INITIAL_STATE = {
    formInfo: {}
}

const userFormReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FORM_SUBMITTED':
            return {
                ...state, 
                formInfo: action.payload
            }
        default:
            return state;
    }
}

export default userFormReducer;