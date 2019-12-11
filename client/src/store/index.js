import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'

const middleware = [thunk, logger];

const initialState = {};

const store = window.__REDUX_DEVTOOLS_EXTENSION__
  ? createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__()))
  : createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));


export default store;
