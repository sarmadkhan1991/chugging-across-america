import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import tripReducer from './Redux/tripReducer';



export default createStore( tripReducer, applyMiddleware(promiseMiddleware));