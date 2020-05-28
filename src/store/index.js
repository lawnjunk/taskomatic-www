// external deps
import createSaga from 'redux-saga'
import logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'

// internal modules
import rootSaga from './saga'
import defaultReducer from './reducer'

// interface
export default (reducer=defaultReducer) => {
  let saga = createSaga()
  let store = createStore(reducer, applyMiddleware(saga, logger))
  saga.run(rootSaga)
  return store
}
