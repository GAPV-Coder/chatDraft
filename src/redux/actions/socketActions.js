export const actions = {
    MESSAGE: 'MESSAGE',
    ROOM_DATA: 'ROOM_DATA',
    ERROR: 'ERROR',
    CONNECT_SUCCESSFUL: 'CONNECT_SUCCESSFUL',
    CONNECT_FAILURE: 'CONNECT_FAILURE',
    CONNECT_ERROR: 'CONNECT_ERROR',
    MSG_SOCKET_ON: 'MSG_SOCKET_ON',
    LOG_OUT: 'LOG_OUT'};


export const connectSocketSuccessful = (data) => {
    return {
        type: actions.CONNECT_SUCCESSFUL, 
        payload: data
    }
}

export const connectSocketFailure = (data) => {
    return {
        type: actions.CONNECT_FAILURE, 
        payload: data
    }
}

export const connectSocketError = (err) => {
    return {
        type: actions.CONNECT_ERROR,
        payload: err
    }
}

export const message = (msgInfo) => {
    return {
        type: actions.MESSAGE,
        payload: msgInfo
    }
}

export const roomData = (roomInfo) => {
    return {
        type: actions.ROOM_DATA,
        payload: roomInfo
    }
}

export const error = (err) => {
    return {
        type: actions.ERROR,
        payload: err
    }
}

export const messageSocketOn = (msg) => {
    return {
        type: actions.MSG_SOCKET_ON, 
        payload: msg
    }
}

export const logOutSocket = () => {
    return {
        type: actions.LOG_OUT
    }
}