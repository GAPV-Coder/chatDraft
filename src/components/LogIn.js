import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userForm } from '../redux/actions/userFormActions'
import { logInThunk } from '../redux/actions/loginActions'

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
        marginBottom: 15
    }, 
    notAccountContainer: {
        textAlign: 'center'
    }, 
    notAccountLink: {
        marginLeft: 7,
        color: 'white'
    }
});

const LogIn = () => {
    const {register, handleSubmit, errors} = useForm();
    const [logIn, setLogIn] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();
    const user = useSelector(state => state.userFormReducer.formInfo);
    const access = useSelector(state => state.logInReducer.response);

    useEffect(() => {
        if(user.email) {
            dispatch(logInThunk(user.email, user.password));
        } 
    }, [dispatch, user]);

    useEffect(() => {
        if(access.access) {
            history.push('/chat')
        } else {
            return null;
        }
    }, [access, history])

    const onSubmit = (data, event) => {
        console.log(data);
        dispatch((userForm(data)))
        setLogIn(data);
        event.target.reset();
    }

    const classes = useStyles();

    return (
        <Box width="100vw" height="100vh" className={classes.root}>
                <div className={classes.container}>
                    <h1 className={classes.h1}>Log In</h1>
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
                            label="Room"
                            variant="filled"
                            name="room"
                            inputRef={register}
                            className={classes.input}
                        />
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Sign In
                        </Button>
                    </form>
                    <div className={classes.notAccountContainer}>
                        <span>Don't have an account?</span>
                        <Link to="/signup" className={classes.notAccountLink}>Create an account</Link>
                    </div>
                    {access.access === false && (<p>{access.message}</p>)}
                </div>
        </Box>
    )
}

export default LogIn