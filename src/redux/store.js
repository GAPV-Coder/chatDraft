import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducers from './reducers'

const store = createStore(combinedReducers, compose(applyMiddleware(thunkMiddleware), composeWithDevTools()))
export default store