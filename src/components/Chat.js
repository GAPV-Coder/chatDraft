import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from "socket.io-client";
import {roomData, message, error, socketThunk} from '../redux/actions/socketActions';

// material ui 
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import socketReducer from '../redux/reducers/socketReducer';

const useStyles = makeStyles({
    root: {
        background: '#1A1A1D',
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: 10, 
        fontFamily: 'Oswald, sans-serif',
        boxSizing: 'border-box'
    },   
    parentContainer: {
        display: 'flex', 
        flexDirection: 'column',
        flexWrap: 'wrap', 
        height: '100vh'
    },
    icon: {
        color: 'white',
        marginRight: 10
    },
    container: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    hr: {
        marginTop: 20, 
    }, 
    usernameIcon: {
        color: 'green',
        marginRight: 10, 
        width: 15, 
        height: 15
    },
    userContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'start', 
        paddingLeft: 10
    }, 
    logoutContainer: {
        paddingBottom: 10
    }, 
    logOutButton: {
        color: 'white'
    },
    exitIcon: {
        width: 40, 
        height: 40, 
        marginRight: 10,
    }, 
    exitHr: {
        marginBottom: 15
    },
    sendContainer: {
        display: 'flex', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    sendIcon: {
        width: 40,
        height: 40, 
        color: 'white'
    }, 
    input: {
        width: '90%', 
    }, 
    button: { 
        border: 0, 
        background: 'black', 
        borderRadius: 5, 
        padding: 5, 
        '&:hover': {
            border: 0, 
            background: 'black', 
            borderRadius: 5, 
            padding: 5
        },
    }, 
    chatContainer: {
        padding: 10, 
    },
    boxDiv: {
        width:'fit-content',
        background: '#dddddd',
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20,
        padding: '15px 20px'
    }, 
    msgUsername: {
        fontWeight: 'bold',
        margin: 0
    }, 
    msgMsg: {
        margin: 0
    }
});

const Chat = () => {
    const token = useSelector(state => state.logInReducer.response.user.token);
    const username = useSelector(state => state.logInReducer.response.user.username);
    const room = useSelector(state => state.userFormReducer.formInfo.room);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('https://academlo-chat.herokuapp.com/', { query: {token: token} });
        console.log(socket);
        
        socket.emit('join', {name: username, room: room}, () => {});

        socket.on('roomData', (data) => {
            dispatch(roomData(data));
          console.log(data);
        });      
        
        socket.emit('sendMessage', 'hola cam y gus', () => {});


        socket.on('message', (data) => {
            dispatch(message(data));
            console.log(data);
            // moment("20120620", "YYYYMMDD").fromNow();
        })

        socket.on('error', (err) => {
            dispatch(error(err));
            console.log(err)
        })
    }, [dispatch, token, username, room])

    // const roomName = useSelector(state => state.socketReducer.room_data.room);
    // const messageInfo = useSelector(state => state.socketReducer.message);
    // const usersArray = useSelector(state => state.socketReducer.room_data.users);

    const classes = useStyles();

    return (
        <div className={classes.parentContainer}>
            <Box width="20%" height="100vh" className={classes.root}>
                <div>
                    <div className={classes.container}>
                        <MeetingRoomIcon className={classes.icon}/>
                        {/* <p>{roomName}</p> */}
                    </div>
                    <hr className={classes.hr}/>
                    {/* {usersArray.length > 0 && usersArray.map((user) => 
                    <div className={classes.userContainer}>
                        <FiberManualRecordIcon className={classes.usernameIcon}/>
                        <p>{user.name}</p>
                    </div>)} */}
                </div>
                <div className={classes.logoutContainer}>
                    <hr className={classes.exitHr}/>
                    <div className={classes.container}>   
                        <Button className={classes.logOutButton}><ExitToAppIcon className={classes.exitIcon}/></Button>
                        <p>Log Out</p>
                    </div>
                </div>
            </Box>
            <Box width="78%" height="85.5vh" className={classes.chatContainer}>
                <div className={classes.boxDiv}>
                    {/* <p className={classes.msgUsername}>{messageInfo.user}</p>
                    <p className={classes.msgMsg}>{messageInfo.text}</p> */}
                </div>
            </Box>
            <Box width="80%" height="12vh" className={classes.sendContainer}>
                <TextField
                        id="outlined-multiline-flexible"
                        label="Type your message"
                        multiline
                        rowsMax={3}
                        variant="outlined"
                        className={classes.input}
                />
                <Button className={classes.button}><SendIcon className={classes.sendIcon}/></Button>
            </Box>

        </div>
    )
}

export default Chat

// email: 'candrepa1@test.com',
// username: 'candrepa',
// password: 'random123'

// email: 'gustavo@test.com', 
// username: 'gustavo',
// password: 'random123'