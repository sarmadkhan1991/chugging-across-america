import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import tripReducer from './Redux/tripReducer';

const rootReducer = combineReducers ({
    trip: tripReducer
});

export default createStore( rootReducer, applyMiddleware(promiseMiddleware));