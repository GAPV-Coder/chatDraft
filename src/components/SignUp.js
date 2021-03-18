import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom'

//material ui 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        background: '#1A1A1D',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    container: {
        fontFamily: 'Oswald, sans-serif', 
        display: 'flex', 
        flexDirection: 'column',
        color: 'white',
        width: 300,
    },
    form: {
        display: 'flex', 
        flexDirection: 'column',
    },
    input: {
        marginBottom: 20,
        background: 'white', 
        fontFamily: 'Oswald, sans-serif'
    }, 
    hr: {
        borderWidth: 1,
        width: '100%',
        marginTop: 20, 
        marginBottom: 20, 
        color: 'white'
    },
    h1: {
        margin: 0, 
        textAlign: 'center'
    }, 
    button: {
        fontFamily: 'Oswald, sans-serif', 
        padding: 10, 
    }, 
    yesAccountContainer: {
        marginTop: 15, 
        textAlign: 'center', 
    }, 
    yesAccountLink: {
        color: 'white',
        marginLeft: 7
    }
});

const SignUpLogIn = () => {
    const {register, handleSubmit, errors} = useForm();
    const [signUp, setSignUp] = useState('');

    const history = useHistory();

    const onSubmit = (data, event) => {
        console.log(data);
        setSignUp(data);
        event.target.reset();
    }

    useEffect(() => {
        if(signUp) {
            const axios = require('axios').default;
                axios.post('https://academlo-chat.herokuapp.com/api/users/signup', {
                    email: `${signUp.email}`,
                    username: `${signUp.username}`,
                    password: `${signUp.password}`
                })
                .then(function (response) {
                    console.log(response);
                    history.push({ 
                        pathname: '/chat',
                        state: { room: signUp.room, username: response.data.user.username, token: response.data.user.token }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [signUp]);

    const classes = useStyles();

    return (
        <Box width="100vw" height="100vh" className={classes.root}>
                <div className={classes.container}>
                    <h1 className={classes.h1}>Sign Up</h1>
                    <hr className={classes.hr}></hr>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <TextField
                            required
                            type="email"
                            id="filled-required"
                            label="Email"
                            variant="filled"
                            name="email"
                            inputRef={register}
                            className={classes.input}
                        />
                        <TextField
                            required
                            type="text"
                            id="filled-required"
                            label="Username"
                            variant="filled"
                            name="username"
                            inputRef={register}
                            className={classes.input}
                        />
                        <TextField
                            required
                            type="text"
                            id="filled-required"
                            label="Password"
                            variant="filled"
                            name="password"
                            inputRef={register}
                            className={classes.input}
                        />
                        <TextField
                            required
                            type="text"
                            id="filled-required"
                            label="Room to join"
                            variant="filled"
                            name="room"
                            inputRef={register}
                            className={classes.input}
                        />
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Create Profile
                        </Button>
                    </form>
                    <div className={classes.yesAccountContainer}>
                        <span>Already have a profile?</span>
                        <Link to="/join" className={classes.yesAccountLink}>Sign In</Link>
                    </div>
                </div>
        </Box>
    )
}

export default SignUpLogIn

