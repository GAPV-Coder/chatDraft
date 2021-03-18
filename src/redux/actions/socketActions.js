

const MESSAGE = 'MESSAGE';
const ROOM_DATA = 'ROOM_DATA';
const ERROR = 'ERROR';
const CONNECT = 'CONNECT';
const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
const CONNECT_FAILURE = 'CONNECT_FAILURE';
const CONNECT_ERROR = 'CONNECT_ERROR';

export const connectSocket = () => {
    return {
        type: CONNECT, 
        payload: 'connecting...'
    }
}

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

// export const socketThunk = (token, username, room) => {
//     return function (dispatch) {
//         dispatch(connectSocket());
//         try {
            
//             console.log(socket.connected);
//             if(socket.connected) { 
//                 dispatch(connectSocketSuccessful(socket.connected));
//             } else if (socket.connected === false) {
//                 dispatch(connectSocketFailure(socket.connected));
//             }
//         } catch (err) {
//             dispatch(connectSocketError(err))
//         }
        

        // socket.emit('join', {name: username, room: room}, () => {});

        // socket.on('roomData', (data) => {
        //     dispatch(roomData(data));
        //   console.log(data);
        // });
    }
}