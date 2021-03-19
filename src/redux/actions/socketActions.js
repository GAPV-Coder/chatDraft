const MESSAGE = 'MESSAGE';
const ROOM_DATA = 'ROOM_DATA';
const ERROR = 'ERROR';
const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
const CONNECT_FAILURE = 'CONNECT_FAILURE';
const CONNECT_ERROR = 'CONNECT_ERROR';
const MSG_SOCKET_ON = 'MSG_SOCKET_ON';
const LOG_OUT = 'LOG_OUT';


export const connectSocketSuccessful = (data) => {
    return {
        type: CONNECT_SUCCESSFUL, 
        payload: data
    }
}

export const connectSocketFailure = (data) => {
    return {
        type: CONNECT_FAILURE, 
        payload: data
    }
}

export const connectSocketError = (err) => {
    return {
        type: CONNECT_ERROR,
        payload: err
    }
}

export const message = (msgInfo) => {
    return {
        type: MESSAGE,
        payload: msgInfo
    }
}

export const roomData = (roomInfo) => {
    return {
        type: ROOM_DATA,
        payload: roomInfo
    }
}

export const error = (err) => {
    return {
        type: ERROR,
        payload: err
    }
}

export const messageSocketOn = (msg) => {
    return {
        type: MSG_SOCKET_ON, 
        payload: msg
    }
}

export const logOutSocket = () => {
    return {
        type: LOG_OUT
    }
}