import { combineReducers } from 'redux';
import userFormReducer from './userFormReducer';
import logInReducer from './loginReducer';
import socketReducer from './socketReducer';
import signUpReducer from './signUpReducer';

export default combineReducers({
    userFormReducer, logInReducer, socketReducer, signUpReducer
})