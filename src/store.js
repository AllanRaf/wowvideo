// store.js
import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import * as reducers from './reducers';

const reducer = combineReducers(Object.assign({}, reducers));

const enhancer = composeWithDevTools();

const store = createStore(reducer, enhancer);

export default store;
