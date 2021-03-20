import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import io from "socket.io-client";
import errorImg from '../img/error.png';

// actions
import {roomData, messageSocketOn, error} from '../redux/actions/socketActions';
import {logOutForm} from '../redux/actions/userFormActions';
import {logOutLoggedIn} from '../redux/actions/loginActions';

// material ui 
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
    boxSendContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    sendContainer: {
        display: 'flex', 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        width: '100%'
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
        overflow: 'auto'
    },
    boxDiv: {
        width:'fit-content',
        background: '#dddddd',
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20,
        padding: '15px 20px', 
    }, 
    boxDiv2: {
        width:'fit-content',
        background: '#dddddd',
        borderTopLeftRadius: 20, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20,
        padding: '15px 20px', 
    },
    conditionalBox: {
        // end
        display: 'flex', 
        justifyContent: 'flex-end', 
        marginBottom: '20px',
    },
    conditionalBox2: {
        //start
        display: 'flex',
        marginBottom: '20px',
    },
    msgUsername: {
        fontWeight: 'bold',
        margin: 0, 
        textTransform: 'capitalize', 
        textAlign: 'left'
    }, 
    msgMsg: {
        margin: 0, 
        textTransform: 'capitalize'
    }, 
    username: {
        textTransform: 'capitalize', 
    }, 
    rootCard: {
        maxWidth: 345,
        margin: '0 auto',
    },
    media: {
        height: 140,
    },
});

const Chat = () => {
    const [sendingMsg, setSendingMsg] = useState('');
    const [socket, setSocket] = useState('');
    const {register, handleSubmit} = useForm();

    const token = useSelector(state => state.logInReducer.response.user.token);
    const username = useSelector(state => state.logInReducer.response.user.username);
    const room = useSelector(state => state.userFormReducer.formInfo.room);
    const roomName = useSelector(state => state.socketReducer.room_data.room);
    const msgsFromSocket = useSelector(state => state.socketReducer.msgSocketOn);
    const usersArray = useSelector(state => state.socketReducer.room_data);
    const errorRedux = useSelector(state => state.socketReducer.error);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(token) {
            const socketConnection = io('https://academlo-chat.herokuapp.com/', { query: {token: token} });
            setSocket(socketConnection);
        }
    }, [token])

    useEffect(() => { 
        
        if(socket) {
            socket.emit('join', {name: username, room: room}, () => {});

            socket.on('roomData', (data) => {
                dispatch(roomData(data));
            });  

            socket.on('message', (data) => {
                dispatch(messageSocketOn(data));
            });

            socket.on("error", (err) => {
                dispatch(error(err));
            });
        }
        
    }, [dispatch, socket, room, username])

    useEffect(() => {
        if(sendingMsg) {
            socket.emit('sendMessage', sendingMsg.text, () => {});
        }       
    }, [sendingMsg, socket])

    const onSubmit = (data, event) => {
        setSendingMsg({...data, user: username});
        event.target.reset();
    }

    const handleLogOut = () => {
        history.push('/');
        dispatch(logOutForm());
        dispatch(logOutLoggedIn())
    }

    const classes = useStyles();

    return (
        <div className={classes.parentContainer}>
            <Box width="20%" height="100vh" className={classes.root}>
                <div>
                    <div className={classes.container}>
                        <MeetingRoomIcon className={classes.icon}/>
                        <p>{roomName}</p>
                    </div>
                    <hr className={classes.hr}/>
                    {usersArray.users && usersArray.users.map((user) => 
                    <div key={user.id} className={classes.userContainer}>
                        <FiberManualRecordIcon className={classes.usernameIcon}/>
                        <p className={classes.username}>{user.name}</p>
                    </div>)}
                </div>
                <div className={classes.logoutContainer}>
                    <hr className={classes.exitHr}/>
                    <div className={classes.container}>   
                        <Button className={classes.logOutButton} onClick={handleLogOut}><ExitToAppIcon className={classes.exitIcon}/></Button>
                        <p>Log Out</p>
                    </div>
                </div>
            </Box>
            <Box width="78%" height="85.5vh" className={classes.chatContainer}>
            {errorRedux ? <Card className={classes.rootCard}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={errorImg}
                    title="error"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Error!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        There has been an error in the connection. Please refresh the page.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                : <>
                {msgsFromSocket && msgsFromSocket.map((msg, index) => 
                <div key={index} className={ msg.user === username? classes.conditionalBox : classes.conditionalBox2}>
                    <div className={ msg.user === username ? classes.boxDiv2 : classes.boxDiv}>
                        <p className={classes.msgUsername}>{msg.user}</p>
                        <p className={classes.msgMsg}>{msg.text}</p>
                    </div>
                </div>)}</>
                }
            </Box>

            {errorRedux ? null : <Box width="80%" height="12vh" className={classes.boxSendContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.sendContainer}>
                    <TextField
                            id="outlined-multiline-flexible"
                            label="Type your message"
                            multiline
                            rowsMax={3}
                            variant="outlined"
                            className={classes.input}
                            name="text"
                            inputRef={register}
                    />
                    <Button className={classes.button} type="submit"><SendIcon className={classes.sendIcon}/></Button>
                </form>
            </Box>}
        </div>
    )
}

export default Chat

