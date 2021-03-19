const MESSAGE = 'MESSAGE';
const ROOM_DATA = 'ROOM_DATA';
const ERROR = 'ERROR';
const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
const CONNECT_FAILURE = 'CONNECT_FAILURE';
const CONNECT_ERROR = 'CONNECT_ERROR';
const MSG_SOCKET_ON = 'MSG_SOCKET_ON';
const LOG_OUT = 'LOG_OUT';

const INITIAL_STATE = {
    room_data: [], 
    error: {}, 
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
