import {actions} from '../actions/userFormActions';

const {FORM_SUBMITTED, LOG_OUT} = actions;

const INITIAL_STATE = {
    formInfo: {}
}

const userFormReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FORM_SUBMITTED:
            return {
                ...state, 
                formInfo: action.payload
            }
        case LOG_OUT:
            return {
                ...state, 
                formInfo: action.payload
            }
        default:
            return state;
    }
}

export default userFormReducer;