import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({children, ...props}) => {
    const auth = useSelector(state => state.logInReducer.response.access);
    return (
        <Route {...props} render ={() => (auth ? children : <Redirect to="/"/>)}/>
    )
}

export default ProtectedRoute;
