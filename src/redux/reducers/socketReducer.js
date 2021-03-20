import {actions} from '../actions/socketActions';

const {MESSAGE, ROOM_DATA, ERROR, CONNECT_SUCCESSFUL, CONNECT_FAILURE, CONNECT_ERROR, MSG_SOCKET_ON, LOG_OUT} = actions;

const INITIAL_STATE = {
    room_data: [], 
    error: '', 
    msgSocketOn: []
}

const socketReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CONNECT_SUCCESSFUL:
            return {
                ...state, 
                connected: action.payload
            }
        case CONNECT_FAILURE:
            return {
                ...state, 
                connected: action.payload
            }
        case CONNECT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case MESSAGE: 
            return {
                ...state, 
                message: action.payload
            }
        case ROOM_DATA:
            return {
                ...state,
                room_data: action.payload
            }
        case ERROR:
            return {
                ...state, 
                error: action.payload
            }
        case MSG_SOCKET_ON:
            return {
                ...state,
                msgSocketOn: [...state.msgSocketOn, action.payload]
            }
        case LOG_OUT:
            return {
                ...state, 
                room_data: [], 
                error: {}, 
                msgSocketOn: []
            }
        default: 
            return state;
    }
}

export default socketReducer;
