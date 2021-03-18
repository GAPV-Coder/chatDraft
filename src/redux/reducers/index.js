import { combineReducers } from 'redux';
import userFormReducer from './userFormReducer';
import logInReducer from './loginReducer';
import socketReducer from './socketReducer';

export default combineReducers({
    userFormReducer, logInReducer, socketReducer
})