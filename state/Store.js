// @flow

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import client from './Apollo.js';

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  compose(
    applyMiddleware(client.middleware()),
  ),
);

export default store;
